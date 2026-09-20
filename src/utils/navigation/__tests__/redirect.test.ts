import { isNurseSideRole, resolveRedirect } from '../redirect';
import { AuthStatus } from '../../../types/auth';

describe('Navigation Redirect', () => {
  it('unauthenticated on auth route -> no redirect', () => {
    expect(resolveRedirect({ status: 'unauthenticated', role: null, location: '/sign-in' })).toBeNull();
  });

  it('unauthenticated on protected route -> redirect to authGate', () => {
    expect(resolveRedirect({ status: 'unauthenticated', role: null, location: '/patient/home' })).toBe('/auth-gate');
  });

  it('authenticated patient on auth route -> redirect to patient home', () => {
    expect(resolveRedirect({ status: 'authenticated', role: 'patient', location: '/sign-in' })).toBe('/patient/home');
  });

  it('authenticated nurse on auth route -> redirect to nurse dashboard', () => {
    expect(resolveRedirect({ status: 'authenticated', role: 'nurse', location: '/sign-in' })).toBe('/nurse/dashboard');
  });

  it('authenticated patient on nurse route -> redirect to patient home', () => {
    expect(resolveRedirect({ status: 'authenticated', role: 'patient', location: '/nurse/dashboard' })).toBe('/patient/home');
  });

  it('authenticated nurse on patient route -> redirect to nurse dashboard', () => {
    expect(resolveRedirect({ status: 'authenticated', role: 'nurse', location: '/patient/home' })).toBe('/nurse/dashboard');
  });

  it('initializing -> no redirect', () => {
    expect(resolveRedirect({ status: 'initializing', role: null, location: '/sign-in' })).toBeNull();
  });

  it('error -> no redirect', () => {
    expect(resolveRedirect({ status: 'error', role: null, location: '/sign-in' })).toBeNull();
  });
});

describe('Role Classification', () => {
  it('patient is not nurse-side', () => {
    expect(isNurseSideRole('patient')).toBe(false);
  });

  it('nurse is nurse-side', () => {
    expect(isNurseSideRole('nurse')).toBe(true);
  });

  it('pneumologist is nurse-side', () => {
    expect(isNurseSideRole('pneumologist')).toBe(true);
  });

  it('admin is nurse-side', () => {
    expect(isNurseSideRole('admin')).toBe(true);
  });

  it('null/undefined is not nurse-side', () => {
    expect(isNurseSideRole(null)).toBe(false);
    expect(isNurseSideRole(undefined)).toBe(false);
  });
});
