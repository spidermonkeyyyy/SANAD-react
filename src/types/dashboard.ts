export type NurseWorklistItemType = 'alert' | 'monitoring' | 'task';

export interface NurseWorklistItem {
  id: string;
  type: NurseWorklistItemType;
  patientId: string;
  patientName: string;
  title: string;
  description: string | null;
  relatedEntityId: string | null;
  timestamp: string;
  priorityRank: number;
  statusLabel: string;
  isActionable: boolean;
  actionRoute: string | null;
}

export type NurseWorklistFilter = 'all' | 'alerts' | 'tasks' | 'monitoring' | 'needsAttention';

export interface DashboardSummary {
  totalPatients: number;
  highPriorityCount: number;
  reviewRequiredCount: number;
  newSubmissionsCount: number;
}

export interface NurseAssignment {
  nurseId: string;
  nurseName: string;
  patientId: string;
  patientName: string;
  condition: string;
  classification: string;
  priority: string;
  hasNewSubmission: boolean;
  pendingTaskCount: number;
}

export interface NurseMonitoringRule {
  id: string;
  title: string;
  description: string;
  condition: RuleCondition;
  action: RuleAction;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: string;
  description: string | null;
}

export interface RuleAction {
  type: string;
  label: string;
  priority: string;
}

export interface NurseMonitoringRule {
  id: string;
  title: string;
  description: string;
  condition: RuleCondition;
  action: RuleAction;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: string;
  description: string | null;
}

export interface RuleAction {
  type: string;
  label: string;
  priority: string;
}

export function matchesWorklistFilter(item: NurseWorklistItem, filter: NurseWorklistFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'alerts':
      return item.type === 'alert';
    case 'tasks':
      return item.type === 'task';
    case 'monitoring':
      return item.type === 'monitoring';
    case 'needsAttention':
      return item.isActionable;
    default:
      return true;
  }
}
