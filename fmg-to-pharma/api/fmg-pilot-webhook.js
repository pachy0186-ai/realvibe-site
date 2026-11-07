import {createPilotService, apiHeaders, failure, rawBody} from '../lib/pilot-server.js';
export const config = {api: {bodyParser: false}};
export default async function handler(req, res) {
  apiHeaders(res);
  if (req.method !== 'POST') {res.setHeader('Allow', 'POST');return res.status(405).json({error: 'Method not allowed'});}
  try {
    const result = await createPilotService().webhook(await rawBody(req), req.headers['stripe-signature']);
    return res.status(200).json(result);
  } catch {return res.status(400).json({error: 'Sandbox payment event could not be verified.'});}
}
