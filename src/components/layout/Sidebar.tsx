'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BrandSelector } from '@/components/brand/BrandSelector';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

/**
 * Sidebar Component
 *
 * Navigation sidebar with:
 * - Navigation links (Dashboard, Brands, Calendar, Settings)
 * - Brand Selector (persistent, always visible) - placeholder for now
 * - User profile section (bottom)
 * - Active route highlighting
 * - Collapsible on mobile
 *
 * Uses Shadcn UI components (Button, Badge)
 */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navigationLinks = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: '/brands',
      label: 'Brands',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      href: '/calendar',
      label: 'Calendar',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-sm">
          C
        </div>
        <span className="text-lg font-semibold font-heading">Creaitor</span>
      </div>

      {/* Brand Selector */}
      <BrandSelector variant="sidebar" />

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigationLinks.map((link) => {
          const active = isActiveRoute(link.href);
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={active ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  active && 'bg-brand-50 text-brand-700 hover:bg-brand-100 hover:text-brand-800'
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section (Bottom) */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <svg
              className="h-5 w-5 text-accent-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">User Name</div>
            <div className="text-xs text-muted-foreground">user@agency.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
