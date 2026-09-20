const { MockAlertRepository } = require('./src/services/repositories/alert-repository.mock');
const { AlertStatus, AlertPriority } = require('./src/types/alert');

const alerts = [{
  id: 'a1',
  patientId: 'p1',
  patientName: 'Ahmed Bensalem',
  patientSummary: 'BPCO · GOLD III',
  reason: 'Test alert',
  priority: AlertPriority.high,
  status: AlertStatus.unread,
  createdAt: '2026-08-12T10:00:00.000Z',
  acknowledgedAt: null,
  resolvedAt: null,
  triggeredRules: [],
  supportingMeasurements: [],
  submissionId: 'ms-1',
}];

const repo = new MockAlertRepository(alerts);
repo.acknowledgeAlert('a1', 'nurse_001').then(result => {
  console.log('result status:', result.status);
}).catch(err => {
  console.log('error:', err.message);
});
