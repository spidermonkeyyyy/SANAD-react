import { MonitoringRule, RuleMetric } from '../../types/rule';

export interface RuleRepository {
  getRules(): Promise<MonitoringRule[]>;
  getEnabledRules(): Promise<MonitoringRule[]>;
  getRuleById(ruleId: string): Promise<MonitoringRule | null>;
  createRule(rule: MonitoringRule): Promise<MonitoringRule>;
  updateRule(rule: MonitoringRule): Promise<MonitoringRule>;
  setRuleEnabled(ruleId: string, enabled: boolean): Promise<MonitoringRule>;
  getAvailableMetrics(): Promise<RuleMetric[]>;
}
