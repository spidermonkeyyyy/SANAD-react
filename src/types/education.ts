export interface EducationalContent {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'sevrage' | 'rehabilitation' | 'inhalation' | 'general';
  imageUrl?: string;
  isPlaceholder: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  videoUrl?: string; // null = placeholder video
  instructions: string; // placeholder if validated=false
  order: number;
}

/** Formatted duration matching Flutter source: "10 min" / "1h 30min" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

/** Session date label matching Flutter: "Aujourd'hui · HH:mm" / "Hier · HH:mm" / "dd/MM · HH:mm" */
export function formatSessionDateTime(iso: string): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sess = new Date(new Date(iso).getFullYear(), new Date(iso).getMonth(), new Date(iso).getDate());
  const hh = (n: number) => String(n).padStart(2, '0');
  const time = `${hh(new Date(iso).getHours())}:${hh(new Date(iso).getMinutes())}`;
  const dateStr = `${String(new Date(iso).getDate()).padStart(2, '0')}/${String(new Date(iso).getMonth() + 1).padStart(2, '0')}`;
  if (sess.getTime() === today.getTime()) return `Aujourd'hui · ${time}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (sess.getTime() === yesterday.getTime()) return `Hier · ${time}`;
  return `${dateStr} · ${time}`;
}

export interface ExerciseSession {
  id: string;
  exerciseId: string;
  exerciseName: string;
  completedAt: string; // ISO
  actualDurationMinutes: number;
  perceivedEffort?: number; // 1-10
  notes?: string;
}

export interface RehabilitationProgram {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  targetWeeklySessions: number;
  startDate: string;
  endDate: string;
}

export interface SmokingEntry {
  id: string;
  date: string;
  cigarettesConsumed: number;
  cravingIntensity: 'low' | 'moderate' | 'high';
  trigger: 'habit' | 'stress' | 'social' | 'emotion' | 'other';
  personalNote?: string;
  createdAt: string;
}

export type EducationalCategory = 'sevrage' | 'rehabilitation' | 'inhalation' | 'general';

export type CravingIntensity = 'low' | 'moderate' | 'high';
export type SmokingTrigger = 'habit' | 'stress' | 'social' | 'emotion' | 'other';
