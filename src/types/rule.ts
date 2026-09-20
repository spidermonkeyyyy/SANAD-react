export type RuleAction = 'create_alert' | 'flag_for_review';

export type AlertPriority = 'low' | 'medium' | 'high' | 'informational';

export type ComparisonMode = 'absolute' | 'baseline' | 'trend';

export type ConditionGroupMode = 'all' | 'any';

export interface RuleMetric {
  key: string;
  label: string;
  unit: string;
  supportedOperators: string[];
  valueHint: string;
}

export interface RuleCondition {
  id: string;
  metric: string;
  metricLabel: string;
  operator: string;
  value: string;
  unit: string;
  comparisonMode: ComparisonMode;
}

export interface RuleGroup {
  id: string;
  mode: ConditionGroupMode;
  conditions: RuleCondition[];
}

export interface MonitoringRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditionGroup: RuleGroup;
  action: RuleAction;
  priority: AlertPriority;
  createdAt: string;
  updatedAt?: string;
}

export function getRuleStatusLabel(rule: MonitoringRule): string {
  return rule.enabled ? 'Active' : 'Inactive';
}

export function getRuleActionLabel(action: RuleAction): string {
  switch (action) {
    case 'create_alert':
      return 'Créer une alerte';
    case 'flag_for_review':
      return 'Signaler pour revue';
  }
}

export function getConditionGroupModeLabel(mode: ConditionGroupMode): string {
  switch (mode) {
    case 'all':
      return 'Toutes les conditions';
    case 'any':
      return 'Au moins une condition';
  }
}

export function getConditionGroupModeConjunction(mode: ConditionGroupMode): string {
  switch (mode) {
    case 'all':
      return ' ET ';
    case 'any':
      return ' OU ';
  }
}

export function getRuleConditionDisplayText(condition: RuleCondition): string {
  const suffix = condition.unit ? ` ${condition.unit}` : '';
  return `${condition.metricLabel} ${condition.operator} ${condition.value}${suffix}`;
}

export function getRuleGroupSummary(group: RuleGroup): string {
  return group.conditions.map((c) => getRuleConditionDisplayText(c)).join(getConditionGroupModeConjunction(group.mode));
}

export function isRuleComplete(rule: MonitoringRule): boolean {
  return rule.name.trim().length > 0 && isRuleGroupValid(rule.conditionGroup);
}

export function isRuleGroupValid(group: RuleGroup): boolean {
  return group.conditions.length > 0 && group.conditions.every((c) => isRuleConditionComplete(c));
}

export function isRuleConditionComplete(condition: RuleCondition): boolean {
  if (condition.metric.trim().length === 0) return false;
  if (condition.operator === 'changed') return true;
  return condition.value.trim().length > 0;
}

export function getRuleValidationMessage(rule: MonitoringRule): string | null {
  if (rule.name.trim().length === 0) return 'Donnez un nom à la règle.';
  if (rule.conditionGroup.conditions.length === 0) return 'Ajoutez au moins une condition.';
  if (!isRuleGroupValid(rule.conditionGroup)) return 'Complétez toutes les conditions.';
  return null;
}

export function createEmptyRuleGroup(): RuleGroup {
  return {
    id: `group_${Date.now()}`,
    mode: 'all',
    conditions: [],
  };
}

export function createEmptyRuleCondition(metricKey?: string, metricLabel?: string): RuleCondition {
  return {
    id: `cond_${Date.now()}`,
    metric: metricKey ?? '',
    metricLabel: metricLabel ?? '',
    operator: 'equals',
    value: '',
    unit: '',
    comparisonMode: 'absolute',
  };
}

export function sortRules(rules: MonitoringRule[]): MonitoringRule[] {
  return [...rules].sort((a, z) => {
    if (a.enabled !== z.enabled) return a.enabled ? -1 : 1;
    const byPriority = getAlertPrioritySortWeight(a.priority) - getAlertPrioritySortWeight(z.priority);
    if (byPriority !== 0) return byPriority;
    return a.name.localeCompare(z.name);
  });
}

export function getAlertPrioritySortWeight(priority: AlertPriority): number {
  switch (priority) {
    case 'high':
      return 0;
    case 'medium':
      return 1;
    case 'low':
      return 2;
    case 'informational':
      return 3;
  }
}

export function getAlertPriorityLabel(priority: AlertPriority): string {
  switch (priority) {
    case 'high':
      return 'Priorité élevée';
    case 'medium':
      return 'À revoir';
    case 'low':
      return 'Priorité faible';
    case 'informational':
      return 'Information';
  }
}
