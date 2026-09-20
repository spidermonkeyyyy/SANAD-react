import { RuleRepository } from './rule';
import { MonitoringRule, RuleMetric } from '../../types/rule';

const SEED_RULES: MonitoringRule[] = [
  {
    id: 'rule_001',
    name: 'Aggravation respiratoire',
    description: 'Détection d\'aggravation respiratoire',
    enabled: true,
    conditionGroup: {
      id: 'g1',
      mode: 'all',
      conditions: [
        {
          id: 'c1',
          metric: 'spo2',
          metricLabel: 'SpO₂',
          operator: 'less_than_baseline',
          value: '-3',
          unit: '%',
          comparisonMode: 'baseline',
        },
      ],
    },
    action: 'create_alert',
    priority: 'high',
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'rule_002',
    name: 'Variation des symptômes',
    description: 'Toux ou expectorations modifiées',
    enabled: true,
    conditionGroup: {
      id: 'g2',
      mode: 'any',
      conditions: [
        { id: 'c2', metric: 'cough', metricLabel: 'Toux', operator: 'changed', value: '', unit: '', comparisonMode: 'absolute' },
        { id: 'c3', metric: 'sputum', metricLabel: 'Expectorations', operator: 'changed', value: '', unit: '', comparisonMode: 'absolute' },
      ],
    },
    action: 'create_alert',
    priority: 'medium',
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'rule_003',
    name: 'Suivi de traitement incomplet',
    description: 'Prises confirmées < 80%',
    enabled: true,
    conditionGroup: {
      id: 'g3',
      mode: 'all',
      conditions: [
        { id: 'c4', metric: 'adherence', metricLabel: 'Prises confirmées', operator: 'less_than', value: '80', unit: '%', comparisonMode: 'absolute' },
      ],
    },
    action: 'create_alert',
    priority: 'medium',
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'rule_004',
    name: 'Suivi incomplet',
    description: 'Jours sans suivi >= 2',
    enabled: false,
    conditionGroup: {
      id: 'g4',
      mode: 'all',
      conditions: [
        { id: 'c5', metric: 'submission_gap', metricLabel: 'Jours sans suivi', operator: 'greater_than_or_equal', value: '2', unit: 'j', comparisonMode: 'absolute' },
      ],
    },
    action: 'flag_for_review',
    priority: 'low',
    createdAt: '2026-08-01T00:00:00Z',
  },
];

const AVAILABLE_METRICS: RuleMetric[] = [
  { key: 'spo2', label: 'SpO₂', unit: '%', valueHint: 'valeur configurée', supportedOperators: ['less_than', 'less_than_or_equal', 'greater_than', 'greater_than_or_equal', 'less_than_baseline', 'greater_than_baseline'] },
  { key: 'dyspnea', label: 'Dyspnée (mMRC)', unit: '', valueHint: 'niveau configuré', supportedOperators: ['equals', 'greater_than_or_equal', 'less_than_or_equal', 'changed', 'greater_than_baseline'] },
  { key: 'cough', label: 'Toux', unit: '', valueHint: 'état configuré', supportedOperators: ['equals', 'not_equals', 'changed', 'greater_than_baseline'] },
  { key: 'sputum', label: 'Expectorations', unit: '', valueHint: 'état configuré', supportedOperators: ['equals', 'not_equals', 'changed'] },
  { key: 'adherence', label: 'Prises confirmées', unit: '%', valueHint: 'seuil configuré', supportedOperators: ['less_than', 'less_than_or_equal', 'greater_than_baseline'] },
  { key: 'submission_gap', label: 'Jours sans suivi', unit: 'j', valueHint: 'nombre de jours', supportedOperators: ['greater_than', 'greater_than_or_equal'] },
];

export class MockRuleRepository implements RuleRepository {
  private rules: MonitoringRule[] = [...SEED_RULES];

  async getRules(): Promise<MonitoringRule[]> {
    await new Promise((r) => setTimeout(r, 50));
    return [...this.rules];
  }

  async getEnabledRules(): Promise<MonitoringRule[]> {
    return (await this.getRules()).filter((r) => r.enabled);
  }

  async getRuleById(ruleId: string): Promise<MonitoringRule | null> {
    return (await this.getRules()).find((r) => r.id === ruleId) ?? null;
  }

  async createRule(rule: MonitoringRule): Promise<MonitoringRule> {
    if (!rule.name.trim()) throw new Error('Rule name is required');
    const created: MonitoringRule = {
      ...rule,
      id: `rule_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.rules.push(created);
    return created;
  }

  async updateRule(rule: MonitoringRule): Promise<MonitoringRule> {
    const idx = this.rules.findIndex((r) => r.id === rule.id);
    if (idx === -1) throw new Error('Rule not found');
    this.rules[idx] = rule;
    return rule;
  }

  async setRuleEnabled(ruleId: string, enabled: boolean): Promise<MonitoringRule> {
    const rule = await this.getRuleById(ruleId);
    if (!rule) throw new Error('Rule not found');
    const updated = { ...rule, enabled };
    return this.updateRule(updated);
  }

  async getAvailableMetrics(): Promise<RuleMetric[]> {
    await new Promise((r) => setTimeout(r, 100));
    return [...AVAILABLE_METRICS];
  }
}
