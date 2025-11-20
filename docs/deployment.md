# Creaitor - Deployment útmutató

Ez a dokumentum a Creaitor alkalmazás production deployment folyamatát írja le Hetzner VPS környezetben.

---

## Áttekintés

**Deployment célkörnyezet:**
- **Szolgáltató:** Hetzner Cloud
- **Szerver típus:** CX31 (4 vCPU, 8 GB RAM, 80 GB SSD)
- **Költség:** ~€12/hónap
- **Lokáció:** Falkenstein, Germany (legközelebbi Magyarországhoz)
- **Reverse Proxy:** Caddy (automatic HTTPS)
- **Container Orchestration:** Docker Compose

**Deployment stack:**
```
Internet (HTTPS)
    ↓
Caddy (80/443) - Automatic HTTPS, reverse proxy
    ↓
Next.js App (Docker container, port 3000)
    ↓
BullMQ Worker + Redis (Docker containers)
    ↓
Supabase (External SaaS)
```

---

## 1. Hetzner VPS Provisioning

### 1.1. Hetzner Cloud Console beállítása

1. **Fiók létrehozása:** https://console.hetzner.cloud/
2. **Projekt létrehozása:** "Creaitor Production"
3. **SSH kulcs hozzáadása:**
   - Console → Security → SSH Keys → Add SSH Key
   - Név: "Creaitor Deploy Key"
   - Másold be a publikus kulcsot (`~/.ssh/id_ed25519.pub`)

### 1.2. VPS példány létrehozása

1. **Console → Servers → Create Server**
2. **Lokáció:** Falkenstein, Germany (fsn1-dc14)
3. **Image:** Ubuntu 22.04 LTS
4. **Type:** CX31 (4 vCPU, 8 GB RAM)
5. **SSH Key:** Válaszd ki a fent létrehozott kulcsot
6. **Firewall:**
   - Inbound: 22 (SSH), 80 (HTTP), 443 (HTTPS)
   - Outbound: All
7. **Név:** creaitor-prod
8. **Create & Buy now**

### 1.3. DNS beállítása

1. **Hetzner DNS Console:** https://dns.hetzner.com/
2. **Add új zóna:** creaitor.hu
3. **A record létrehozása:**
   - Name: `@` (root domain)
   - Type: A
   - Value: `<VPS IP cím>`
   - TTL: 3600
4. **A record létrehozása (www):**
   - Name: `www`
   - Type: A
   - Value: `<VPS IP cím>`
   - TTL: 3600

**DNS propagáció ellenőrzése:**
```bash
dig creaitor.hu
dig www.creaitor.hu
```

### 1.4. Első belépés és szerverbeállítás

```bash
# SSH kapcsolat a root userrel
ssh root@<VPS_IP>

# Rendszer frissítése
apt update && apt upgrade -y

# Szükséges alapcsomagok telepítése
apt install -y curl git wget ufw

# Firewall beállítása
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Docker telepítése
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose telepítése
apt install -y docker-compose-plugin

# Felhasználó létrehozása (optional, de ajánlott)
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy
```

---

## 2. Caddy telepítése és konfigurálása

### 2.1. Caddy telepítése

**Hivatalos Caddy repository hozzáadása:**
```bash
# Add Caddy repository
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

# Update és install
apt update
apt install -y caddy
```

**Caddy verzió ellenőrzése:**
```bash
caddy version
```

### 2.2. Caddyfile deployment

**Caddyfile másolása a szerverről:**

A Caddyfile a projekt root könyvtárában van: `/root/creaitor/Caddyfile`

**Deployment lépések:**

```bash
# SSH kapcsolat a szerverhez
ssh root@<VPS_IP>

# Alkalmazás könyvtár létrehozása
mkdir -p /opt/creaitor
cd /opt/creaitor

# Git repository klónozása
git clone https://github.com/<YOUR_ORG>/creaitor.git .

# Caddyfile másolása a Caddy config könyvtárba
cp /opt/creaitor/Caddyfile /etc/caddy/Caddyfile

# Log könyvtár létrehozása
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy
```

### 2.3. Caddyfile konfiguráció ellenőrzése

