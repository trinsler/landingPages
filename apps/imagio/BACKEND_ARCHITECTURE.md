# IMAGIO Backend Architektur
## Frontend-fokussiertes Design

## 🎯 Überblick

Präzise Backend-Architektur basierend auf dem **tatsächlichen IMAGIO Frontend**. Fokus auf **Keyword-basierte Lernanalyse**, **Written/Oral Input Modi**, und **Level-basierte Progression**.

## 🚀 Entwicklungsstrategie: Lokal → AWS

### Problem: AWS-Zugänge nicht verfügbar
**Lösung**: Lokale API-Entwicklung mit später nahtlosem Übergang zu AWS

### Warum lokale Entwicklung?
- **Unabhängigkeit**: Kein Warten auf AWS-Zugänge oder andere Teams
- **Schnelle Iteration**: Direktes Testing und Feature-Development
- **Einfacher Übergang**: Mit sauberer API-Abstraktion später AWS-Migration
- **Kosteneffizienz**: Keine AWS-Kosten während Development

### Übergangs-Architektur
```
┌─────────────────────┐     ┌─────────────────────┐
│   DEVELOPMENT       │     │     PRODUCTION      │
│                     │     │                     │
│  Nuxt.js Frontend   │────►│  Nuxt.js Frontend   │
│        ↓            │     │        ↓            │
│  Local Express API  │     │    AWS ECS/Lambda   │
│        ↓            │     │        ↓            │
│  Local PostgreSQL   │     │    RDS PostgreSQL   │
│  Local Redis        │     │    ElastiCache      │
└─────────────────────┘     └─────────────────────┘
```

## 🗄️ FRONTEND-BASIERTES DATABASE SCHEMA

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // oder "sqlite" für lokale Entwicklung
  url      = env("DATABASE_URL")
}

// ============================================
// BASIC USER MANAGEMENT
// ============================================

model User {
  id        String   @id @default(uuid())
  sessionId String?  @unique  // Für anonyme Sessions
  
  // Optional Profile (für zukünftige Erweiterung)
  email     String?  @unique
  firstName String?
  lastName  String?
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastActivityAt DateTime?
  
  // Relations
  examAttempts ExamAttempt[]
  userProgress UserProgress?
  
  @@map("users")
}

// ============================================
// COURSE & EXAM SYSTEM
// ============================================

model Course {
  id               String  @id @default(uuid())
  code             String  @unique // ABC123, CS001, etc.
  title            String
  description      String
  level            Int     // 1, 2, 3, 4
  
  // Time Configuration
  totalTime        Int     // Minuten
  totalQuestions   Int
  timePerQuestion  Int     // Sekunden
  
  // Status
  isPublished      Boolean @default(true)
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  // Relations
  exam             Exam?   @relation(fields: [examId], references: [id])
  examId           String?
  
  @@map("courses")
}

model Exam {
  id           String     @id @default(uuid())
  title        String
  description  String
  sourceText   String     // Text-Basis für Fragen
  level        Int        // 1-4
  duration     Int?       // Minuten
  
  // Status
  isPublished  Boolean    @default(true)
  
  // Timestamps
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  // Relations
  questions    Question[]
  examAttempts ExamAttempt[]
  courses      Course[]
  
  @@map("exams")
}

model Question {
  id         String   @id @default(uuid())
  examId     String
  exam       Exam     @relation(fields: [examId], references: [id], onDelete: Cascade)
  
  // Content
  text       String
  answer     String?  // Optional vordefinierte Antwort
  
  // Difficulty & Keywords (Kern des Systems!)
  difficulty QuestionDifficulty
  keywords   String[] // Array von Schlüsselwörtern
  
  // Configuration
  selected   Boolean  @default(true)  // Frage aktiv?
  order      Int      @default(0)
  
  // Timestamps
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  // Relations
  answers    Answer[]
  
  @@map("questions")
}

enum QuestionDifficulty {
  EASY
  MEDIUM
  HARD
}

// ============================================
// EXAM SESSIONS & ANSWERS
// ============================================

