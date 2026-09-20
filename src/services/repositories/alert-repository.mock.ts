import { Alert, AlertPriority, AlertStatus, NurseAction, NurseDecision, doesNurseDecisionRequireJustification, doesNurseActionRequireNote } from '../../types/alert';
import { AlertRepository } from './alert';
const LATENCY_MS = 280;

function seedAnchorDate(): Date {
  return new Date('2026-08-12T09:42:00.000Z');
}

export class MockAlertRepository implements AlertRepository {
  private alerts: Alert[] = [];

  constructor(initial?: Alert[]) {
    if (initial && initial.length > 0) {
      this.alerts = [...initial];
    } else {
      this.alerts = this.createSeed();
    }
  }

  private createSeed(): Alert[] {
    const now = seedAnchorDate();

    return [
      {
        id: 'alert_001',
        patientId: 'p1',
        patientName: 'Ahmed Bensalem',
        patientSummary: 'BPCO · GOLD III',
        reason: 'Données respiratoires à revoir',
        priority: AlertPriority.high,
        status: AlertStatus.unread,
        createdAt: new Date(now.getTime() - 12 * 60 * 1000).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null,
        triggeredRules: [
          {
            ruleId: 'rule_001',
            ruleName: 'Aggravation respiratoire',
            matched: true,
            matchedCriteria: [
              'Variation de la dyspnée',
              'Modification des expectorations',
            ],
            priority: AlertPriority.high,
            evaluatedAt: new Date(now.getTime() - 12 * 60 * 1000).toISOString(),
          },
        ],
        supportingMeasurements: [
          {
            label: 'SpO₂',
            value: '91 %',
            referenceValue: '95 %',
            variation: '-4 points',
            trend: 'down',
          },
          {
            label: 'Dyspnée',
            value: 'mMRC 3',
            referenceValue: 'mMRC 2',
            variation: '+1',
            trend: 'up',
          },
          {
            label: 'Expectorations',
            value: 'Modification signalée',
            trend: 'unknown',
            note: 'Signalée par le patient dans le suivi du jour',
          },
        ],
        submissionId: 'ms-1',
      },
      {
        id: 'alert_002',
        patientId: 'p1',
        patientName: 'Ahmed Bensalem',
        patientSummary: 'BPCO · GOLD III',
        reason: 'Suivi du traitement à vérifier',
        priority: AlertPriority.medium,
        status: AlertStatus.unread,
        createdAt: new Date(now.getTime() - 26 * 60 * 1000).toISOString(),
        acknowledgedAt: null,
        resolvedAt: null,
        triggeredRules: [
          {
            ruleId: 'rule_003',
            ruleName: 'Suivi de traitement incomplet',
            matched: true,
            matchedCriteria: ['Prises confirmées inférieures au seuil configuré'],
            priority: AlertPriority.medium,
            evaluatedAt: new Date(now.getTime() - 26 * 60 * 1000).toISOString(),
          },
        ],
        supportingMeasurements: [
          {
            label: 'Prises confirmées',
            value: '72 %',
            referenceValue: '90 %',
            variation: '-18 points',
            trend: 'down',
          },
        ],
        submissionId: 'ms-1',
      },
      {
        id: 'alert_003',
        patientId: 'p2',
        patientName: 'Marie Dupont',
        patientSummary: 'BPCO · GOLD II',
        reason: 'Nouvelle variation signalée',
        priority: AlertPriority.medium,
        status: AlertStatus.acknowledged,
        createdAt: new Date(now.getTime() - 32 * 60 * 1000).toISOString(),
        acknowledgedAt: new Date(now.getTime() - 8 * 60 * 1000).toISOString(),
        resolvedAt: null,
        assignedNurseId: 'nurse_001',
        triggeredRules: [
          {
            ruleId: 'rule_002',
            ruleName: 'Variation des symptômes',
            matched: true,
            matchedCriteria: ['Variation de la toux par rapport à la référence'],
            priority: AlertPriority.medium,
            evaluatedAt: new Date(now.getTime() - 32 * 60 * 1000).toISOString(),
          },
        ],
        supportingMeasurements: [
          {
            label: 'Toux',
            value: 'Plus importante',
            referenceValue: 'Stable',
            trend: 'up',
          },
          {
            label: 'SpO₂',
            value: '93 %',
            referenceValue: '94 %',
            variation: '-1 point',
            trend: 'down',
          },
        ],
        submissionId: 'ms-2',
      },
      {
        id: 'alert_004',
        patientId: 'p3',
        patientName: 'Jean Lefebvre',
        patientSummary: 'IRC · Suivi stable',
        reason: 'Suivi quotidien non transmis',
        priority: AlertPriority.low,
        status: AlertStatus.inProgress,
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        acknowledgedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        resolvedAt: null,
        assignedNurseId: 'nurse_001',
        nurseAction: NurseAction.contactPatient,
        nurseDecision: NurseDecision.enhancedMonitoring,
        actionNote: 'Message laissé au patient, rappel prévu demain.',
        triggeredRules: [
          {
            ruleId: 'rule_004',
            ruleName: 'Suivi incomplet',
            matched: true,
            matchedCriteria: ['Aucun suivi reçu sur la période configurée'],
            priority: AlertPriority.low,
            evaluatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
          },
        ],
        supportingMeasurements: [
          {
            label: 'Dernier suivi',
            value: 'Il y a 2 jours',
            referenceValue: 'Quotidien',
            trend: 'unknown',
          },
        ],
        submissionId: 'ms-3',
      },
      {
        id: 'alert_005',
        patientId: 'p2',
        patientName: 'Marie Dupont',
        patientSummary: 'BPCO · GOLD II',
        reason: 'Données respiratoires à revoir',
        priority: AlertPriority.medium,
        status: AlertStatus.resolved,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        acknowledgedAt: new Date(now.getTime() - (2 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000)).toISOString(),
        resolvedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000).toISOString(),
        assignedNurseId: 'nurse_001',
        nurseAction: NurseAction.monitoring,
        nurseDecision: NurseDecision.notConcerning,
        justification: 'Valeurs revenues à la référence habituelle du patient au contrôle suivant.',
        resolutionNote: 'Surveillance poursuivie selon le protocole habituel.',
        triggeredRules: [
          {
            ruleId: 'rule_001',
            ruleName: 'Aggravation respiratoire',
            matched: true,
            matchedCriteria: ['Variation de la saturation'],
            priority: AlertPriority.medium,
            evaluatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
        supportingMeasurements: [
          {
            label: 'SpO₂',
            value: '92 %',
            referenceValue: '95 %',
            variation: '-3 points',
            trend: 'down',
          },
        ],
        submissionId: 'ms-4',
      },
    ];
  }

  private findIndex(alertId: string): number {
    const index = this.alerts.findIndex((a) => a.id === alertId);
    if (index === -1) {
      throw new Error(`Alerte introuvable: ${alertId}`);
    }
    return index;
  }

  async getAlerts(): Promise<Alert[]> {
    await this.latency(LATENCY_MS);
    return [...this.alerts];
  }

  async getAlertById(alertId: string): Promise<Alert | null> {
    await this.latency(120);
    return this.alerts.find((a) => a.id === alertId) ?? null;
  }

  async getPatientAlerts(patientId: string): Promise<Alert[]> {
    await this.latency(LATENCY_MS);
    return this.alerts.filter((a) => a.patientId === patientId);
  }

  async getAlertsByStatus(status: AlertStatus): Promise<Alert[]> {
    await this.latency(LATENCY_MS);
    return this.alerts.filter((a) => a.status === status);
  }

  async getAlertsByPriority(priority: AlertPriority): Promise<Alert[]> {
    await this.latency(LATENCY_MS);
    return this.alerts.filter((a) => a.priority === priority);
  }

  async acknowledgeAlert(alertId: string, nurseId: string): Promise<Alert> {
    await this.latency(LATENCY_MS);
    const index = this.findIndex(alertId);
    const current = this.alerts[index];

    if (current.status !== AlertStatus.unread) {
      return current;
    }

    const updated: Alert = {
      ...current,
      status: AlertStatus.acknowledged,
      acknowledgedAt: seedAnchorDate().toISOString(),
      assignedNurseId: nurseId,
    };

    this.alerts[index] = updated;
    return updated;
  }

  async recordAction(
    alertId: string,
    action: NurseAction,
    decision: NurseDecision,
    actionNote?: string,
    justification?: string,
  ): Promise<Alert> {
    await this.latency(LATENCY_MS);
    const index = this.findIndex(alertId);
    const current = this.alerts[index];

    if (current.status === AlertStatus.unread) {
      throw new Error("L'alerte doit être prise en charge avant d'enregistrer une action.");
    }

    if (doesNurseDecisionRequireJustification(decision) && (!justification || justification.trim() === '')) {
      throw new Error('Une justification est requise pour cette décision.');
    }

    if (doesNurseActionRequireNote(action) && (!actionNote || actionNote.trim() === '')) {
      throw new Error('Un commentaire est requis pour l\'action choisie.');
    }

    const updated: Alert = {
      ...current,
      status: AlertStatus.inProgress,
      nurseAction: action,
      nurseDecision: decision,
      actionNote: actionNote ?? current.actionNote ?? undefined,
      justification: justification ?? current.justification ?? undefined,
    };

    this.alerts[index] = updated;
    return updated;
  }

  async resolveAlert(alertId: string, resolutionNote?: string): Promise<Alert> {
    await this.latency(LATENCY_MS);
    const index = this.findIndex(alertId);
    const current = this.alerts[index];

    if (current.status === AlertStatus.unread) {
      throw new Error("L'alerte doit être prise en charge avant d'être résolue.");
    }

    if (current.status === AlertStatus.resolved) {
      return current;
    }

    const updated: Alert = {
      ...current,
      status: AlertStatus.resolved,
      resolvedAt: seedAnchorDate().toISOString(),
      resolutionNote: resolutionNote ?? current.resolutionNote ?? undefined,
    };

    this.alerts[index] = updated;
    return updated;
  }

  private latency(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
