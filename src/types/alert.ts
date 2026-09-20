export const AlertStatus = {
  unread: 'unread',
  acknowledged: 'acknowledged',
  inProgress: 'in_progress',
  resolved: 'resolved',
} as const;

export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];

export function isAlertStatus(value: string): value is AlertStatus {
  return Object.values(AlertStatus).includes(value as AlertStatus);
}

export const AlertStatusLabel: Record<AlertStatus, string> = {
  [AlertStatus.unread]: 'Non traitée',
  [AlertStatus.acknowledged]: 'Prise en charge',
  [AlertStatus.inProgress]: 'En cours',
  [AlertStatus.resolved]: 'Résolue',
};

export function getAlertStatusLabel(status: AlertStatus): string {
  return AlertStatusLabel[status];
}

export function isAlertStatusOpen(status: AlertStatus): boolean {
  return status !== AlertStatus.resolved;
}

export function getAlertStatusNext(status: AlertStatus): AlertStatus | null {
  switch (status) {
    case AlertStatus.unread:
      return AlertStatus.acknowledged;
    case AlertStatus.acknowledged:
      return AlertStatus.inProgress;
    case AlertStatus.inProgress:
      return AlertStatus.resolved;
    case AlertStatus.resolved:
      return null;
  }
}

export function canAlertStatusTransitionTo(current: AlertStatus, target: AlertStatus): boolean {
  if (current === target) return false;
  if (current === AlertStatus.resolved) return false;
  return Object.keys(AlertStatus).filter((k) => typeof AlertStatus[k as keyof typeof AlertStatus] === 'string').length > 0
    ? (AlertStatus as any)[target] > (AlertStatus as any)[current]
    : false;
}

export function getAlertStatusDbValue(status: AlertStatus): string {
  switch (status) {
    case AlertStatus.unread:
      return 'unread';
    case AlertStatus.acknowledged:
      return 'acknowledged';
    case AlertStatus.inProgress:
      throw new Error(
        'AlertStatus.inProgress has no database representation in the P0 alerts schema (unread/acknowledged/resolved only).',
      );
    case AlertStatus.resolved:
      return 'resolved';
  }
}

export function parseAlertStatusFromDb(value: string): AlertStatus {
  const entry = Object.entries(AlertStatus).find(([key, val]) => {
    if (key === 'inProgress') return false;
    return val === value;
  });
  if (!entry) {
    throw new Error(`Unknown alert_status: ${value}`);
  }
  return AlertStatus[entry[0] as keyof typeof AlertStatus];
}

export const AlertPriority = {
  high: 'high',
  medium: 'medium',
  low: 'low',
  informational: 'informational',
} as const;

export type AlertPriority = (typeof AlertPriority)[keyof typeof AlertPriority];

export function isAlertPriority(value: string): value is AlertPriority {
  return Object.values(AlertPriority).includes(value as AlertPriority);
}

export const AlertPriorityLabel: Record<AlertPriority, string> = {
  [AlertPriority.high]: 'Priorité élevée',
  [AlertPriority.medium]: 'À revoir',
  [AlertPriority.low]: 'Priorité faible',
  [AlertPriority.informational]: 'Information',
};

export function getAlertPriorityLabel(priority: AlertPriority): string {
  return AlertPriorityLabel[priority];
}

export const AlertPrioritySortWeight: Record<AlertPriority, number> = {
  [AlertPriority.high]: 0,
  [AlertPriority.medium]: 1,
  [AlertPriority.low]: 2,
  [AlertPriority.informational]: 3,
};

export function getAlertPrioritySortWeight(priority: AlertPriority): number {
  return AlertPrioritySortWeight[priority];
}

export function getAlertPriorityDbValue(priority: AlertPriority): string {
  switch (priority) {
    case AlertPriority.high:
      return 'high';
    case AlertPriority.medium:
      return 'medium';
    case AlertPriority.low:
      return 'low';
    case AlertPriority.informational:
      throw new Error(
        'AlertPriority.informational has no database representation in the P0 alerts schema (low/medium/high only).',
      );
  }
}

export function parseAlertPriorityFromDb(value: string): AlertPriority {
  const entry = Object.entries(AlertPriority).find(([key, val]) => {
    if (key === 'informational') return false;
    return val === value;
  });
  if (!entry) {
    throw new Error(`Unknown alert_priority: ${value}`);
  }
  return AlertPriority[entry[0] as keyof typeof AlertPriority];
}

export const NurseAction = {
  monitoring: 'monitoring',
  contactPatient: 'contactPatient',
  pneumologistReview: 'pneumologistReview',
  other: 'other',
} as const;

export type NurseAction = (typeof NurseAction)[keyof typeof NurseAction];

export function isNurseAction(value: string): value is NurseAction {
  return Object.values(NurseAction).includes(value as NurseAction);
}

export const NurseActionLabel: Record<NurseAction, string> = {
  [NurseAction.monitoring]: 'Surveillance simple',
  [NurseAction.contactPatient]: 'Contact patient',
  [NurseAction.pneumologistReview]: 'Avis pneumologue',
  [NurseAction.other]: 'Autre',
};

