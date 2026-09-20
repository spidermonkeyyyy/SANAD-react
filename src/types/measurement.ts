export enum MeasurementType {
  spo2 = 'spo2',
  heartRate = 'heartRate',
}

export interface MeasurementTypeInfo {
  type: MeasurementType;
  label: string;
  unit: string;
  accessibilityLabel: string;
}

export const MEASUREMENT_TYPE_INFO: Record<MeasurementType, MeasurementTypeInfo> = {
  [MeasurementType.spo2]: {
    type: MeasurementType.spo2,
    label: 'SpO₂',
    unit: '%',
    accessibilityLabel: 'saturation',
  },
  [MeasurementType.heartRate]: {
    type: MeasurementType.heartRate,
    label: 'Heart rate',
    unit: 'bpm',
    accessibilityLabel: 'heart rate',
  },
};

export function measurementTypeInfo(type: MeasurementType): MeasurementTypeInfo {
  return MEASUREMENT_TYPE_INFO[type];
}

export interface ClinicalMeasurement {
  id: string;
  type: MeasurementType;
  value: number;
  unit: string;
  measuredAt: Date;
}

export function clinicalMeasurementIsValid(m: ClinicalMeasurement): boolean {
  return Number.isFinite(m.value) && m.unit.length > 0 && m.value >= 0;
}

export enum TrendDirection {
  insufficientData = 'insufficientData',
  stable = 'stable',
  upward = 'upward',
  downward = 'downward',
}

export interface TrendSummary {
  type: MeasurementType;
  direction: TrendDirection;
  description: string;
  readingCount: number;
  change: number | null;
}
