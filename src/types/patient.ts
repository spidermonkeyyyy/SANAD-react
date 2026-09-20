import { MonitoringSubmission } from './monitoring';

export interface Patient {
  id: string;
  fullName: string;
  condition: string;
  classification: string;
  lastSubmissionAt: string | null;
  priority: PriorityLevel;
  hasNewSubmission: boolean;
  latestSubmission: MonitoringSubmission | null;
  submissions: MonitoringSubmission[];
  timeline: PatientTimelineEvent[];
  latestObservation: string | null;
}

export interface PatientTimelineEvent {
  createdAt: string;
  title: string;
  description: string;
}

export type PriorityLevel = 'high' | 'reviewRequired' | 'informational';

export type PatientRosterFilter = 'all' | 'toReview' | 'followed';

export function matchesPatientRosterFilter(patient: Patient, filter: PatientRosterFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'toReview':
      return patient.hasNewSubmission || patient.priority !== 'informational';
    case 'followed':
      return patient.lastSubmissionAt !== null;
    default:
      return true;
  }
}
