import { MonitoringRepository, MonitoringSubmission, EvaluationResult } from '../../../types/monitoring';
import { ClinicalMeasurement, MeasurementType } from '../../../types/measurement';

describe('MockMonitoringRepository monitoring contract', () => {
  let repo: any;

  beforeEach(() => {
    repo = new (require('../monitoring-repository.mock').MockMonitoringRepository)(new Date(2026, 7, 12));
  });

  it('returns the 4 monitoring questions', async () => {
    const questions = await repo.getQuestions();
    expect(questions).toHaveLength(4);
    expect(questions.map((q: any) => q.id)).toEqual(['dyspnea', 'cough', 'sputum', 'spo2']);
  });

  it('does not persist a NULL SpO2 into history', async () => {
    const now = new Date();
    await repo.submitMonitoring({
      id: 'sub-no-spo2',
      patientId: 'p1',
      timestamp: now.toISOString(),
      answers: {},
      spo2Value: null,
      measurementSource: 'manual',
    } as any);

    const start = new Date(now.getTime() - 5 * 60 * 1000);
    const end = new Date(now.getTime() + 5 * 60 * 1000);
    const history = await repo.getHistoricalMeasurements({ start, end, types: new Set([MeasurementType.spo2]), patientId: 'p1' });
    expect(history.filter((m: any) => m.type === MeasurementType.spo2)).toHaveLength(0);
  });

  it('persists a real SpO2 into history', async () => {
    const now = new Date();
    await repo.submitMonitoring({
      id: 'sub-spo2-96',
      patientId: 'p1',
      timestamp: now.toISOString(),
      answers: {},
      spo2Value: 96,
      measurementSource: 'manual',
    } as any);

    const start = new Date(now.getTime() - 5 * 60 * 1000);
    const end = new Date(now.getTime() + 5 * 60 * 1000);
    const history = await repo.getHistoricalMeasurements({ start, end, types: new Set([MeasurementType.spo2]), patientId: 'p1' });
    const spo2History = history.filter((m: any) => m.type === MeasurementType.spo2);
    expect(spo2History.length).toBeGreaterThanOrEqual(1);
  });

  it('returns deterministic 14-day history including seed data', async () => {
    const start = new Date(2026, 7, 1);
    const end = new Date(2026, 7, 14);
    const history = await repo.getHistoricalMeasurements({
      start,
      end,
      types: new Set([MeasurementType.spo2, MeasurementType.heartRate]),
      patientId: 'p1',
    });
    expect(history.length).toBeGreaterThan(0);
  });

  it('filters by inclusive date range and type', async () => {
    const start = new Date(2026, 7, 12);
    const end = new Date(2026, 7, 12);
    const history = await repo.getHistoricalMeasurements({
      start,
      end,
      types: new Set([MeasurementType.spo2]),
      patientId: 'p1',
    });
    expect(history.every((m: any) => m.type === MeasurementType.spo2)).toBe(true);
  });
});
