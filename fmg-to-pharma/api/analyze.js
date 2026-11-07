// Unified analysis route: an authenticated reviewer generates only for a paid, complete sandbox order.
import {createPilotService, apiHeaders, failure} from '../lib/pilot-server.js';
export const config = {maxDuration: 180};
export default async function handler(req, res) {
  apiHeaders(res);
  if (req.method !== 'POST') {res.setHeader('Allow', 'POST');return res.status(405).json({error: 'Method not allowed'});}
  try {
    const result = await createPilotService().review({headers: req.headers, body: {id: req.body?.orderId, action: 'generate'}});
    return res.status(200).json({id: result.id, status: result.status, draft: result.draft});
  } catch (error) {return failure(res, error);}
}
