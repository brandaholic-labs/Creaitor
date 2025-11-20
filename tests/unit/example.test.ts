describe('Example Unit Test', () => {
  it('should add two numbers correctly', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });

  it('should match object structure', () => {
    const user = { id: 1, name: 'Test User' };
    expect(user).toEqual({ id: 1, name: 'Test User' });
  });
});