**Syntax validation:**
```bash
caddy validate --config /etc/caddy/Caddyfile
```

Várható kimenet:
```
Valid configuration
```

**Konfiguráció részletei:**

A `Caddyfile` tartalmazza:
- ✅ **Automatic HTTPS:** Let's Encrypt automatikus tanúsítvány kezelés
- ✅ **Reverse proxy:** Forgalom továbbítása a Next.js app-hoz (localhost:3000)
- ✅ **Security headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- ✅ **JSON access logs:** Strukturált logok `/var/log/caddy/access.log` helyen
- ✅ **Gzip compression:** Automatikus válasz tömörítés

### 2.4. Caddy szolgáltatás indítása

```bash
# Caddy szolgáltatás újraindítása
systemctl restart caddy

# Státusz ellenőrzése
systemctl status caddy

# Automatikus indítás bekapcsolása
systemctl enable caddy

# Logok megtekintése
journalctl -u caddy -f
```

**Első indításkor:**
- Caddy automatikusan lekéri a Let's Encrypt tanúsítványt a `creaitor.hu` és `www.creaitor.hu` domainekhez
- Ez ~30-60 másodpercet vesz igénybe
- A tanúsítvány automatikusan megújul 30 nappal a lejárat előtt

---

## 3. Alkalmazás deployment Docker Compose-zal

### 3.1. Environment változók beállítása

```bash
cd /opt/creaitor

# .env.production fájl létrehozása
nano .env.production
```

**Példa .env.production tartalma:**
```env
# Node Environment
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Redis
REDIS_URL=redis://redis:6379

# Meta OAuth
META_CLIENT_ID=your-meta-client-id
META_CLIENT_SECRET=your-meta-client-secret

# Application
NEXT_PUBLIC_APP_URL=https://creaitor.hu
```

### 3.2. Docker Compose indítása

```bash
# Build és indítás
docker-compose -f docker-compose.prod.yml up -d --build

# Logok megtekintése
docker-compose -f docker-compose.prod.yml logs -f

# Container státusz ellenőrzése
docker-compose -f docker-compose.prod.yml ps
```

Várható kimenet:
```
NAME                IMAGE              STATUS
creaitor-app        creaitor-app       Up 30 seconds
creaitor-worker     creaitor-worker    Up 30 seconds
creaitor-redis      redis:7-alpine     Up 30 seconds
```

---

## 4. Health Check Verification

### 4.1. Health Check Endpoint tesztelése

**Direct Next.js health check (Docker container):**
```bash
curl http://localhost:3000/api/health
```

Várható válasz:
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T10:00:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

### 4.2. Caddy Reverse Proxy health check

**HTTPS health check (Caddy-n keresztül):**
```bash
curl https://creaitor.hu/api/health
```

Várható válasz: Ugyanaz, mint fent + HTTPS security headers

### 4.3. Security Headers ellenőrzése

```bash
curl -I https://creaitor.hu/api/health
```

Ellenőrzendő headerek:
```
HTTP/2 200
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
referrer-policy: strict-origin-when-cross-origin
```

### 4.4. SSL Certificate ellenőrzése

```bash
# SSL certificate részletek
openssl s_client -connect creaitor.hu:443 -servername creaitor.hu </dev/null 2>/dev/null | openssl x509 -noout -text

# SSL Labs teszt (böngészőben)
# https://www.ssllabs.com/ssltest/analyze.html?d=creaitor.hu
```

---

## 5. Folyamatos deployment (CI/CD)

### 5.1. GitHub Actions secrets beállítása

GitHub repository → Settings → Secrets and variables → Actions → New repository secret:

- `HETZNER_SSH_KEY` - Privát SSH kulcs a VPS-hez való csatlakozáshoz
- `HETZNER_IP` - VPS IP címe

### 5.2. Deployment workflow

A `.github/workflows/deploy.yml` fájl automatikusan deployol minden `main` branch push esetén.

**Manuális deployment:**
```bash
# SSH kapcsolat
ssh root@<VPS_IP>

# Alkalmazás könyvtár
cd /opt/creaitor

# Legújabb kód pull
git pull origin main

# Rebuild és restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Logok ellenőrzése
docker-compose -f docker-compose.prod.yml logs -f app
```

