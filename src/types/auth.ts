export type UserRole = 'patient' | 'nurse' | 'pneumologist' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string | null;
  dateOfBirth?: string | null;
}

export type AuthStatus = 'initializing' | 'unauthenticated' | 'authenticating' | 'authenticated' | 'error';

export interface AuthState {
  status: AuthStatus;
  user: AppUser | null;
  errorMessage: string | null;
  isOnboardingCompleted: boolean;
}

export interface AuthRepository {
  login(email: string, password: string): Promise<AppUser>;
  register(params: {
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'nurse' | 'pneumologist' | 'admin';
    phone?: string;
    dateOfBirth?: string;
  }): Promise<AppUser>;
  resetPassword(email: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AppUser | null>;
  isOnboardingCompleted(): Promise<boolean>;
  setOnboardingCompleted(): Promise<void>;
  authStateChanges(): { next: (callback: (event: string, session: unknown) => void) => { cancel: () => void } };
}

export interface AuthFailure {
  type: 'invalid_credentials' | 'email_already_registered' | 'weak_password' | 'invalid_email' | 'network_failure' | 'session_expired' | 'unknown';
  userMessage: string;
}
