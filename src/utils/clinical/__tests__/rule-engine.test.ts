import { evaluateSubmission } from '../rule-engine';
import { EvaluationStatus } from '../../../types/monitoring';

describe('Clinical Rule Engine', () => {
  it('INV-001: null SpO2 must not equal 0 and must not trigger low-SpO2 rule', () => {
    const submission = {
      id: 'test-1',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: null, displayLabel: 'Non fourni' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: null,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission as any);
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toHaveLength(0);
  });

  it('INV-002: SpO2 < 92 must trigger review', () => {
    const submission = {
      id: 'test-2',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 90, displayLabel: '90' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 90,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission as any);
    expect(result.status).toBe('review_required');
    expect(result.triggeredRuleIds).toContain('RULE_LOW_SPO2_OR_DYSPNEA');
  });

  it('INV-003: SpO2 95 must evaluate normal', () => {
    const submission = {
      id: 'test-3',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 95, displayLabel: '95' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 95,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission as any);
    expect(result.status).toBe('normal');
  });

  it('INV-004: mMRC 3 must trigger review', () => {
    const submission = {
      id: 'test-4',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_3', displayLabel: '3' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission as any);
    expect(result.status).toBe('review_required');
  });

  it('INV-005: mMRC 4 must trigger review', () => {
    const submission = {
      id: 'test-5',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_4', displayLabel: '4' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission as any);
    expect(result.status).toBe('review_required');
  });
});