model ExamAttempt {
  id           String            @id @default(uuid())
  userId       String
  user         User              @relation(fields: [userId], references: [id])
  examId       String
  exam         Exam              @relation(fields: [examId], references: [id])
  
  // Session State
  startedAt    DateTime          @default(now())
  completedAt  DateTime?
  
  // Results
  overallScore Float             @default(0)
  passed       Boolean           @default(false)
  level        Int               // Level des Exams
  
  // Relations
  answers      Answer[]
  
  @@map("exam_attempts")
}

model Answer {
  id              String      @id @default(uuid())
  examAttemptId   String
  examAttempt     ExamAttempt @relation(fields: [examAttemptId], references: [id])
  questionId      String
  question        Question    @relation(fields: [questionId], references: [id])
  
  // User Answer
  answerText      String
  mode            AnswerMode  // written oder oral
  
  // Keyword Analysis (Kern-Feature!)
  foundKeywords   String[]    // Gefundene Keywords
  score           Float       // Keyword-Score (0-100)
  percentage      Float       // Prozent der gefundenen Keywords
  passed          Boolean     // Bestanden ja/nein
  
  // Analysis Details (JSON für flexible Daten)
  analysisDetails Json?       // Details der Keyword-Analyse
  
  // Metadata
  timeSpent       Int         @default(0) // Sekunden
  timestamp       DateTime    @default(now())
  
  @@unique([examAttemptId, questionId])
  @@map("answers")
}

enum AnswerMode {
  WRITTEN
  ORAL
}

// ============================================
// USER PROGRESS & STATISTICS
// ============================================

model UserProgress {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  
  // Level System
  currentLevel      Int      @default(1)
  completedLevels   Int[]    // Array von abgeschlossenen Levels
  
  // Activity
  lastActivity      DateTime @default(now())
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("user_progress")
}

// ============================================
// OLLAMA AI INTEGRATION (Lokal & DSGVO-konform)
// ============================================

model AIInteraction {
  id        String   @id @default(uuid())
  userId    String?
  
  // Request/Response
  type      AIType
  prompt    String
  response  String
  
  // Metadata (Ollama-spezifisch)
  model     String   @default("qwen2.5:7b")  // Lokales Ollama-Modell
  processingTime Int? // Millisekunden (statt Tokens)
  tokensGenerated Int? // Output-Tokens für Statistiken
  
  // Context
  examId    String?
  questionId String?
  
  // Ollama-spezifische Felder
  temperature Float?   // Kreativität 0.0-1.0
  success     Boolean  @default(true)
  errorMessage String? // Falls Ollama nicht verfügbar
  
  createdAt DateTime @default(now())
  
  @@map("ai_interactions")
}

enum AIType {
  QUESTION_GENERATION    // Fragen aus Text generieren
  KEYWORD_SUGGESTIONS   // Keywords für Fragen vorschlagen
  ANSWER_EVALUATION     // (Zukünftig) Antwort-Bewertung
}

// ============================================
// SYSTEM SETTINGS
// ============================================

model SystemSetting {
  id          String  @id @default(uuid())
  key         String  @unique
  value       String
  description String?
  
  updatedAt   DateTime @updatedAt
  
  @@map("system_settings")
}
```

## 🛠️ FRONTEND-FOKUSSIERTE API ENDPOINTS

### Course Management

#### GET /api/courses
```typescript
interface CoursesResponse {
  courses: CourseInfo[];
}

interface CourseInfo {
  code: string;           // "ABC123", "CS001"
  title: string;
  description: string;
  examId: string;
  totalTime: number;      // Minuten
  totalQuestions: number;
  timePerQuestion: number; // Sekunden
  level: number;          // 1-4
}
```

#### GET /api/courses/:code/exam
```typescript
interface ExamResponse {
  exam: ExamDetails;
  questions: QuestionDetails[];
}

interface ExamDetails {
  id: string;
  title: string;
  description: string;
  sourceText: string;
  level: number;
  duration: number;
  totalQuestions: number;
}

interface QuestionDetails {
  id: string;
  text: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}
```

### Exam Session Management

#### POST /api/exams/:examId/start
```typescript
interface StartExamRequest {
  userId: string;
}

interface StartExamResponse {
  attemptId: string;
  examId: string;
  startedAt: string;
  questions: QuestionDetails[];
}
```

#### POST /api/attempts/:attemptId/answers
```typescript
interface SubmitAnswerRequest {
  questionId: string;
  answerText: string;
  mode: 'WRITTEN' | 'ORAL';
  timeSpent: number; // Sekunden
}

