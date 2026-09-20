import { evaluateSubmission } from '../rule-engine';
import { MonitoringSubmission } from '../../../types/monitoring';

describe('Clinical rule engine', () => {
  const base: MonitoringSubmission = {
    id: 'sub-1',
    patientId: 'p1',
    timestamp: new Date().toISOString(),
    answers: {},
    spo2Value: null,
    measurementSource: 'manual',
  };

  it('returns normal when SpO2 is null and dyspnea is low', async () => {
    const result = evaluateSubmission({
      ...base,
      id: 'sub-1',
      answers: { dyspnea: { questionId: 'dyspnea', value: 'mmrc_2', displayLabel: 'Niveau 2' } },
    });
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toEqual([]);
  });

  it('returns reviewRequired when SpO2 is 91', async () => {
    const result = evaluateSubmission({ ...base, id: 'sub-2', spo2Value: 91 });
    expect(result.status).toBe('review_required');
    expect(result.triggeredRuleIds).toContain('RULE_LOW_SPO2_OR_DYSPNEA');
  });

  it('returns normal when SpO2 is 92', async () => {
    const result = evaluateSubmission({ ...base, id: 'sub-3', spo2Value: 92 });
    expect(result.status).toBe('normal');
  });

  it('returns normal when SpO2 is 93', async () => {
    const result = evaluateSubmission({ ...base, id: 'sub-4', spo2Value: 93 });
    expect(result.status).toBe('normal');
  });

  it('returns reviewRequired when mMRC is 3', async () => {
    const result = evaluateSubmission({
      ...base,
      id: 'sub-5',
      answers: { dyspnea: { questionId: 'dyspnea', value: 'mmrc_3', displayLabel: 'Niveau 3' } },
    });
    expect(result.status).toBe('review_required');
  });

  it('returns reviewRequired when mMRC is 4', async () => {
    const result = evaluateSubmission({
      ...base,
      id: 'sub-6',
      answers: { dyspnea: { questionId: 'dyspnea', value: 'mmrc_4', displayLabel: 'Niveau 4' } },
    });
    expect(result.status).toBe('review_required');
  });

  it('returns normal when mMRC is 2', async () => {
    const result = evaluateSubmission({
      ...base,
      id: 'sub-7',
      answers: { dyspnea: { questionId: 'dyspnea', value: 'mmrc_2', displayLabel: 'Niveau 2' } },
    });
    expect(result.status).toBe('normal');
  });

  it('returns reviewRequired on OR: SpO2 88 + mMRC 2', async () => {
    const result = evaluateSubmission({
      ...base,
      id: 'sub-8',
      spo2Value: 88,
      answers: { dyspnea: { questionId: 'dyspnea', value: 'mmrc_2', displayLabel: 'Niveau 2' } },
    });
    expect(result.status).toBe('review_required');
  });
});