---

## 6. Monitoring és Troubleshooting

### 6.1. Log fájlok helye

**Caddy logs:**
```bash
# Access logs (JSON formátum)
tail -f /var/log/caddy/access.log

# System logs
journalctl -u caddy -f
```

**Docker logs:**
```bash
# Next.js app logs
docker-compose -f docker-compose.prod.yml logs -f app

# Worker logs
docker-compose -f docker-compose.prod.yml logs -f worker

# Redis logs
docker-compose -f docker-compose.prod.yml logs -f redis
```

**Winston logs (alkalmazás szintű):**
```bash
# Inside app container
docker exec -it creaitor-app bash
cd logs
tail -f app.log
tail -f error.log
```

### 6.2. Gyakori problémák

**1. Caddy nem indul el**
```bash
# Syntax check
caddy validate --config /etc/caddy/Caddyfile

# Részletes logok
journalctl -u caddy -n 100 --no-pager

# Restart
systemctl restart caddy
```

**2. Let's Encrypt certificate hiba**
```bash
# Ellenőrizd DNS beállításokat
dig creaitor.hu
dig www.creaitor.hu

# Ellenőrizd, hogy a domain elérhető-e
curl http://creaitor.hu

# Caddy certificate cache törlése és újraindítás
rm -rf /var/lib/caddy/.local/share/caddy
systemctl restart caddy
```

**3. Next.js app nem elérhető**
```bash
# Container státusz
docker-compose -f docker-compose.prod.yml ps

# App logs
docker-compose -f docker-compose.prod.yml logs app

# Restart app
docker-compose -f docker-compose.prod.yml restart app

# Health check
curl http://localhost:3000/api/health
```

---

## 7. Rollback stratégia

**Ha a deployment sikertelen:**

```bash
# 1. Azonosítsd az utolsó működő commit-ot
git log --oneline

# 2. Checkout az előző verzióra
git checkout <PREVIOUS_COMMIT_HASH>

# 3. Rebuild és restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# 4. Health check
curl https://creaitor.hu/api/health
```

---

## 8. Biztonsági best practices

- ✅ **Firewall:** Csak 22, 80, 443 portok nyitottak
- ✅ **HTTPS:** Automatikus Let's Encrypt tanúsítványok
- ✅ **Security headers:** HSTS, X-Content-Type-Options, X-Frame-Options
- ✅ **Environment változók:** Soha ne commitold a `.env` fájlokat
- ✅ **SSH kulcsok:** Használj ED25519 kulcsokat, ne password auth-ot
- ✅ **Docker:** Ne futtass containereket root userként (már konfigurálva)
- ✅ **Supabase RLS:** Row-Level Security policies bekapcsolva

---

## Összefoglalás

1. **Hetzner VPS:** CX31, Ubuntu 22.04, Falkenstein
2. **DNS:** A record → VPS IP (`creaitor.hu`, `www.creaitor.hu`)
3. **Caddy:** Automatic HTTPS, reverse proxy, security headers
4. **Docker Compose:** Next.js app + BullMQ worker + Redis
5. **Health Check:** `https://creaitor.hu/api/health`
6. **CI/CD:** GitHub Actions auto-deploy on `main` push

**Deployment ellenőrzés checklist:**
- [ ] VPS elérhető SSH-n keresztül
- [ ] DNS rekordok propagálva
- [ ] Caddy fut és Let's Encrypt tanúsítvány érvényes
- [ ] Docker containerek futnak (`docker-compose ps`)
- [ ] Health check endpoint válaszol (`curl https://creaitor.hu/api/health`)
- [ ] Security headers jelen vannak (`curl -I https://creaitor.hu`)
- [ ] SSL Labs teszt A+ vagy A rating

---

**Kapcsolódó dokumentumok:**
- `docs/architecture.md` - Teljes rendszer architektúra
- `Caddyfile` - Caddy konfiguráció
- `docker-compose.prod.yml` - Docker Compose production konfig
- `.github/workflows/deploy.yml` - CI/CD pipeline