interface SubmitAnswerResponse {
  answerId: string;
  analysis: KeywordAnalysisResult;
  passed: boolean;
  score: number;
  percentage: number;
}

interface KeywordAnalysisResult {
  foundKeywords: string[];
  missedKeywords: string[];
  score: number;         // 0-100
  percentage: number;    // Prozent gefundener Keywords
  passed: boolean;       // Bestanden ja/nein
  details: Array<{
    keyword: string;
    found: boolean;
    variations?: string[]; // Gefundene Variationen
  }>;
}
```

#### POST /api/attempts/:attemptId/complete
```typescript
interface CompleteExamResponse {
  attemptId: string;
  overallScore: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  levelCompleted: number;
  nextLevelUnlocked: boolean;
  
  summary: {
    answers: Array<{
      questionId: string;
      questionText: string;
      userAnswer: string;
      passed: boolean;
      score: number;
      foundKeywords: string[];
    }>;
  };
}
```

### User Progress

#### GET /api/users/:userId/progress
```typescript
interface UserProgressResponse {
  currentLevel: number;
  completedLevels: number[];
  statistics: {
    totalExams: number;
    completedExams: number;
    passedExams: number;
    totalAttempts: number;
    successRate: number; // Prozent
    averageScore: number;
  };
  recentActivity: {
    lastExam?: {
      examTitle: string;
      completedAt: string;
      passed: boolean;
      score: number;
    };
  };
}
```

### Speech & AI Features

#### POST /api/speech/transcribe
```typescript
interface TranscribeRequest {
  audioData: string; // Base64 encoded audio
  format: 'webm' | 'mp3' | 'wav';
}

interface TranscribeResponse {
  transcript: string;
  confidence: number;
  duration: number;
}
```

#### POST /api/ai/analyze-keywords
```typescript
interface KeywordAnalysisRequest {
  answerText: string;
  targetKeywords: string[];
  questionId: string;
}

interface KeywordAnalysisResponse {
  foundKeywords: string[];
  score: number;
  percentage: number;
  passed: boolean;
  suggestions?: string[];
  details: Array<{
    keyword: string;
    found: boolean;
    confidence: number;
    variations: string[];
  }>;
}
```

#### POST /api/ai/generate-questions (Ollama)
```typescript
interface GenerateQuestionsRequest {
  sourceText: string;
  numberOfQuestions: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  language?: 'de' | 'en';  // Sprache für Ollama
  model?: string;          // Ollama-Modell (default: qwen2.5:7b)
}

interface GeneratedQuestion {
  text: string;
  suggestedKeywords: string[];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  confidence: number;      // Ollama-interne Bewertung
  processingTime: number;  // Millisekunden
}

