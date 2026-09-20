export type AssessmentStatus = 'noConcern' | 'enhancedMonitoring' | 'patientContact' | 'pneumologistReview';

export interface AssessmentStatusOption {
  value: AssessmentStatus;
  label: string;
}

export const ASSESSMENT_STATUS_OPTIONS: AssessmentStatusOption[] = [
  { value: 'noConcern', label: 'Pas de changement préoccupant' },
  { value: 'enhancedMonitoring', label: 'Surveillance renforcée' },
  { value: 'patientContact', label: 'Contact patient nécessaire' },
  { value: 'pneumologistReview', label: 'Avis pneumologue nécessaire' },
];

export function getAssessmentStatusLabel(status: AssessmentStatus): string {
  return ASSESSMENT_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

export interface NurseAssessment {
  id: string;
  patientId: string;
  status: AssessmentStatus;
  observation: string;
  action: string;
  note: string | null;
  createdAt: string;
}
