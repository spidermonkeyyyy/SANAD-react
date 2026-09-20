import { AppUser, UserRole } from '../../types/auth';

export function isNurseSideRole(role: UserRole | null | undefined): boolean {
  return role === 'nurse' || role === 'pneumologist' || role === 'admin';
}

export function resolveRedirect(params: {
  status: string;
  role: UserRole | null | undefined;
  location: string;
}): string | null {
  const { status, role, location } = params;
  const nurseSide = isNurseSideRole(role);

  const roleHome = nurseSide ? '/nurse/dashboard' : '/patient/home';

  const authRoutes = ['/onboarding', '/sign-in', '/sign-up', '/splash', '/auth-gate', '/forgot-password'];
  const isAuthRoute = authRoutes.includes(location);

  switch (status) {
    case 'initializing':
    case 'authenticating':
    case 'error':
      return null;
    case 'unauthenticated':
      return isAuthRoute ? null : '/auth-gate';
    case 'authenticated':
      if (isAuthRoute) return roleHome;
      const inNurseArea = location.startsWith('/nurse');
      const inPatientArea = location.startsWith('/patient');
      if (nurseSide && inPatientArea) return '/nurse/dashboard';
      if (!nurseSide && inNurseArea) return '/patient/home';
      return null;
    default:
      return null;
  }
}