interface GenerateQuestionsResponse {
  questions: GeneratedQuestion[];
  totalProcessingTime: number;
  model: string;           // Verwendetes Ollama-Modell
  success: boolean;
}
```

#### POST /api/ai/suggest-keywords (Ollama)
```typescript
interface SuggestKeywordsRequest {
  questionText: string;
  existingKeywords?: string[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  language?: 'de' | 'en';
  maxKeywords?: number;    // Default: 10
}

interface SuggestKeywordsResponse {
  suggestedKeywords: string[];
  confidence: number;
  processingTime: number;
  model: string;
  reasoning?: string;      // Warum diese Keywords
}
```

#### GET /api/ai/models (Ollama Status)
```typescript
interface OllamaModelsResponse {
  available: boolean;
  models: Array<{
    name: string;           // "qwen2.5:7b", "llama3.1:8b"
    size: string;          // "4.7GB"
    loaded: boolean;       // Aktuell im RAM geladen
    lastUsed?: string;     // ISO datetime
  }>;
  systemInfo: {
    totalMemory: string;
    usedMemory: string;
    cpuCores: number;
  };
}
```

## 🌍 ENVIRONMENT CONFIGURATION

### Lokale Entwicklung (.env.local)
```bash
# Database
DATABASE_URL="postgresql://imagio:password@localhost:5432/imagio_dev"
# Oder für SQLite
# DATABASE_URL="file:./dev.db"

# Application
NUXT_BASE_URL="http://localhost:3000"
NUXT_API_BASE_URL="http://localhost:3000/api"

# Ollama AI Configuration (Lokal & DSGVO-konform)
OLLAMA_HOST="http://localhost:11434"
OLLAMA_DEFAULT_MODEL="qwen2.5:7b"          # Hauptmodell für deutsche Texte
OLLAMA_FALLBACK_MODEL="llama3.1:8b"        # Fallback-Modell
OLLAMA_TIMEOUT="30000"                      # 30 Sekunden Timeout
OLLAMA_MAX_RETRIES="3"                      # Retry-Versuche

# AI Features (Kostenlos mit Ollama)
ENABLE_AI_FEATURES="true"                   # Jetzt kostenlos aktivierbar!
AI_PROVIDER="ollama"                        # ollama, claude, openai
OLLAMA_QUESTION_GENERATION="true"          # Fragen-Generierung
OLLAMA_KEYWORD_SUGGESTIONS="true"          # Keyword-Vorschläge

# Speech Recognition
SPEECH_API_PROVIDER="browser"               # Browser Web Speech API (kostenlos)
ENABLE_SPEECH_TO_TEXT="true"
ENABLE_KEYWORD_ANALYSIS="true"

# Ollama Model Configuration
OLLAMA_TEMPERATURE="0.7"                   # Kreativität (0.0-1.0)
OLLAMA_TOP_P="0.9"                         # Fokus auf wahrscheinlichste Tokens
OLLAMA_MAX_TOKENS="1000"                   # Max Output-Länge
OLLAMA_LANGUAGE="de"                       # Standardsprache (de/en)

# Security
JWT_SECRET="your-local-jwt-secret"
BCRYPT_ROUNDS="10"

# Development Features
OLLAMA_DEBUG="true"                        # Debug-Logs für Ollama
OLLAMA_CACHE_RESPONSES="true"              # Cache für schnellere Entwicklung
```

### AWS Production (.env.production)
```bash
# Database
DATABASE_URL="postgresql://username:password@imagio-db.amazonaws.com:5432/imagio_prod"

# Application
NUXT_BASE_URL="https://imagio.com"
NUXT_API_BASE_URL="https://api.imagio.com"

# Ollama in Production (EU-Server)
OLLAMA_HOST="http://ollama-service:11434"   # Docker-Service Name
OLLAMA_DEFAULT_MODEL="qwen2.5:7b"
OLLAMA_FALLBACK_MODEL="llama3.1:8b"
OLLAMA_TIMEOUT="45000"                      # Länger für Production
OLLAMA_MAX_RETRIES="5"

# AI Features (Production Settings)
ENABLE_AI_FEATURES="true"
AI_PROVIDER="ollama"
OLLAMA_QUESTION_GENERATION="true"
OLLAMA_KEYWORD_SUGGESTIONS="true"
OLLAMA_TEMPERATURE="0.6"                   # Weniger kreativ in Production
OLLAMA_TOP_P="0.8"
OLLAMA_MAX_TOKENS="800"
OLLAMA_LANGUAGE="de"

# AWS Services
AWS_REGION="eu-central-1"                  # Frankfurt (DSGVO-konform)
AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY}"
AWS_SECRET_ACCESS_KEY="${AWS_SECRET_KEY}"

# Speech Services (Optional - Browser-basiert funktioniert auch)
SPEECH_API_PROVIDER="aws"                  # oder "browser"
AWS_TRANSCRIBE_REGION="eu-central-1"

# Monitoring & Performance
SENTRY_DSN="your-sentry-dsn"
OLLAMA_DEBUG="false"                       # Keine Debug-Logs in Production
OLLAMA_CACHE_RESPONSES="false"             # Kein Caching in Production
OLLAMA_METRICS_ENABLED="true"              # Performance-Metriken sammeln

# Production Scaling
OLLAMA_MAX_CONCURRENT_REQUESTS="10"        # Gleichzeitige Anfragen
OLLAMA_QUEUE_TIMEOUT="120000"              # 2 Minuten Queue-Timeout
```

## 🚀 SETUP COMMANDS

### 1. Lokale Entwicklung Setup
```bash
# Dependencies installieren
npm install prisma @prisma/client
npm install -D @types/node

# Database setup
npx prisma init
npx prisma generate
npx prisma db push

