import { NursePatientRepository, Patient, Assignment } from './nurse-patient-repository.interface';
import { PriorityLevel } from '../../types/patient';
import { MonitoringSubmission } from '../../types/monitoring';

const SEED_PATIENTS: Patient[] = [
  {
    id: 'p1',
    fullName: 'Ahmed Ben Ali',
    condition: 'BPCO',
    classification: 'GOLD III',
    lastSubmissionAt: '2026-08-12T09:42:00.000Z',
    priority: 'high' as PriorityLevel,
    hasNewSubmission: true,
    latestSubmission: {
      id: 's1',
      patientId: 'p1',
      timestamp: '2026-08-12T09:42:00.000Z',
      answers: {
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_3', displayLabel: 'Modéré' },
        spo2: { questionId: 'spo2', value: 91, displayLabel: '91%' },
        heartRate: { questionId: 'heartRate', value: 102, displayLabel: '102 bpm' },
        cough: { questionId: 'cough', value: 'productive', displayLabel: 'Productive' },
      },
      spo2Value: 91,
      measurementSource: 'manual',
    },
    submissions: [],
    timeline: [
      { createdAt: '2026-08-12T09:42:00.000Z', title: 'Nouveau suivi', description: 'Ahmed a envoyé un suivi quotidien.' },
    ],
    latestObservation: null,
  },
  {
    id: 'p2',
    fullName: 'Samira Bouzid',
    condition: 'Asthme sévère',
    classification: 'GOLD II',
    lastSubmissionAt: '2026-08-11T18:30:00.000Z',
    priority: 'reviewRequired' as PriorityLevel,
    hasNewSubmission: false,
    latestSubmission: {
      id: 's2',
      patientId: 'p2',
      timestamp: '2026-08-11T18:30:00.000Z',
      answers: {
        dyspnea: { questionId: 'dyspnea', value: 'mmrc_2', displayLabel: 'Léger' },
        spo2: { questionId: 'spo2', value: 94, displayLabel: '94%' },
        heartRate: { questionId: 'heartRate', value: 88, displayLabel: '88 bpm' },
        cough: { questionId: 'cough', value: 'dry', displayLabel: 'Sèche' },
      },
      spo2Value: 94,
      measurementSource: 'bluetooth',
    },
    submissions: [],
    timeline: [
      { createdAt: '2026-08-11T18:30:00.000Z', title: 'Suivi stable', description: 'Paramètres dans la zone attendue.' },
    ],
    latestObservation: null,
  },
  {
    id: 'p3',
    fullName: 'Karim Meziane',
    condition: 'BPCO',
    classification: 'GOLD IV',
    lastSubmissionAt: null,
    priority: 'informational' as PriorityLevel,
    hasNewSubmission: false,
    latestSubmission: null,
    submissions: [],
    timeline: [],
    latestObservation: null,
  },
];

export class MockNursePatientRepository implements NursePatientRepository {
  private readonly patients = SEED_PATIENTS;
  private readonly assignments = [
    { nurseId: 'n1', patientId: 'p1', createdAt: '2026-08-01T08:00:00.000Z' },
    { nurseId: 'n1', patientId: 'p2', createdAt: '2026-08-01T08:00:00.000Z' },
    { nurseId: 'n1', patientId: 'p3', createdAt: '2026-08-02T08:00:00.000Z' },
  ];

  async getPatients(): Promise<Patient[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return this.patients.map((p) => ({ ...p, submissions: [], timeline: [...p.timeline] }));
  }

  async searchPatients(query: string): Promise<Patient[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const normalized = query.toLowerCase();
    return this.patients
      .filter((patient) => {
        const content = `${patient.fullName} ${patient.condition} ${patient.classification}`.toLowerCase();
        return content.includes(normalized);
      })
      .map((p) => ({ ...p, submissions: [], timeline: [...p.timeline] }));
  }

  async getPatient(patientId: string): Promise<Patient | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const patient = this.patients.find((p) => p.id === patientId);
    if (!patient) return null;
    return { ...patient, submissions: [], timeline: [...patient.timeline] };
  }

  async getAssignedPatients(nurseId: string): Promise<Patient[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const assignedPatientIds = new Set(
      this.assignments.filter((a) => a.nurseId === nurseId).map((a) => a.patientId),
    );
    return this.patients
      .filter((p) => assignedPatientIds.has(p.id))
      .map((p) => ({ ...p, submissions: [], timeline: [...p.timeline] }));
  }

  async getPatientAssignments(patientId: string): Promise<Assignment[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return this.assignments.filter((a) => a.patientId === patientId).map((a) => ({ ...a }));
  }
}
