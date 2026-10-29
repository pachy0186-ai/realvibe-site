import {createPilotService, apiHeaders, failure} from '../lib/pilot-server.js';
export default async function handler(req, res) {
  apiHeaders(res);
  if (req.method !== 'POST') {res.setHeader('Allow', 'POST');return res.status(405).json({error: 'Method not allowed'});}
  try {
    const result = await createPilotService().checkout(req);
    res.setHeader('Set-Cookie', result.cookie);return res.status(200).json({url: result.url});
  } catch (error) {return failure(res, error);}
}
