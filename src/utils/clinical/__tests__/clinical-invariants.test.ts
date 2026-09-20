import { evaluateSubmission } from '../rule-engine';
import { MonitoringSubmission } from '../../../types/monitoring';

describe('Clinical Invariants', () => {
  // INV-001: NULL SpO2 must not trigger low-SpO2 rule
  it('INV-001: null SpO2 must not equal 0 and must not trigger low-SpO2 rule', () => {
    const submission: MonitoringSubmission = {
      id: 'test-1',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: null as number | null, displayLabel: 'Non fourni' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: null,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toHaveLength(0);
  });

  // INV-002: SpO2 < 92 must trigger review
  it('INV-002: SpO2 91 must trigger review', () => {
    const submission: MonitoringSubmission = {
      id: 'test-2',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 91, displayLabel: '91' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 91,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('review_required');
    expect(result.triggeredRuleIds).toContain('RULE_LOW_SPO2_OR_DYSPNEA');
  });

  // INV-003: SpO2 92 must not trigger solely because of SpO2
  it('INV-003: SpO2 92 must not trigger low-SpO2 rule', () => {
    const submission: MonitoringSubmission = {
      id: 'test-3',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 92, displayLabel: '92' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 92,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toHaveLength(0);
  });

  // INV-004: SpO2 93 must not trigger solely because of SpO2
  it('INV-004: SpO2 93 must not trigger low-SpO2 rule', () => {
    const submission: MonitoringSubmission = {
      id: 'test-4',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 93, displayLabel: '93' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 93,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toHaveLength(0);
  });

  // INV-005: mMRC 2 must not trigger
  it('INV-005: mMRC 2 must not trigger review', () => {
    const submission: MonitoringSubmission = {
      id: 'test-5',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_2', displayLabel: '2' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('normal');
    expect(result.triggeredRuleIds).toHaveLength(0);
  });

  // INV-006: mMRC 3 must trigger review
  it('INV-006: mMRC 3 must trigger review', () => {
    const submission: MonitoringSubmission = {
      id: 'test-6',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_3', displayLabel: '3' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('review_required');
    expect(result.triggeredRuleIds).toContain('RULE_LOW_SPO2_OR_DYSPNEA');
  });

  // INV-007: mMRC 4 must trigger review
  it('INV-007: mMRC 4 must trigger review', () => {
    const submission: MonitoringSubmission = {
      id: 'test-7',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_4', displayLabel: '4' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result = evaluateSubmission(submission);
    expect(result.status).toBe('review_required');
    expect(result.triggeredRuleIds).toContain('RULE_LOW_SPO2_OR_DYSPNEA');
  });

  // INV-008: OR logic - SpO2 < 92 OR mMRC 3/4 → review required
  it('INV-008: OR logic must trigger when either condition is met', () => {
    // Only mMRC 3 (no low SpO2)
    const submission1: MonitoringSubmission = {
      id: 'test-8a',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 96, displayLabel: '96' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_3', displayLabel: '3' },
      },
      spo2Value: 96,
      measurementSource: 'manual' as const,
    };
    const result1 = evaluateSubmission(submission1);
    expect(result1.status).toBe('review_required');

    // Only SpO2 91 (no mMRC elevation)
    const submission2: MonitoringSubmission = {
      id: 'test-8b',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 91, displayLabel: '91' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 91,
      measurementSource: 'manual' as const,
    };
    const result2 = evaluateSubmission(submission2);
    expect(result2.status).toBe('review_required');

    // Neither condition met
    const submission3: MonitoringSubmission = {
      id: 'test-8c',
      patientId: 'p1',
      timestamp: new Date().toISOString(),
      answers: {
        spo2: { questionId: 'spo2', value: 97, displayLabel: '97' },
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_0', displayLabel: '0' },
      },
      spo2Value: 97,
      measurementSource: 'manual' as const,
    };
    const result3 = evaluateSubmission(submission3);
    expect(result3.status).toBe('normal');
  });
});
