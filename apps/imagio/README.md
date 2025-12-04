# IMAGIO - Nuxt 3 Exam Platform

Eine interaktive Lernplattform mit Prüfungssystem, gebaut mit Nuxt 3, Prisma und SQLite.

## 🚀 Quick Start

### Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Datenbank initialisieren
npx prisma generate
npx prisma db push

# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

### Docker (Empfohlen für Production)

```bash
# Container bauen und starten
docker-compose up --build

# Im Hintergrund laufen lassen
docker-compose up -d --build
```

Öffne [http://localhost:3000](http://localhost:3000)

## 📦 Projekt-Struktur

```
imagio/
├── components/          # Vue-Komponenten
│   ├── global/         # Globale Komponenten (Header, etc.)
│   └── introduction/   # Szenario-spezifische Komponenten
├── pages/              # Nuxt-Seiten (Auto-Routing)
├── server/             # Backend API Routes
│   ├── api/           # API Endpoints
│   └── lib/           # Server-seitige Utilities
├── prisma/             # Datenbank Schema & Migrations
├── composables/        # Vue Composables
├── assets/             # Statische Assets
└── docker-compose.yml  # Docker Konfiguration
```

## 🐳 Docker Befehle

### Container Management

```bash
# Container starten
docker-compose up

# Container mit Build starten
docker-compose up --build

# Container stoppen
docker-compose down

# Container im Hintergrund starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Container Status
docker ps
```

### Container Neubau

```bash
# Komplett neu bauen (ohne Cache)
docker-compose build --no-cache

# Container + Images löschen und neu bauen
docker-compose down
docker system prune -a
docker-compose up --build
```

### Container Shell

```bash
# In laufenden Container einsteigen
docker exec -it imagio-nuxt-app sh

# Datenbank im Container prüfen
docker exec -it imagio-nuxt-app sqlite3 /app/prisma/dev.db ".tables"
```

## 💾 Datenbank Befehle

### Prisma Entwicklung

```bash
# Prisma Client generieren
npx prisma generate

# Datenbank Schema pushen (Development)
npx prisma db push

# Prisma Studio öffnen (GUI)
npx prisma studio

# Datenbank seeden
npm run db:seed
```

### Prisma Migrations (Production)

```bash
# Migration erstellen
npx prisma migrate dev --name migration_name

# Migration anwenden
npx prisma migrate deploy

# Migration Status
npx prisma migrate status
```

### Datenbank zurücksetzen

```bash
# Lokale Datenbank löschen und neu erstellen
rm -f prisma/dev.db prisma/dev.db-journal
npx prisma db push
npm run db:seed
```

## 🛠️ Development Befehle

### NPM Scripts

```bash
# Development Server
npm run dev

# Production Build
npm run build

# Production Preview
npm run preview

# TypeScript Check
npm run typecheck

# Tests ausführen
npm run test
npm run test:ui
npm run test:coverage

# Clean Build Artifacts
npm run clean
```

### Build & Deploy

```bash
# Lokaler Production Build
npm run build
node .output/server/index.mjs

# Docker Production Build
docker-compose up --build
```

## 🔧 Konfiguration

### Environment Variables

Erstelle eine `.env` Datei im Root:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3000
HOST=0.0.0.0
NODE_ENV=production
```

### Docker Volumes

Daten werden persistent in Volumes gespeichert:
- `./prisma:/app/prisma` - SQLite Datenbank

## 📝 Wichtige Dateien

### Docker
- `Dockerfile` - Container Build Configuration
- `docker-compose.yml` - Docker Compose Services
- `docker-entrypoint.sh` - Container Startup Script
- `.dockerignore` - Dateien die nicht ins Image sollen

### Nuxt
- `nuxt.config.ts` - Nuxt Konfiguration
- `package.json` - Dependencies & Scripts
- `tsconfig.json` - TypeScript Konfiguration

### Prisma
- `prisma/schema.prisma` - Datenbank Schema
- `prisma/seed.ts` - Seed Daten

## 🐛 Troubleshooting

### Datenbank-Fehler

```bash
# Prisma Client neu generieren
npx prisma generate

# Datenbank zurücksetzen
rm -f prisma/dev.db
npx prisma db push
```

### Docker Build Fehler

```bash
# Alle Docker Resources löschen
docker-compose down
docker system prune -a --volumes

# Neu bauen
docker-compose up --build
```

### Port bereits belegt

```bash
# Prozess auf Port 3000 finden und killen
lsof -ti:3000 | xargs kill -9

# Oder Docker Container stoppen
docker-compose down
```

### TypeScript Errors

```bash
# .nuxt Ordner löschen und neu generieren
npm run clean
npm run postinstall
```

### Docker Disk Space Issues

```bash
# Docker aufräumen
docker system prune -a --volumes

# Speicherplatz prüfen
docker system df
```

## 🔒 Admin-Zugang

**Login Credentials:**
- Username: `admin`
- Password: `123`

**Admin-Funktionen:**
- Szenarien/Kurse erstellen und verwalten
- Fragen bearbeiten
- Keywords mit KI generieren
- Kurse veröffentlichen

## 🎯 Features

### Für Studenten
- ✅ Kurs-Code eingeben und starten
- ✅ Interaktive Prüfungen mit Timer
- ✅ Spracheingabe für Antworten
- ✅ Keyword-basierte Bewertung
- ✅ Fortschrittsanzeige

### Für Admins
- ✅ Kurse und Prüfungen erstellen
- ✅ Fragen mit Musterantworten
- ✅ KI-basierte Keyword-Generierung
- ✅ Multi-Level System (1-4)
- ✅ Zeitkonfiguration

## 📊 Tech Stack

- **Frontend:** Nuxt 3, Vue 3, TypeScript
- **Backend:** Nitro (Nuxt Server)
- **Database:** SQLite + Prisma ORM
- **Containerization:** Docker + Docker Compose
- **Testing:** Vitest
- **Speech Recognition:** Web Speech API

## 🚢 Production Deployment

### Docker Production

```bash
# Image bauen
docker build -t imagio-app .

# Container starten
docker run -p 3000:3000 -v $(pwd)/prisma:/app/prisma imagio-app

# Oder mit Docker Compose
docker-compose up -d
```

### Server Requirements

- Node.js 20+
- 512MB RAM minimum
- 1GB Disk Space
- Port 3000 verfügbar

## 📚 API Endpoints

### Courses
- `GET /api/courses` - Alle Kurse
- `POST /api/courses` - Kurs erstellen
- `GET /api/courses/:code/exam` - Kurs-Prüfung laden
- `DELETE /api/courses/:code` - Kurs löschen

### Exams
- `POST /api/exams` - Prüfung erstellen
- `PUT /api/exams/:id` - Prüfung aktualisieren
- `POST /api/exams/:id/start` - Prüfung starten

### Keywords
- `POST /api/generate-keywords` - Keywords mit KI generieren

## 🎓 Verwendung

### Als Student

1. Öffne die App auf http://localhost:3000
2. Gib den Kurs-Code ein (z.B. `CS001`)
3. Lies die Einleitung
4. Starte die Prüfung
5. Beantworte die Fragen per Text oder Sprache
6. Sieh deine Ergebnisse

### Als Admin

1. Klicke auf "Admin" im Header
2. Login mit `admin` / `123`
3. Klicke "Neues Szenario"
4. Fülle Kurs-Informationen aus
5. Füge Fragen hinzu
6. Generiere Keywords mit KI
7. Speichere und veröffentliche

## 🤝 Contributing

```bash
# Fork das Repository
# Erstelle einen Feature Branch
git checkout -b feature/AmazingFeature

# Commit deine Changes
git commit -m 'Add some AmazingFeature'

# Push zum Branch
git push origin feature/AmazingFeature

# Öffne einen Pull Request
```

## 📄 License

MIT License - siehe LICENSE Datei

## 👥 Autor

**Niels** - IMAGIO Platform

---

**Viel Erfolg mit IMAGIO! 🎓**
