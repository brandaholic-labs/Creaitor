import config from '../../../tailwind.config';

describe('Tailwind Configuration', () => {
  it('should use class-based dark mode', () => {
    expect(config.darkMode).toBe('class');
  });

  it('should extend colors with design tokens', () => {
    const colors = config.theme?.extend?.colors as any;
    expect(colors).toBeDefined();
    expect(colors.brand).toBeDefined();
    expect(colors.brand['500']).toBe('var(--color-brand-500)');
    expect(colors.background).toBe('hsl(var(--color-background) / <alpha-value>)');
  });

  it('should extend font family', () => {
    const fontFamily = config.theme?.extend?.fontFamily as any;
    expect(fontFamily).toBeDefined();
    expect(fontFamily.heading).toEqual(['var(--font-heading)', 'sans-serif']);
    expect(fontFamily.body).toEqual(['var(--font-body)', 'sans-serif']);
  });

  it('should extend border radius', () => {
    const borderRadius = config.theme?.extend?.borderRadius as any;
    expect(borderRadius).toBeDefined();
    expect(borderRadius.md).toBe('var(--radius-md)');
  });
});
