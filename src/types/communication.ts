// ─── Enums ────────────────────────────────────────────────────────────────────

export type MessageStatus = 'sending' | 'sent' | 'read';
export type MessageType = 'text' | 'careUpdate' | 'followUp' | 'systemNotification';
export type MessageSender = 'patient' | 'careTeam' | 'system';
export type TaskStatus = 'open' | 'done';
export type TaskType = 'monitoring' | 'inhalerVideo' | 'followUp';
export type CareRequestType = 'newMonitoring' | 'inhalerVideo' | 'other';
export type CareRequestStatus = 'pending' | 'completed';

// ─── Message ──────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  type: MessageType;
  text: string;
  createdAt: string; // ISO
  status: MessageStatus;
  actionLabel?: string;
  actionRoute?: string;
  linkedCareRequestId?: string;
  linkedTaskId?: string;
}

// ─── Care Request ──────────────────────────────────────────────────────────────

export interface CareRequest {
  id: string;
  conversationId: string;
  patientId: string;
  type: CareRequestType;
  reason: string;
  requestedData: string[];
  status: CareRequestStatus;
  createdAt: string;
  dueDate?: string;
  createdByNurseId: string;
}

// ─── Task ─────────────────────────────────────────────────────────────────────

export interface CommunicationTask {
  id: string;
  patientId: string;
  conversationId?: string;
  type: TaskType;
  title: string;
  description: string;
  actionRoute: string;
  status: TaskStatus;
  createdAt: string;
  dueDate?: string;
  linkedCareRequestId?: string;
}

// ─── Conversation ─────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientSummary: string;
  messages: Message[];
  careRequests: CareRequest[];
  tasks: CommunicationTask[];
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
}

// ─── Repository Interface ─────────────────────────────────────────────────────

export interface ConversationRepository {
  getConversationsForPatient(patientId: string): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | null>;
  sendPatientMessage(conversationId: string, text: string): Promise<Conversation>;
  markRead(conversationId: string, viewer: MessageSender): Promise<Conversation>;
  getPatientTasks(patientId: string): Promise<CommunicationTask[]>;
  completeTask(taskId: string): Promise<void>;
}

// ─── Store State ──────────────────────────────────────────────────────────────

export interface PatientMessagesState {
  conversations: Conversation[];
  tasks: CommunicationTask[];
  isLoading: boolean;
  errorMessage: string | null;
}