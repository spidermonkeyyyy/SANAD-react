export enum QuestionType {
  singleChoice = 'singleChoice',
  numericInput = 'numericInput',
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface MonitoringQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options: QuestionOption[];
  required: boolean;
  order: number;
  unit?: string;
  minValue?: number;
  maxValue?: number;
}