# Ollama Setup (DSGVO-konform & kostenlos)
# Option A: Native Installation
curl -fsSL https://ollama.com/install.sh | sh

# Option B: Docker (empfohlen für Development)
docker run -d \
  --name ollama \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama

# Modelle herunterladen (einmalig)
ollama pull qwen2.5:7b        # Hauptmodell (deutsch/englisch)
ollama pull llama3.1:8b       # Fallback-Modell

# Testen der Ollama-Installation
curl http://localhost:11434/api/tags

# Seed data mit Kursdaten
npm run db:seed

# Development server
npm run dev
```

### 2. Seed Data Script (prisma/seed.ts)
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample courses from frontend
  const courses = [
    {
      code: 'ABC123',
      title: 'IMAGIO Mock Scenario - Demo Test',
      description: 'Demo scenario for testing the IMAGIO learning platform.',
      level: 1,
      totalTime: 8,
      totalQuestions: 3,
      timePerQuestion: 60
    },
    {
      code: 'CS001',
      title: 'Basic Computer Science - Level 1',
      description: 'Introduction to fundamental computer science concepts.',
      level: 1,
      totalTime: 5,
      totalQuestions: 2,
      timePerQuestion: 60
    },
    // ... weitere Kurse
  ]

  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: courseData
    })
    
    // Create exam for course
    const exam = await prisma.exam.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        sourceText: `Learning material for ${courseData.title}`,
        level: courseData.level,
        duration: courseData.totalTime
      }
    })
    
    // Link course to exam
    await prisma.course.update({
      where: { id: course.id },
      data: { examId: exam.id }
    })
    
    // Create sample questions with keywords
    const sampleQuestions = [
      {
        text: 'What do you think about digital learning platforms?',
        difficulty: 'EASY' as const,
        keywords: ['digital', 'learning', 'platform', 'technology', 'education']
      },
      // ... weitere Fragen
    ]
    
    for (const questionData of sampleQuestions) {
      await prisma.question.create({
        data: {
          ...questionData,
          examId: exam.id
        }
      })
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 3. Package.json Scripts
```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    "ollama:start": "ollama serve",
    "ollama:models": "ollama list",
    "ollama:pull": "ollama pull qwen2.5:7b && ollama pull llama3.1:8b",
    "ollama:test": "curl -s http://localhost:11434/api/tags | jq",
    "dev:full": "concurrently \"ollama serve\" \"npm run dev\"",
    "docker:dev": "docker-compose -f docker-compose.dev.yml up -d",
    "docker:logs": "docker-compose -f docker-compose.dev.yml logs -f"
  }
}
```

### 4. Docker Compose für Complete Development Environment
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: imagio-postgres
    environment:
      POSTGRES_DB: imagio_dev
      POSTGRES_USER: imagio
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U imagio -d imagio_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  ollama:
    image: ollama/ollama
    container_name: imagio-ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Redis für Session Management
  redis:
    image: redis:7-alpine
    container_name: imagio-redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # Optional: Mailhog für Email-Testing
  mailhog:
    image: mailhog/mailhog
    container_name: imagio-mailhog
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    logging:
      driver: "none"

volumes:
  postgres_data:
  ollama_data:
  redis_data:
```

### 5. Ollama Model Setup Script
```bash
#!/bin/bash
# scripts/setup-ollama-models.sh

echo "🚀 Setting up Ollama models for IMAGIO..."

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Ollama not running. Start with: ollama serve"
    exit 1
fi

echo "📥 Downloading German/English optimized models..."

# Primary model for German content
echo "Downloading qwen2.5:7b (optimized for German)..."
ollama pull qwen2.5:7b

# Fallback model
echo "Downloading llama3.1:8b (fallback model)..."
ollama pull llama3.1:8b

# Optional: Smaller model for testing
echo "Downloading qwen2.5:1.5b (lightweight testing)..."
ollama pull qwen2.5:1.5b

echo "✅ All models downloaded!"
echo "🧪 Testing question generation..."

# Test question generation
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5:7b",
    "prompt": "Generate 2 learning questions about computers in German. Return as JSON array.",
    "stream": false
  }' | jq '.response'

echo "🎉 Ollama setup complete!"
```

