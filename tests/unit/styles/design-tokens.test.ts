import fs from 'fs';
import path from 'path';

describe('Design Tokens', () => {
  const tokensPath = path.join(process.cwd(), 'src/styles/design-tokens.css');
  const tokensContent = fs.readFileSync(tokensPath, 'utf-8');

  it('should define brand colors', () => {
    expect(tokensContent).toContain('--color-brand-500');
    expect(tokensContent).toContain('--color-brand-50: #faf5ff');
    expect(tokensContent).toContain('--color-brand-950: #3b0764');
  });

  it('should define semantic colors', () => {
    expect(tokensContent).toContain('--color-background');
    expect(tokensContent).toContain('--color-foreground');
    expect(tokensContent).toContain('--color-primary');
    expect(tokensContent).toContain('--color-destructive');
  });

  it('should define typography tokens', () => {
    expect(tokensContent).toContain('--font-heading');
    expect(tokensContent).toContain('--font-body');
  });

  it('should define border radius tokens', () => {
    expect(tokensContent).toContain('--radius-sm');
    expect(tokensContent).toContain('--radius-md');
    expect(tokensContent).toContain('--radius-full');
  });

  it('should have dark mode support', () => {
    expect(tokensContent).toContain('.dark {');
    expect(tokensContent).toContain('--color-background: 2 6 23'); // slate-950
  });
});
