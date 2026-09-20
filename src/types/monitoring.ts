export type MeasurementSource = 'manual' | 'bluetooth';

export const MeasurementSources = {
  manual: 'manual',
  bluetooth: 'bluetooth',
} as const;

export type MeasurementSourceValue = typeof MeasurementSources[keyof typeof MeasurementSources];

export interface MonitoringAnswer {
  questionId: string;
  value: string | number | null;
  displayLabel: string;
}

export type EvaluationStatus = 'normal' | 'review_required';

export interface EvaluationResult {
  status: EvaluationStatus;
  triggeredRuleIds: string[];
  patientMessage: string;
}

export interface MonitoringSubmission {
  id: string;
  patientId: string;
  timestamp: string;
  answers: Record<string, MonitoringAnswer>;
  spo2Value: number | null;
  measurementSource: MeasurementSource;
}

export interface MonitoringRepository {
  getQuestions(): Promise<Array<any>>;
  submitMonitoring(submission: MonitoringSubmission): Promise<EvaluationResult>;
  getHistoricalMeasurements(params: {
    start: Date;
    end: Date;
    types: Set<any>;
    patientId: string;
  }): Promise<Array<any>>;
}
