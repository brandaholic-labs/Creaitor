import { renderHook, act } from '@testing-library/react';
import { useBrandStore } from '@/lib/stores/useBrandStore';

describe('useBrandStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useBrandStore());
    act(() => {
      result.current.setBrands([
        {
          id: 'brand-1',
          name: 'Test Brand 1',
          logo: 'TB1',
          isActive: true,
        },
        {
          id: 'brand-2',
          name: 'Test Brand 2',
          logo: 'TB2',
          isActive: true,
        },
      ]);
      result.current.setActiveBrand('brand-1');
    });
  });

  it('should initialize with brands', () => {
    const { result } = renderHook(() => useBrandStore());
    expect(result.current.brands).toHaveLength(2); // Brands set in beforeEach
    expect(result.current.brands[0].name).toBe('Test Brand 1');
  });

  it('should set active brand', () => {
    const { result } = renderHook(() => useBrandStore());
    act(() => {
      result.current.setActiveBrand('brand-2');
    });
    expect(result.current.activeBrandId).toBe('brand-2');
  });

  it('should get active brand', () => {
    const { result } = renderHook(() => useBrandStore());
    const activeBrand = result.current.getActiveBrand();
    expect(activeBrand?.id).toBe('brand-1');
    expect(activeBrand?.name).toBe('Test Brand 1');
  });

  it('should add a new brand', () => {
    const { result } = renderHook(() => useBrandStore());
    const initialCount = result.current.brands.length;

    act(() => {
      result.current.addBrand({
        id: 'brand-3',
        name: 'Test Brand 3',
        logo: 'TB3',
        isActive: true,
      });
    });

    expect(result.current.brands).toHaveLength(initialCount + 1);
    expect(result.current.brands.find((b) => b.id === 'brand-3')).toBeDefined();
  });

  it('should update a brand', () => {
    const { result } = renderHook(() => useBrandStore());

    act(() => {
      result.current.updateBrand('brand-1', {
        name: 'Updated Brand Name',
      });
    });

    const updatedBrand = result.current.brands.find((b) => b.id === 'brand-1');
    expect(updatedBrand?.name).toBe('Updated Brand Name');
  });

  it('should remove a brand', () => {
    const { result } = renderHook(() => useBrandStore());
    const initialCount = result.current.brands.length;

    act(() => {
      result.current.removeBrand('brand-2');
    });

    expect(result.current.brands).toHaveLength(initialCount - 1);
    expect(result.current.brands.find((b) => b.id === 'brand-2')).toBeUndefined();
  });

  it('should reset active brand when removing the active brand', () => {
    const { result } = renderHook(() => useBrandStore());

    act(() => {
      result.current.setActiveBrand('brand-1');
      result.current.removeBrand('brand-1');
    });

    // Should set to first available brand or null
    expect(result.current.activeBrandId).not.toBe('brand-1');
  });
});
