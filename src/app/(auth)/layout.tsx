/**
 * Auth Layout
 *
 * This layout wraps all public/auth routes under (auth).
 * Does NOT apply MainLayout - clean auth pages without Sidebar/TopBar.
 *
 * Public routes:
 * - /login
 * - /register
 * - / (landing page - if moved here later)
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
