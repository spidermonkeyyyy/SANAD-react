import { MonitoringRepository, MonitoringSubmission, EvaluationResult } from '../../types/monitoring';
import { ClinicalMeasurement, MeasurementType } from '../../types/measurement';
import { evaluateSubmission } from '../../utils/clinical/rule-engine';
import { MONITORING_QUESTIONS } from '../../features/monitoring/data/questions';

const DAY_MS = 24 * 60 * 60 * 1000;

export class MockMonitoringRepository implements MonitoringRepository {
  private measurements: ClinicalMeasurement[] = [];
  private seedAnchor: Date;

  constructor(seedAnchor?: Date) {
    this.seedAnchor = seedAnchor || new Date(2026, 7, 12); // Aug 12, 2026
    this.measurements = this.generateDefaultHistory();
  }

  private generateDefaultHistory(): ClinicalMeasurement[] {
    const result: ClinicalMeasurement[] = [];
    const dayNow = new Date(this.seedAnchor.getFullYear(), this.seedAnchor.getMonth(), this.seedAnchor.getDate());

    const spo2Pattern = [96, 97, 98, 96, 97, 98, 96, 95, 97, 98, 96, 97, 96, 98];
    const heartRatePattern = [72, 70, 74, 71, 73, 75, 68, 72, 70, 76, 71, 73, 74, 70];

    for (let i = 0; i < 14; i++) {
      const day = new Date(dayNow.getTime() - i * DAY_MS);
      const hour = 9 + (i % 3);
      const measuredAt = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 30);

      result.push({
        id: `mock-spo2-${i}`,
        type: MeasurementType.spo2,
        value: spo2Pattern[i],
        unit: '%',
        measuredAt,
      });

      result.push({
        id: `mock-hr-${i}`,
        type: MeasurementType.heartRate,
        value: heartRatePattern[i],
        unit: 'bpm',
        measuredAt,
      });
    }

    const latestMeasuredAt = new Date(dayNow.getFullYear(), dayNow.getMonth(), dayNow.getDate(), 14, 15);
    result.push({
      id: 'mock-spo2-latest',
      type: MeasurementType.spo2,
      value: 97.0,
      unit: '%',
      measuredAt: latestMeasuredAt,
    });
    result.push({
      id: 'mock-hr-latest',
      type: MeasurementType.heartRate,
      value: 72.0,
      unit: 'bpm',
      measuredAt: latestMeasuredAt,
    });

    return result;
  }

  async getQuestions(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 300));
    return MONITORING_QUESTIONS;
  }

  async submitMonitoring(submission: MonitoringSubmission): Promise<EvaluationResult> {
    await new Promise((r) => setTimeout(r, 600));

    const spo2 = submission.spo2Value;
    if (spo2 !== null && spo2 !== undefined) {
      this.measurements.push({
        id: `measurement-${submission.id}`,
        type: MeasurementType.spo2,
        value: spo2,
        unit: '%',
        measuredAt: new Date(submission.timestamp),
      });
    }

    return evaluateSubmission(submission);
  }

  async getHistoricalMeasurements(params: {
    start: Date;
    end: Date;
    types: Set<MeasurementType>;
    patientId: string;
  }): Promise<ClinicalMeasurement[]> {
    await new Promise((r) => setTimeout(r, 300));

    const start = params.start <= params.end ? params.start : params.end;
    const end = params.start <= params.end ? params.end : params.start;

    return this.measurements
      .filter((m) => {
        if (m.type === MeasurementType.spo2 && m.value === null) return false;
        const ts = m.measuredAt.getTime();
        return ts >= start.getTime() && ts <= end.getTime() && params.types.has(m.type);
      })
      .sort((a, b) => a.measuredAt.getTime() - b.measuredAt.getTime());
  }
}
