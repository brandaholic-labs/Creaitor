import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Brand {
  id: string;
  name: string;
  logo?: string; // Brand logo URL or initials
  description?: string;
  isActive: boolean;
}

interface BrandStore {
  brands: Brand[];
  activeBrandId: string | null;

  // Actions
  setBrands: (brands: Brand[]) => void;
  setActiveBrand: (brandId: string) => void;
  addBrand: (brand: Brand) => void;
  updateBrand: (brandId: string, updates: Partial<Brand>) => void;
  removeBrand: (brandId: string) => void;

  // Selectors
  getActiveBrand: () => Brand | null;
}

/**
 * Brand Store (Zustand)
 *
 * Global state management for brands and active brand selection.
 * Persists to localStorage to maintain active brand across page reloads.
 *
 * Usage:
 * ```tsx
 * const { brands, activeBrandId, setActiveBrand } = useBrandStore();
 * const activeBrand = useBrandStore((state) => state.getActiveBrand());
 * ```
 */
export const useBrandStore = create<BrandStore>()(
  persist(
    (set, get) => ({
      brands: [
        // Placeholder brands for development
        {
          id: 'brand-1',
          name: 'Fitness Studio XY',
          logo: 'FB',
          description: 'Fitness and wellness brand',
          isActive: true,
        },
        {
          id: 'brand-2',
          name: 'Bakery Budapest',
          logo: 'BB',
          description: 'Artisan bakery',
          isActive: true,
        },
        {
          id: 'brand-3',
          name: 'Tech Startup',
          logo: 'TS',
          description: 'SaaS company',
          isActive: true,
        },
      ],
      activeBrandId: 'brand-1', // Default active brand

      setBrands: (brands) => set({ brands }),

      setActiveBrand: (brandId) => {
        const brand = get().brands.find((b) => b.id === brandId);
        if (brand) {
          set({ activeBrandId: brandId });
        }
      },

      addBrand: (brand) =>
        set((state) => ({
          brands: [...state.brands, brand],
        })),

      updateBrand: (brandId, updates) =>
        set((state) => ({
          brands: state.brands.map((brand) =>
            brand.id === brandId ? { ...brand, ...updates } : brand
          ),
        })),

      removeBrand: (brandId) =>
        set((state) => ({
          brands: state.brands.filter((brand) => brand.id !== brandId),
          // If removing active brand, set to first available brand
          activeBrandId:
            state.activeBrandId === brandId
              ? state.brands.find((b) => b.id !== brandId)?.id || null
              : state.activeBrandId,
        })),

      getActiveBrand: () => {
        const state = get();
        return state.brands.find((b) => b.id === state.activeBrandId) || null;
      },
    }),
    {
      name: 'creaitor-brand-store', // localStorage key
      partialize: (state) => ({
        // Only persist activeBrandId, not the full brands array
        // (brands will be fetched from API on app load)
        activeBrandId: state.activeBrandId,
      }),
    }
  )
);
