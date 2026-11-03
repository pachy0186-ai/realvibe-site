import {authorizeGmail,finishGmail} from '../lib/gmail-oauth.js';
import {apiHeaders} from '../lib/pilot-server.js';

export default async function handler(req,res) {
  apiHeaders(res);
  res.setHeader('Content-Security-Policy',"default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
  try {
    if(req.method === 'POST') {
      const result = authorizeGmail(req,process.env);
      res.setHeader('Set-Cookie',result.cookie);return res.status(200).json({url:result.url});
    }
    if(req.method === 'GET') {
      await finishGmail(req,process.env);
      res.setHeader('Set-Cookie','fmg_gmail_oauth=; HttpOnly; Secure; SameSite=Lax; Path=/api/fmg-gmail-oauth; Max-Age=0');
      return res.status(200).send('Gmail connected for sandbox email testing. You can close this tab. No email has been sent.');
    }
    res.setHeader('Allow','GET, POST');return res.status(405).end();
  } catch {
    return res.status(400).send('Gmail connection was not completed. Return to the reviewer workspace and try again. No credentials are displayed.');
  }
}
