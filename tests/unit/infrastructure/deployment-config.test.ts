/**
 * Unit tests for deployment configuration files
 * Story: 1.6 - Caddy Reverse Proxy Configuration
 *
 * Tests validate:
 * - AC1: Caddy reverse proxy configured
 * - AC2: Caddyfile exists and follows ADR-007
 * - AC3: Deployment instructions exist with required sections
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '../../..');
const CADDYFILE_PATH = join(PROJECT_ROOT, 'Caddyfile');
const DEPLOYMENT_DOC_PATH = join(PROJECT_ROOT, 'docs/deployment.md');

describe('Deployment Configuration', () => {
  describe('AC2: Caddyfile', () => {
    it('should exist in project root', () => {
      expect(existsSync(CADDYFILE_PATH)).toBe(true);
    });

    describe('Configuration content', () => {
      let caddyfileContent: string;

      beforeAll(() => {
        caddyfileContent = readFileSync(CADDYFILE_PATH, 'utf-8');
      });

      it('should configure domain creaitor.hu', () => {
        expect(caddyfileContent).toMatch(/creaitor\.hu/);
      });

      it('should configure www subdomain redirect', () => {
        expect(caddyfileContent).toMatch(/www\.creaitor\.hu/);
      });

      it('should configure reverse proxy to localhost:3000', () => {
        expect(caddyfileContent).toMatch(/reverse_proxy\s+localhost:3000/);
      });

      describe('AC1: Security headers', () => {
        it('should include HSTS header', () => {
          expect(caddyfileContent).toMatch(/Strict-Transport-Security/);
          expect(caddyfileContent).toMatch(/max-age=31536000/);
          expect(caddyfileContent).toMatch(/includeSubDomains/);
        });

        it('should include X-Content-Type-Options header', () => {
          expect(caddyfileContent).toMatch(/X-Content-Type-Options.*nosniff/);
        });

        it('should include X-Frame-Options header', () => {
          expect(caddyfileContent).toMatch(/X-Frame-Options.*SAMEORIGIN/);
        });

        it('should include Referrer-Policy header', () => {
          expect(caddyfileContent).toMatch(/Referrer-Policy.*strict-origin-when-cross-origin/);
        });
      });

      describe('AC1: Access logs in JSON format', () => {
        it('should configure log output to file', () => {
          expect(caddyfileContent).toMatch(/log\s*\{/);
          expect(caddyfileContent).toMatch(/output\s+file/);
        });

        it('should configure JSON format', () => {
          expect(caddyfileContent).toMatch(/format\s+json/);
        });

        it('should specify log file path', () => {
          expect(caddyfileContent).toMatch(/\/var\/log\/caddy\/access\.log/);
        });
      });

      describe('AC1: Gzip compression', () => {
        it('should enable gzip compression', () => {
          expect(caddyfileContent).toMatch(/encode\s+gzip/);
        });
      });

      describe('ADR-007 compliance', () => {
        it('should use simple Caddyfile syntax (no complex Nginx-style directives)', () => {
          // Caddyfile should NOT contain Nginx-specific syntax
          expect(caddyfileContent).not.toMatch(/server\s*\{/);
          expect(caddyfileContent).not.toMatch(/listen\s+443/);
          expect(caddyfileContent).not.toMatch(/ssl_certificate/);
        });

        it('should rely on automatic HTTPS (no manual SSL config)', () => {
          // Should NOT have manual SSL certificate configuration
          expect(caddyfileContent).not.toMatch(/tls\s+\/etc\/letsencrypt/);
          expect(caddyfileContent).not.toMatch(/ssl_certificate_key/);
        });

        it('should have simple domain block structure', () => {
          // Caddyfile should use simple domain block syntax
          expect(caddyfileContent).toMatch(/creaitor\.hu.*\{/);
        });
      });
    });
  });

  describe('AC3: Deployment Documentation', () => {
    it('should exist at docs/deployment.md', () => {
      expect(existsSync(DEPLOYMENT_DOC_PATH)).toBe(true);
    });

    describe('Required sections', () => {
      let deploymentContent: string;

      beforeAll(() => {
        deploymentContent = readFileSync(DEPLOYMENT_DOC_PATH, 'utf-8');
      });

      it('should include Hetzner VPS provisioning steps', () => {
        expect(deploymentContent).toMatch(/Hetzner.*VPS/i);
        expect(deploymentContent).toMatch(/CX31/i);
        expect(deploymentContent).toMatch(/provisioning/i);
      });

      it('should include Caddy installation steps', () => {
        expect(deploymentContent).toMatch(/Caddy.*telepítése/i);
        expect(deploymentContent).toMatch(/apt install.*caddy/i);
      });

      it('should include Caddyfile deployment process', () => {
        expect(deploymentContent).toMatch(/Caddyfile.*deployment/i);
        expect(deploymentContent).toMatch(/\/etc\/caddy\/Caddyfile/);
      });

      it('should include health check verification steps', () => {
        expect(deploymentContent).toMatch(/health.*check/i);
        expect(deploymentContent).toMatch(/\/api\/health/);
        expect(deploymentContent).toMatch(/curl.*creaitor\.hu/);
      });

      it('should include deployment architecture overview', () => {
        expect(deploymentContent).toMatch(/deployment.*stack/i);
        expect(deploymentContent).toMatch(/Docker/i);
        expect(deploymentContent).toMatch(/Next\.js/i);
      });

      it('should include security best practices', () => {
        expect(deploymentContent).toMatch(/biztonsági.*best practices/i);
        expect(deploymentContent).toMatch(/HTTPS/i);
        expect(deploymentContent).toMatch(/firewall/i);
      });

      it('should include troubleshooting section', () => {
        expect(deploymentContent).toMatch(/troubleshooting/i);
        expect(deploymentContent).toMatch(/gyakori.*problémák/i);
      });
    });

    describe('Technical accuracy', () => {
      let deploymentContent: string;

      beforeAll(() => {
        deploymentContent = readFileSync(DEPLOYMENT_DOC_PATH, 'utf-8');
      });

      it('should reference correct Hetzner server specs', () => {
        expect(deploymentContent).toMatch(/CX31/);
        expect(deploymentContent).toMatch(/4 vCPU/);
        expect(deploymentContent).toMatch(/8 GB RAM/);
      });

      it('should reference correct domain (creaitor.hu)', () => {
        expect(deploymentContent).toMatch(/creaitor\.hu/);
      });

      it('should reference correct Next.js port (3000)', () => {
        expect(deploymentContent).toMatch(/localhost:3000/);
        expect(deploymentContent).toMatch(/port 3000/);
      });

      it('should reference health check endpoint', () => {
        expect(deploymentContent).toMatch(/\/api\/health/);
      });
    });
  });
});