### 6. Production Docker Setup
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  ollama:
    image: ollama/ollama
    container_name: imagio-ollama-prod
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0
      - OLLAMA_ORIGINS=*
    deploy:
      resources:
        limits:
          cpus: '4.0'          # 4 CPU cores
          memory: 16G          # 16GB RAM for models
        reservations:
          cpus: '2.0'          # Min 2 cores
          memory: 8G           # Min 8GB RAM
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 60s
      timeout: 30s
      retries: 3
      start_period: 120s     # Wait 2 min for model loading

  imagio-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: imagio-app-prod
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OLLAMA_HOST=http://ollama:11434
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      ollama:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  ollama_data:
    driver: local
```

## 🧠 KEYWORD ANALYSIS ALGORITHM

### Core Algorithm (TypeScript)
```typescript
interface KeywordAnalysisConfig {
  minKeywordLength: number;
  caseSensitive: boolean;
  stemming: boolean;
  synonyms: Record<string, string[]>;
}

export class KeywordAnalyzer {
  private config: KeywordAnalysisConfig;
  
  constructor(config: Partial<KeywordAnalysisConfig> = {}) {
    this.config = {
      minKeywordLength: 3,
      caseSensitive: false,
      stemming: true,
      synonyms: {},
      ...config
    };
  }
  
  async analyzeAnswer(
    answerText: string, 
    targetKeywords: string[]
  ): Promise<KeywordAnalysisResult> {
    const normalizedAnswer = this.normalizeText(answerText);
    const normalizedKeywords = targetKeywords.map(k => this.normalizeText(k));
    
    const results: Array<{
      keyword: string;
      found: boolean;
      variations: string[];
      confidence: number;
    }> = [];
    
    for (const keyword of normalizedKeywords) {
      const analysis = this.findKeywordInText(normalizedAnswer, keyword);
      results.push({
        keyword,
        found: analysis.found,
        variations: analysis.variations,
        confidence: analysis.confidence
      });
    }
    
    const foundCount = results.filter(r => r.found).length;
    const totalCount = results.length;
    const percentage = (foundCount / totalCount) * 100;
    const score = this.calculateScore(results);
    const passed = percentage >= 60; // 60% Threshold
    
    return {
      foundKeywords: results.filter(r => r.found).map(r => r.keyword),
      missedKeywords: results.filter(r => !r.found).map(r => r.keyword),
      score,
      percentage,
      passed,
      details: results
    };
  }
  
  private normalizeText(text: string): string {
    if (!this.config.caseSensitive) {
      text = text.toLowerCase();
    }
    
    // Remove punctuation, extra spaces
    text = text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    
    return text;
  }
  
  private findKeywordInText(text: string, keyword: string) {
    const variations: string[] = [];
    let found = false;
    let confidence = 0;
    
    // Exact match
    if (text.includes(keyword)) {
      found = true;
      confidence = 1.0;
      variations.push(keyword);
    }
    
    // Partial match (für zusammengesetzte Wörter)
    const keywordParts = keyword.split(' ');
    if (keywordParts.length > 1) {
      const partMatches = keywordParts.filter(part => 
        part.length >= this.config.minKeywordLength && text.includes(part)
      );
      
      if (partMatches.length > 0) {
        found = true;
        confidence = partMatches.length / keywordParts.length;
        variations.push(...partMatches);
      }
    }
    
    // Synonyms
    const synonyms = this.config.synonyms[keyword] || [];
    for (const synonym of synonyms) {
      if (text.includes(synonym)) {
        found = true;
        confidence = Math.max(confidence, 0.8); // Synonyms get 80% confidence
        variations.push(synonym);
      }
    }
    
    return { found, variations, confidence };
  }
  
