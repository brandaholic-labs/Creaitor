import { MainLayout } from '@/components/layout/MainLayout';

/**
 * Dashboard Layout
 *
 * This layout wraps all authenticated/protected routes under (dashboard).
 * Applies MainLayout (Sidebar + TopBar) to all child pages.
 *
 * Protected routes:
 * - /dashboard/*
 * - /brands/*
 * - /calendar/*
 * - /settings/*
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
