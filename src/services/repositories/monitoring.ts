import {
  MonitoringSubmission,
  MonitoringAnswer,
  EvaluationResult,
  EvaluationStatus,
  MeasurementSource,
} from '../../types/monitoring';

export interface MonitoringRepository {
  getQuestions(): Promise<Array<{ id: string; text: string; type: string; options?: Array<{ value: string; label: string }> }>>;
  submitMonitoring(submission: MonitoringSubmission): Promise<EvaluationResult>;
  getHistoricalMeasurements(params: {
    patientId: string;
    start: string;
    end: string;
    types: Set<string>;
  }): Promise<Array<{ type: string; value: number | null; timestamp: string }>>;
}
