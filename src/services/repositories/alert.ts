import { Alert, AlertPriority, AlertStatus, NurseAction, NurseDecision } from '../../types/alert';

export interface AlertRepository {
  getAlerts(): Promise<Alert[]>;
  getPatientAlerts(patientId: string): Promise<Alert[]>;
  getAlertById(alertId: string): Promise<Alert | null>;
  getAlertsByStatus(status: AlertStatus): Promise<Alert[]>;
  getAlertsByPriority(priority: AlertPriority): Promise<Alert[]>;
  acknowledgeAlert(alertId: string, nurseId: string): Promise<Alert>;
  recordAction(
    alertId: string,
    action: NurseAction,
    decision: NurseDecision,
    actionNote?: string,
    justification?: string,
  ): Promise<Alert>;
  resolveAlert(alertId: string, resolutionNote?: string): Promise<Alert>;
}
