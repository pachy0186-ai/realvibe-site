import {clean, ensure} from './pilot-domain.js';

export function manualDraft(order, input, preparedAt) {
  ensure(order.intake && order.payment?.sandbox === true, 'A paid fictional intake is required.');
  ensure(order.intake.cv.startsWith('FICTIONAL QA CANDIDATE'), 'Only fictional sandbox evidence is accepted.');
  ensure(input && typeof input === 'object', 'Manual report is required.');
  return {
    engineVersion: 'manual-sandbox-1', packageId: order.packageId, researchedAt: preparedAt,
    qualityFlags: [],
    manualReport: {
      title: clean(input.title, 5, 180, 'Report title'),
      body: clean(input.body, 200, 30000, 'Report text'),
      sourceNote: clean(input.sourceNote, 20, 4000, 'Source and limitation note'),
      company: order.intake.company, role: order.intake.role,
    },
    reviewScope: 'Fictional workflow QA only; no human clinical approval or AI generation is represented.',
  };
}
