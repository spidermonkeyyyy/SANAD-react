import { MockRuleRepository } from '../rule-repository.mock';
import { MonitoringRule, RuleAction, AlertPriority, RuleGroup, RuleCondition } from '../../../types/rule';

describe('MockRuleRepository', () => {
  let repository: MockRuleRepository;

  beforeEach(() => {
    repository = new MockRuleRepository();
  });

  it('seeds four rules with three enabled and a metric catalogue', async () => {
    const rules = await repository.getRules();
    expect(rules).toHaveLength(4);
    const enabled = await repository.getEnabledRules();
    expect(enabled).toHaveLength(3);
    const metrics = await repository.getAvailableMetrics();
    expect(metrics).toHaveLength(6);
  });

  it('createRule rejects an incomplete rule', async () => {
    const empty: MonitoringRule = {
      id: 'x',
      name: '',
      description: '',
      enabled: true,
      conditionGroup: { id: 'g', mode: 'all', conditions: [] },
      action: 'create_alert',
      priority: 'medium',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    await expect(repository.createRule(empty)).rejects.toThrow('Rule name is required');
  });

  it('createRule assigns a fresh id and setRuleEnabled toggles', async () => {
    const rule: MonitoringRule = {
      id: 'x',
      name: 'Temp',
      description: 'desc',
      enabled: true,
      conditionGroup: {
        id: 'g',
        mode: 'all',
        conditions: [
          {
            id: 'c',
            metric: 'spo2',
            metricLabel: 'SpO₂',
            operator: 'less_than',
            value: '90',
            unit: '%',
            comparisonMode: 'absolute',
          },
        ],
      },
      action: 'create_alert',
      priority: 'low',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const created = await repository.createRule(rule);
    expect(created.id).not.toEqual('x');

    const toggled = await repository.setRuleEnabled(created.id, false);
    expect(toggled.enabled).toBe(false);
  });
});
