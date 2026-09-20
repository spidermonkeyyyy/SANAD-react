import { AppUser, AuthFailure, AuthState } from '../../types/auth';

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
