'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout Component
 *
 * Main layout component that wraps authenticated pages.
 * Contains Sidebar and TopBar, with responsive behavior.
 *
 * Responsive:
 * - Desktop (≥ lg): Sidebar always visible, TopBar horizontal
 * - Mobile (< lg): Sidebar collapsible (hamburger menu), TopBar full width
 *
 * Uses design tokens from src/styles/design-tokens.css
 */
export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop: always visible, Mobile: collapsible */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-card border-r border-border
        `}
      >
        <Sidebar collapsed={!isSidebarOpen} onToggle={toggleSidebar} />
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* TopBar */}
        <header className="sticky top-0 z-20 border-b border-border bg-card">
          <div className="flex h-16 items-center gap-4 px-4">
            {/* Hamburger menu button - Mobile only */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-accent rounded-md"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* TopBar content */}
            <div className="flex-1">
              <TopBar onMenuClick={toggleSidebar} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
