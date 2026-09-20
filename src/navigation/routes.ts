export type RootStackParamList = {
  splash: undefined;
  authGate: undefined;
  signIn: undefined;
  signUp: undefined;
  forgotPassword: undefined;
  patientTabs: undefined;
  nurseTabs: undefined;
  rules: undefined;
  ruleDetail: { ruleId: string };
  ruleBuilder: { ruleId?: string };
  designSystem: undefined;
};

export type PatientTabParamList = {
  patientHome: undefined;
  monitor: undefined;
  monitorQuestion: undefined;
  monitorReview: undefined;
  monitorResult: undefined;
  monitorHistory: undefined;
  messages: undefined;
  treatment: undefined;
  profile: undefined;
};

export type NurseTabParamList = {
  nurseDashboard: undefined;
  patients: undefined;
  patientDetail: { patientId: string };
  alerts: undefined;
  messages: undefined;
  profile: undefined;
  rules: undefined;
  ruleDetail: { ruleId: string };
  ruleBuilder: { ruleId?: string };
};
