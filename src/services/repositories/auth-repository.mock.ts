import { AuthRepository, AppUser, UserRole } from '../../types/auth';

export class MockAuthRepository implements AuthRepository {
  private currentUser: AppUser | null = null;
  private onboardingCompleted = false;

  async login(email: string, _password: string): Promise<AppUser> {
    await new Promise((r) => setTimeout(r, 200));
    const lowerEmail = email.toLowerCase().trim();

    let role: UserRole = 'patient';
    let name = 'Jean Dupont (Patient)';
    let id = 'patient-1';

    if (
      lowerEmail.includes('nurse') ||
      lowerEmail.includes('infirmier') ||
      lowerEmail.includes('pneumo') ||
      lowerEmail.includes('admin')
    ) {
      if (lowerEmail.includes('pneumo')) {
        role = 'pneumologist';
        name = 'Dr. Aris (Pneumologue)';
        id = 'pneumo-1';
      } else if (lowerEmail.includes('admin')) {
        role = 'admin';
        name = 'Administrateur Sanad';
        id = 'admin-1';
      } else {
        role = 'nurse';
        name = 'Sarah Martin (Infirmière)';
        id = 'nurse-1';
      }
    }

    const user: AppUser = {
      id,
      name,
      email: lowerEmail,
      role,
    };

    this.currentUser = user;
    return user;
  }

  async register(params: {
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'nurse' | 'pneumologist' | 'admin';
    phone?: string;
    dateOfBirth?: string;
  }): Promise<AppUser> {
    await new Promise((r) => setTimeout(r, 200));
    const user: AppUser = {
      id: `user-${Date.now()}`,
      name: params.name,
      email: params.email.toLowerCase().trim(),
      role: params.role || 'patient',
      phone: params.phone,
      dateOfBirth: params.dateOfBirth,
    };
    this.currentUser = user;
    return user;
  }

  async resetPassword(_email: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<AppUser | null> {
    return this.currentUser;
  }

  async isOnboardingCompleted(): Promise<boolean> {
    return this.onboardingCompleted;
  }

  async setOnboardingCompleted(): Promise<void> {
    this.onboardingCompleted = true;
  }

  authStateChanges(): { next: (callback: (event: string, session: unknown) => void) => { cancel: () => void } } {
    const queue: { event: string; session: unknown }[] = [];
    return {
      next: (callback: (event: string, session: unknown) => void) => {
        const interval = setInterval(() => {
          if (queue.length > 0) {
            const item = queue.shift()!;
            callback(item.event, item.session);
          }
        }, 1000);
        return { cancel: () => clearInterval(interval) };
      },
    };
  }
}