export function getNurseActionLabel(action: NurseAction): string {
  return NurseActionLabel[action];
}

export function doesNurseActionRequireNote(action: NurseAction): boolean {
  return action === NurseAction.other;
}

export const NurseDecision = {
  actionRequired: 'actionRequired',
  enhancedMonitoring: 'enhancedMonitoring',
  notConcerning: 'notConcerning',
} as const;

export type NurseDecision = (typeof NurseDecision)[keyof typeof NurseDecision];

export function isNurseDecision(value: string): value is NurseDecision {
  return Object.values(NurseDecision).includes(value as NurseDecision);
}

export const NurseDecisionLabel: Record<NurseDecision, string> = {
  [NurseDecision.actionRequired]: 'Action requise',
  [NurseDecision.enhancedMonitoring]: 'Surveillance renforcée',
  [NurseDecision.notConcerning]: 'Non préoccupant selon évaluation',
};

export function getNurseDecisionLabel(decision: NurseDecision): string {
  return NurseDecisionLabel[decision];
}

export function doesNurseDecisionRequireJustification(decision: NurseDecision): boolean {
  return decision === NurseDecision.notConcerning;
}

export const MeasurementTrend = {
  up: 'up',
  down: 'down',
  stable: 'stable',
  unknown: 'unknown',
} as const;

export type MeasurementTrend = (typeof MeasurementTrend)[keyof typeof MeasurementTrend];

export function isMeasurementTrend(value: string): value is MeasurementTrend {
  return Object.values(MeasurementTrend).includes(value as MeasurementTrend);
}

export const MeasurementTrendLabel: Record<MeasurementTrend, string> = {
  [MeasurementTrend.up]: 'En hausse',
  [MeasurementTrend.down]: 'En baisse',
  [MeasurementTrend.stable]: 'Stable',
  [MeasurementTrend.unknown]: 'Non comparable',
};

export function getMeasurementTrendLabel(trend: MeasurementTrend): string {
  return MeasurementTrendLabel[trend];
}

export interface RuleEvaluationResult {
  ruleId: string;
  ruleName: string;
  matched: boolean;
  matchedCriteria: string[];
  priority: AlertPriority;
  evaluatedAt: string;
}

export interface SupportingMeasurement {
  label: string;
  value: string;
  referenceValue?: string;
  variation?: string;
  trend: MeasurementTrend;
  note?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  patientSummary: string;
  reason: string;
  priority: AlertPriority;
  status: AlertStatus;
  createdAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  triggeredRules: RuleEvaluationResult[];
  supportingMeasurements: SupportingMeasurement[];
  submissionId?: string;
  assignedNurseId?: string;
  nurseAction?: NurseAction;
  nurseDecision?: NurseDecision;
  actionNote?: string;
  justification?: string;
  resolutionNote?: string;
}

export interface AlertGroup {
  patientId: string;
  patientName: string;
  patientSummary: string;
  alerts: Alert[];
}

export type AlertFilter = 'all' | 'unhandled' | 'highPriority' | 'toReview' | 'resolved';

export function sortAlerts(alerts: Alert[]): Alert[] {
  return [...alerts].sort((a, b) => {
    const byPriority = getAlertPrioritySortWeight(a.priority) - getAlertPrioritySortWeight(b.priority);
    if (byPriority !== 0) return byPriority;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function groupAlertsByPatient(alerts: Alert[]): AlertGroup[] {
  const buckets: Record<string, Alert[]> = {};
  for (const alert of alerts) {
    if (!buckets[alert.patientId]) {
      buckets[alert.patientId] = [];
    }
    buckets[alert.patientId].push(alert);
  }

  const groups = Object.entries(buckets).map(([patientId, patientAlerts]) => {
    const sorted = sortAlerts(patientAlerts);

    return {
      patientId,
      patientName: sorted[0].patientName,
      patientSummary: sorted[0].patientSummary,
      alerts: sorted,
    } as AlertGroup;
  });

  groups.sort((a, b) => {
    const byPriority = getAlertPrioritySortWeight(a.alerts[0].priority) - getAlertPrioritySortWeight(b.alerts[0].priority);
    if (byPriority !== 0) return byPriority;
    const mostRecentA = a.alerts.reduce((max, a) => a.createdAt > max ? a.createdAt : max, a.alerts[0].createdAt);
    const mostRecentB = b.alerts.reduce((max, b) => b.createdAt > max ? b.createdAt : max, b.alerts[0].createdAt);
    return mostRecentB.localeCompare(mostRecentA);
  });

  return groups;
}

export function matchesFilter(alert: Alert, filter: AlertFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'unhandled':
      return alert.status === AlertStatus.unread;
    case 'highPriority':
      return alert.priority === AlertPriority.high && isAlertStatusOpen(alert.status);
    case 'toReview':
      return alert.priority === AlertPriority.medium && isAlertStatusOpen(alert.status);
    case 'resolved':
      return alert.status === AlertStatus.resolved;
    default:
      return true;
  }
}
