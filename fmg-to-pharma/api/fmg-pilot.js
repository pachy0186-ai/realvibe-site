import {createPilotService, apiHeaders, failure} from '../lib/pilot-server.js';
export default async function handler(req, res) {
  apiHeaders(res);
  try {
    const service = createPilotService();
    if (req.method === 'GET') return res.status(200).json(await service.status(req));
    if (req.method === 'POST') {
      if (Buffer.byteLength(JSON.stringify(req.body || {})) > 80000) return res.status(413).json({error: 'Intake is too large.'});
      return res.status(200).json(await service.intake(req));
    }
    res.setHeader('Allow', 'GET, POST'); return res.status(405).json({error: 'Method not allowed'});
  } catch (error) {return failure(res, error);}
}
