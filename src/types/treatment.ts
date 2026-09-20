// ─── Medication Device Types ──────────────────────────────────────────────────
export type MedicationDeviceType =
  | 'pressurizedInhaler'
  | 'dryPowderInhaler'
  | 'nebulizer'
  | 'oral'
  | 'other';

// ─── Medication Model ─────────────────────────────────────────────────────────
export interface Medication {
  id: string;
  label: string;
  prescribedFrequency: string;
  deviceType: MedicationDeviceType;
}

// ─── Medication Status ─────────────────────────────────────────────────────────
export type MedicationStatus = 'upcoming' | 'pending' | 'confirmed' | 'notConfirmed';

// ─── Medication Reminder ──────────────────────────────────────────────────────
export interface MedicationReminder {
  id: string;
  medicationId: string;
  medicationLabel: string;
  scheduledAt: string; // ISO date-time string
  status: MedicationStatus;
  frequency: string;
  confirmedAt?: string; // ISO date-time string, present when confirmed
}

// ─── Adherence Record ─────────────────────────────────────────────────────────
export interface AdherenceRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  scheduledCount: number;
  confirmedCount: number;
}

// ─── Repository Interface ─────────────────────────────────────────────────────
export interface TreatmentRepository {
  getTodaysReminders(): Promise<MedicationReminder[]>;
  confirmReminder(reminderId: string): Promise<MedicationReminder>;
  getWeeklyAdherence(days?: number): Promise<AdherenceRecord[]>;
  getHistory(limit?: number): Promise<MedicationReminder[]>;
}

// ─── Derived/Utility Types ────────────────────────────────────────────────────
export interface TreatmentActions {
  loadAll: () => Promise<void>;
  loadTodayReminders: () => Promise<void>;
  loadAdherence: () => Promise<void>;
  loadHistory: () => Promise<void>;
  confirmReminder: (reminderId: string) => Promise<void>;
  reset: () => void;
}

export interface TreatmentState {
  isLoadingReminders: boolean;
  isLoadingHistory: boolean;
  isLoadingAdherence: boolean;
  todayReminders: MedicationReminder[];
  history: MedicationReminder[];
  adherenceRecords: AdherenceRecord[];
  confirmingId: string | null;
  errorMessage: string | null;
}