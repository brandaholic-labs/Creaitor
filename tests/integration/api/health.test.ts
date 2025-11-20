/**
 * @jest-environment node
 */
import { GET } from '@/app/api/health/route';

describe('Health Check API', () => {
  it('should return 200 and status ok', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      status: 'ok',
      environment: expect.any(String),
    }));
  });

  it('should use default version if npm_package_version is undefined', async () => {
    const originalVersion = process.env.npm_package_version;
    delete process.env.npm_package_version;

    const response = await GET();
    const body = await response.json();

    expect(body.version).toBe('1.0.0');

    process.env.npm_package_version = originalVersion;
  });
});
