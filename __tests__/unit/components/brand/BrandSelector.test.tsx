import { render, screen, fireEvent } from '@testing-library/react';
import { BrandSelector } from '@/components/brand/BrandSelector';
import { useBrandStore } from '@/lib/stores/useBrandStore';
import '@testing-library/jest-dom';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Check: () => <div>Check Icon</div>,
  ChevronDown: () => <div>ChevronDown Icon</div>,
  Plus: () => <div>Plus Icon</div>,
}));

// Mock Zustand store
jest.mock('@/lib/stores/useBrandStore');

describe('BrandSelector', () => {
  const mockSetActiveBrand = jest.fn();
  const mockGetActiveBrand = jest.fn();

  const mockBrands = [
    { id: 'brand-1', name: 'Test Brand 1', logo: 'TB1', isActive: true },
    { id: 'brand-2', name: 'Test Brand 2', logo: 'TB2', isActive: true },
  ];

  beforeEach(() => {
    (useBrandStore as unknown as jest.Mock).mockReturnValue({
      brands: mockBrands,
      activeBrandId: 'brand-1',
      setActiveBrand: mockSetActiveBrand,
      getActiveBrand: mockGetActiveBrand.mockReturnValue(mockBrands[0]),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render sidebar variant with active brand', () => {
    render(<BrandSelector variant="sidebar" />);
    expect(screen.getByText('Test Brand 1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render topbar variant', () => {
    render(<BrandSelector variant="topbar" />);
    expect(screen.getByText('Test Brand 1')).toBeInTheDocument();
  });

  it('should render compact variant', () => {
    render(<BrandSelector variant="compact" />);
    expect(screen.getByText('Test Brand 1')).toBeInTheDocument();
  });

  it('should display active brand logo', () => {
    render(<BrandSelector variant="sidebar" />);
    expect(screen.getByText('TB1')).toBeInTheDocument();
  });

  it('should have dropdown trigger button', () => {
    render(<BrandSelector variant="sidebar" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  // Note: Dropdown interaction tests are in E2E tests
  // Radix UI DropdownMenu requires more complex testing setup
});
