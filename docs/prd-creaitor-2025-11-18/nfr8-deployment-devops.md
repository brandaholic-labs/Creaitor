# NFR8: Deployment & DevOps

## NFR8.1: Hosting & Infrastructure

**Platform (P0):**
- **Backend + Frontend:** Render / Railway / Fly.io (single-server managed service)
- **Database:** PostgreSQL (Render managed DB / Railway managed DB)
- **File storage:** Cloudinary (auto-resize, CDN beépített) vagy S3 (cheaper, manual setup)
- **Email:** SendGrid / Mailgun (transactional emails: password reset, user invite)

**Deployment (P0):**
- Manual deployment (git push → auto-deploy)
- No staging environment (deploy directly to production → elfogadható pilot során)
- Deployment frequency: 1-2x / hét (bug fix, feature release)

**P1 - Production infra:**
- Staging + Production környezet (külön DB, külön deployment)
- CI/CD pipeline (GitHub Actions, GitLab CI - automated tests + deploy)
- Docker containers (Dockerfile + docker-compose)
- Infrastructure as Code (Terraform / Pulumi)

---

## NFR8.2: Environment Variables

**Required env vars (P0):**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Meta OAuth
META_APP_ID=123456789
META_APP_SECRET=abc123...
META_REDIRECT_URI=https://creaitor.app/auth/meta/callback

# AI API (OpenAI / Anthropic)
OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-... (ha Claude-ot használsz)

# Session secret (crypto.randomBytes(64).toString('hex'))
SESSION_SECRET=random-secret-key-64-chars

# Email (SendGrid / Mailgun)
SENDGRID_API_KEY=SG.abc123...

# File upload (S3 / Cloudinary)
# S3:
S3_BUCKET=creaitor-uploads
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_REGION=us-east-1
# VAGY Cloudinary:
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Encryption key (AES-256, 32 bytes hex)
ENCRYPTION_KEY=... (crypto.randomBytes(32).toString('hex'))
```

**P0 megjegyzés:** `.env` fájl git-ignored, manuális setup (nincs secrets manager).

**P1 - Secrets management:**
- AWS Secrets Manager / HashiCorp Vault
- Env var rotation (automatic secret rotation)
- Secrets audit trail

---
