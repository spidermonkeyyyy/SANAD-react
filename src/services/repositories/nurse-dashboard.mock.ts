import { NurseDashboardRepository } from './nurse-dashboard';
import {
  DashboardSummary,
  NurseAssignment,
  NurseWorklistItem,
  NurseMonitoringRule,
} from '../../types/dashboard';

const LATENCY = {
  summary: 250,
  queue: 250,
  submissions: 200,
  rules: 200,
};

function createSummary(): DashboardSummary {
  return {
    totalPatients: 24,
    highPriorityCount: 3,
    reviewRequiredCount: 5,
    newSubmissionsCount: 7,
  };
}

function createAssignments(): NurseAssignment[] {
  return [
    {
      nurseId: 'n1',
      nurseName: 'Infirmière',
      patientId: 'p1',
      patientName: 'Ahmed Bensalem',
      condition: 'BPCO',
      classification: 'GOLD III',
      priority: 'high',
      hasNewSubmission: true,
      pendingTaskCount: 1,
    },
    {
      nurseId: 'n1',
      nurseName: 'Infirmière',
      patientId: 'p2',
      patientName: 'Marie Dupont',
      condition: 'BPCO',
      classification: 'GOLD II',
      priority: 'reviewRequired',
      hasNewSubmission: false,
      pendingTaskCount: 0,
    },
    {
      nurseId: 'n1',
      nurseName: 'Infirmière',
      patientId: 'p3',
      patientName: 'Jean Lefebvre',
      condition: 'IRC',
      classification: 'Stable',
      priority: 'informational',
      hasNewSubmission: false,
      pendingTaskCount: 0,
    },
  ];
}

function createRecentSubmissions(): NurseWorklistItem[] {
  return [
    {
      id: 'monitoring:ms-1',
      type: 'monitoring',
      patientId: 'p1',
      patientName: 'Ahmed Bensalem',
      title: 'Mesures respiratoires à revoir',
      description: 'Aggravation respiratoire',
      relatedEntityId: 'ms-1',
      timestamp: '2026-08-12T09:42:00.000Z',
      priorityRank: 0,
      statusLabel: 'À revoir',
      isActionable: true,
      actionRoute: '/nurse/patients/p1',
    },
    {
      id: 'alert:alert_001',
      type: 'alert',
      patientId: 'p1',
      patientName: 'Ahmed Bensalem',
      title: 'Données respiratoires à revoir',
      description: 'BPCO · GOLD III',
      relatedEntityId: 'alert_001',
      timestamp: '2026-08-12T09:30:00.000Z',
      priorityRank: 0,
      statusLabel: 'Non traitée',
      isActionable: true,
      actionRoute: '/nurse/alerts/alert_001',
    },
  ];
}

function createMonitoringRules(): NurseMonitoringRule[] {
  return [
    {
      id: 'rule-1',
      title: 'Saturation basse',
      description: 'Vérifier les valeurs de saturation en oxygène et la stabilité clinique.',
      condition: {
        field: 'spo2',
        operator: '<',
        value: '90',
        description: 'Saturation inférieure au seuil de surveillance.',
      },
      action: {
        type: 'nurseReview',
        label: 'Revue infirmière',
        priority: 'high',
      },
    },
    {
      id: 'rule-2',
      title: 'Dyspnée aggravée',
      description: 'Revoir l’évolution de la dyspnée par rapport à la référence du patient.',
      condition: {
        field: 'dyspneaScore',
        operator: '>',
        value: '2',
        description: 'Score de dyspnée plus élevé que la référence.',
      },
      action: {
        type: 'patientContact',
        label: 'Contact patient',
        priority: 'reviewRequired',
      },
    },
  ];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockNurseDashboardRepository implements NurseDashboardRepository {
  async getDashboardSummary(): Promise<DashboardSummary> {
    await delay(LATENCY.summary);
    return createSummary();
  }

  async getPriorityQueue(): Promise<NurseAssignment[]> {
    await delay(LATENCY.queue);
    return createAssignments();
  }

  async getRecentSubmissions(limit = 5): Promise<NurseWorklistItem[]> {
    await delay(LATENCY.submissions);
    const all = createRecentSubmissions();
    return all.slice(0, Math.min(limit, all.length));
  }

  async getMonitoringRules(): Promise<NurseMonitoringRule[]> {
    await delay(LATENCY.rules);
    return createMonitoringRules();
  }
}
