import { MonitoringSubmission, EvaluationResult } from '../../types/monitoring';

export function evaluateSubmission(submission: MonitoringSubmission): EvaluationResult {
  const spo2Val = submission.spo2Value;

  const isLowSpo2 = spo2Val !== null && spo2Val < 92;

  const dyspneaAnswer = submission.answers['dyspnea']?.value as string | undefined;
  const isHighDyspnea = dyspneaAnswer === 'mmrc_3' || dyspneaAnswer === 'mmrc_4';

  if (isLowSpo2 || isHighDyspnea) {
    return {
      status: 'review_required',
      triggeredRuleIds: ['RULE_LOW_SPO2_OR_DYSPNEA'],
      patientMessage:
        'Votre suivi a bien été transmis. Certaines informations nécessitent une vérification par votre équipe soignante. Votre infirmier référent a été notifié.',
    };
  }

  return {
    status: 'normal',
    triggeredRuleIds: [],
    patientMessage:
      'Vos informations ont été transmises à votre équipe soignante. Merci d\'avoir complété votre suivi quotidien.',
  };
}
