import { type Patient, type PatientTimelineEvent, type PriorityLevel, type PatientRosterFilter, matchesPatientRosterFilter } from '../../types/patient';
import { type Assignment } from '../../types/assignment';
import { type MonitoringSubmission } from '../../types/monitoring';

export type {
  Patient,
  PatientTimelineEvent,
  PriorityLevel,
  PatientRosterFilter,
  Assignment,
  MonitoringSubmission,
};

export { matchesPatientRosterFilter };

export interface NursePatientRepository {
  getPatients(): Promise<Patient[]>;
  searchPatients(query: string): Promise<Patient[]>;
  getPatient(patientId: string): Promise<Patient | null>;
  getAssignedPatients(nurseId: string): Promise<Patient[]>;
  getPatientAssignments(patientId: string): Promise<Assignment[]>;
}