  private calculateScore(results: Array<{ found: boolean; confidence: number }>): number {
    const totalScore = results.reduce((sum, result) => {
      return sum + (result.found ? result.confidence * 100 : 0);
    }, 0);
    
    return Math.round(totalScore / results.length);
  }
}
```

## 📊 MINIMAL ANALYTICS

### GET /api/analytics/exam-statistics
```typescript
interface ExamStatistics {
  totalAttempts: number;
  uniqueUsers: number;
  averageScore: number;
  passRate: number; // Prozent
  popularCourses: Array<{
    courseCode: string;
    courseTitle: string;
    attempts: number;
    averageScore: number;
  }>;
  difficultyStats: {
    easy: { attempts: number; passRate: number };
    medium: { attempts: number; passRate: number };
    hard: { attempts: number; passRate: number };
  };
  keywordStats: Array<{
    keyword: string;
    totalUses: number;
    foundPercentage: number;
  }>;
}
```

## 🔄 MIGRATION PATH (Mit Ollama)

### Phase 1: Lokale Implementierung (Woche 1)
1. **Prisma Schema Setup** ✓
2. **Ollama Installation & Model Setup**
3. **Basic API Endpoints** für Courses + Exams  
4. **Keyword Analysis Algorithm** implementieren
5. **Ollama Fragen-Generierung** implementieren

### Phase 2: AI Features (Woche 2) 
6. **Ollama Keyword-Vorschläge** implementieren
7. **Speech-to-Text Integration** (Browser API)
8. **Exam Session Management**
9. **Frontend Integration** testen
10. **Local Storage → Database Migration**

### Phase 3: Optimization (Woche 3)
11. **Performance Tuning** (Ollama Response Times)
12. **Error Handling & Fallbacks** 
13. **Analytics Dashboard**
14. **Docker Development Environment**

### Phase 4: AWS Migration (Woche 4)
15. **Ollama Production Setup** (EU-Server)
16. **Database Migration zu RDS**
17. **API Deployment zu ECS/Lambda**
18. **Go-Live mit vollem AI-Support**

## 🎯 Ollama Integration Benefits

### ✅ **Sofortige Vorteile:**
- **0€ Kosten** vs. $50+/Monat bei Cloud-APIs
- **100% DSGVO-konform** (EU-Daten bleiben in EU)
- **Keine API-Limits** oder Rate-Limiting
- **Vollständige Kontrolle** über AI-Features
- **Offline-Fähigkeit** (kein Internet nötig)

### 🚀 **Für deine Features perfekt:**
- **Fragen-Generierung:** Qwen2.5 exzellent für deutsche Texte
- **Keyword-Vorschläge:** Llama3.1 sehr gut für Analyse
- **Skalierbarkeit:** Unbegrenzte lokale Nutzung
- **Qualität:** Vergleichbar mit ChatGPT/Claude

### 🛡️ **Enterprise-Ready:**
- **DSGVO-Compliance:** 100% EU-konform
- **Security:** Keine Daten verlassen dein System
- **Reliability:** Keine externen Abhängigkeiten
- **Cost Predictability:** Nur Server-Kosten, keine API-Fees

---

**🎯 Dieser Backend-Entwurf ist exakt auf dein Frontend zugeschnitten - JETZT MIT OLLAMA!** 

## ✅ **Implementierte Features:**
- **Keyword-basierte Bewertung** (Lokaler Algorithmus)
- **Written/Oral Modi** (Browser Speech API)  
- **Level-System (1-4)** (Database Logic)
- **Course-Codes** (ABC123, CS001-CS004)
- **🤖 Ollama Fragen-Generierung** (Kostenlos & DSGVO-konform)
- **🤖 Ollama Keyword-Vorschläge** (Kostenlos & DSGVO-konform)
- **Einfache User Sessions** (Anonymous + Optional Auth)
- **Lokale → AWS Migration** (Docker-ready)

## 🚀 **Neue Ollama-Power:**
- **Qwen2.5:7b** für deutsche Fragen-Generierung
- **Llama3.1:8b** für Keyword-Analyse & Fallback
- **Vollständige Docker-Integration** für Development & Production
- **0€ AI-Kosten** statt $50+/Monat
- **100% DSGVO-konform** - keine US-Server!

## ❌ **Bewusst entfernt:**
- Überkomplexe User Management
- Multiple Choice (Frontend hat nur Text-Fragen)
- Social Features
- Komplexe Rollen-Systeme
- Audit Logs
- Notification-System

## 🎉 **Ready für Implementierung:**
Eine KI kann jetzt mit dieser **Ollama-erweiterten** Dokumentation dein **komplettes Backend mit AI-Features programmieren** - **kostenlos und DSGVO-konform**! 🤖✨

**Nächster Schritt:** `ollama pull qwen2.5:7b` → Backend implementieren lassen! 🚀