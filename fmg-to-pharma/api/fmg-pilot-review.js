import {createPilotService, apiHeaders, failure} from '../lib/pilot-server.js';
export default async function handler(req, res) {
  apiHeaders(res);
  if (req.method !== 'POST') {res.setHeader('Allow', 'POST');return res.status(405).json({error: 'Method not allowed'});}
  try {return res.status(200).json(await createPilotService().review(req));}
  catch (error) {return failure(res, error);}
}
