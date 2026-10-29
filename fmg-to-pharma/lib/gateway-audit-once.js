import {open, readFile, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';

// Vercel can invoke the package build hook for multiple function builders.
// An exclusive shared-temp lock prevents each builder from spending credits again.
export async function auditOnce(key, task, {directory = tmpdir(), waitMs = 400000} = {}) {
  const path = join(directory, `fmg-gateway-${createHash('sha256').update(key).digest('hex')}`);
  try {
    const lock = await open(path + '.lock', 'wx');await lock.close();
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    const start = Date.now();
    while (Date.now() - start < waitMs) {
      try {await readFile(path + '.done');return {reused: true, result: JSON.parse(await readFile(path + '.json', 'utf8'))};}
      catch (error) {if (error.code !== 'ENOENT') throw error;}
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    throw Error('Another audit owns this deployment lock; no duplicate model request was made.');
  }
  const result = await task();await writeFile(path + '.json', JSON.stringify(result));await writeFile(path + '.done', 'complete');
  return {reused: false, result};
}
