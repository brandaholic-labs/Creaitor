'use client';

import React from 'react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBrandStore } from '@/lib/stores/useBrandStore';
import { cn } from '@/lib/utils';

interface BrandSelectorProps {
  variant?: 'sidebar' | 'topbar' | 'compact';
  onBrandChange?: (brandId: string) => void;
}

/**
 * BrandSelector Component
 *
 * Dropdown component for selecting active brand.
 * Uses Zustand store for global state management.
 *
 * Variants:
 * - sidebar: Full display with logo, name, and "Active" badge (Sidebar)
 * - topbar: Compact display for TopBar
 * - compact: Minimal display for mobile
 *
 * Features:
 * - Active brand highlighting
 * - Brand logo + name display
 * - Click to switch brand
 * - Persistent across navigation (Zustand + localStorage)
 * - "+ New Brand" action (placeholder for Epic 3)
 */
export function BrandSelector({
  variant = 'sidebar',
  onBrandChange,
}: BrandSelectorProps) {
  const { brands, activeBrandId, setActiveBrand, getActiveBrand } =
    useBrandStore();

  const activeBrand = getActiveBrand();

  const handleBrandChange = (brandId: string) => {
    setActiveBrand(brandId);
    onBrandChange?.(brandId);
  };

  const handleNewBrand = () => {
    // TODO: Implement brand creation (Epic 3: Brand Management)
    console.log('Create new brand - Epic 3');
  };

  if (variant === 'sidebar') {
    return (
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="text-xs font-medium text-muted-foreground uppercase mb-2">
          Active Brand
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-auto p-2 hover:bg-accent"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm shrink-0">
                  {activeBrand?.logo || '?'}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">
                    {activeBrand?.name || 'Select Brand'}
                  </div>
                  <Badge variant="secondary" className="text-xs mt-1">
                    Active
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Your Brands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {brands.map((brand) => (
              <DropdownMenuItem
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={cn(
                  'flex items-center gap-2',
                  brand.id === activeBrandId && 'bg-brand-50'
                )}
              >
                <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-xs">
                  {brand.logo || brand.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{brand.name}</div>
                  {brand.description && (
                    <div className="text-xs text-muted-foreground">
                      {brand.description}
                    </div>
                  )}
                </div>
                {brand.id === activeBrandId && (
                  <Check className="h-4 w-4 text-brand-600" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNewBrand}>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Brand</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (variant === 'topbar') {
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-brand-50 border border-brand-200">
        <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-xs">
          {activeBrand?.logo || '?'}
        </div>
        <span className="text-sm font-medium text-brand-700">
          {activeBrand?.name || 'Select Brand'}
        </span>
      </div>
    );
  }

  // compact variant (mobile)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <span className="text-sm font-medium">
            {activeBrand?.name || 'Select'}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Your Brands</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {brands.map((brand) => (
          <DropdownMenuItem
            key={brand.id}
            onClick={() => handleBrandChange(brand.id)}
            className={cn(
              'flex items-center gap-2',
              brand.id === activeBrandId && 'bg-brand-50'
            )}
          >
            <div className="h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-xs">
              {brand.logo || brand.name.charAt(0)}
            </div>
            <span className="text-sm flex-1">{brand.name}</span>
            {brand.id === activeBrandId && (
              <Check className="h-4 w-4 text-brand-600" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleNewBrand}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Brand</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
