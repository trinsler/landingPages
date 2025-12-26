# 🚀 IMAGIO API DOCUMENTATION

## 📋 ÜBERSICHT
**Base URL:** `http://localhost:4000/api`  
**Version:** 2.0.0  
**Authentifizierung:** JWT Bearer Token  

---

## 🔐 AUTHENTIFIZIERUNG

### POST `/auth/login`
```typescript
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "STUDENT" | "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 📚 KURSE MANAGEMENT

### GET `/courses`
Alle verfügbaren Kurse abrufen
```typescript
// Response
{
  "success": true,
  "courses": [
    {
      "id": "course_123",
      "code": "ABC123",
      "title": "Algorithmus Grundlagen",
      "description": "Lerne die Grundlagen von Algorithmen",
      "level": 1,
      "totalTime": 30,
      "totalQuestions": 5,
      "isPublished": true,
      "createdAt": "2025-01-01T12:00:00Z"
    }
  ]
}
```

### POST `/courses`
Neuen Kurs erstellen (Admin only)
```typescript
// Request
{
  "title": "Neuer Kurs",
  "description": "Kursbeschreibung",
  "level": 1,
  "duration": 30,
  "timePerQuestion": 300
}

// Response
{
  "success": true,
  "course": {
    "id": "course_456",
    "code": "DEF456", // Auto-generated
    "title": "Neuer Kurs",
    // ... weitere Felder
  }
}
```

### GET `/courses/{code}/exam`
Exam-Details für einen Kurs abrufen
```typescript
// Response
{
  "success": true,
  "exam": {
    "id": "exam_789",
    "title": "Algorithmus Test",
    "questions": [
      {
        "id": "q_1",
        "text": "Was ist ein Algorithmus?",
        "answer": "Ein Algorithmus ist eine eindeutige Handlungsvorschrift...",
        "difficulty": "MEDIUM",
        "keywords": ["algorithmus", "informatik", "eindeutige", "handlungsvorschrift"]
      }
    ]
  }
}
```

---

## 📝 PRÜFUNGEN

### POST `/exams/{examId}/start`
Prüfungsversuch starten
```typescript
// Request
{
  "userId": "student_123"
}

// Response
{
  "success": true,
  "attemptId": "attempt_456",
  "timeLimit": 1800, // in seconds
  "maxQuestions": 5
}
```

### POST `/attempts/{attemptId}/answers`
Antwort für eine Frage abgeben
```typescript
// Request
{
  "questionId": "q_1",
  "answerText": "Ein Algorithmus ist ein Verfahren zur Problemlösung",
  "mode": "WRITTEN" | "ORAL",
  "timeSpent": 120 // in seconds
}

// Response
{
  "success": true,
  "analysis": {
    "passed": true,
    "score": 4,
    "maxScore": 5,
    "feedback": "Gut! Gefunden: algorithmus, verfahren. 4/5 Keywords erkannt.",
    "keywordsFound": ["algorithmus", "verfahren"],
    "keywordsMissing": ["informatik"]
  }
}
```

### POST `/attempts/{attemptId}/complete`
Prüfung abschließen
```typescript
// Request
{
  "timeSpent": 1200 // Total time in seconds
}

// Response
{
  "success": true,
  "results": {
    "attemptId": "attempt_456",
    "totalScore": 18,
    "maxScore": 25,
    "percentage": 72,
    "passed": true,
    "questionsCorrect": 4,
    "totalQuestions": 5,
    "timeSpent": 1200
  }
}
```

---

## 🤖 KI-SERVICES

### POST `/generate-keywords`
Keywords aus Musterantwort generieren (Admin only)
```typescript
// Request
{
  "answerText": "Ein Algorithmus ist eine eindeutige Handlungsvorschrift zur Lösung eines Problems.",
  "questionText": "Was ist ein Algorithmus?" // Optional
}

// Response
{
  "success": true,
  "keywords": [
    "algorithmus",
    "eindeutige", 
    "handlungsvorschrift",
    "lösung",
    "problems"
  ]
}
```

---

## 📊 ANALYTICS

### GET `/users/{userId}/progress`
Fortschritt eines Benutzers abrufen
```typescript
// Response
{
  "success": true,
  "progress": {
    "userId": "student_123",
    "totalExams": 5,
    "completedExams": 3,
    "averageScore": 78.5,
    "totalTimeSpent": 3600,
    "recentActivity": [
      {
        "examId": "exam_789",
        "score": 82,
        "completedAt": "2025-01-01T15:30:00Z"
      }
    ]
  }
}
```

---

## 🔧 UTILITY ENDPOINTS

### GET `/health`
Service-Gesundheitscheck
```typescript
// Response
{
  "status": "healthy",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "2.0.0",
  "services": {
    "database": "connected",
    "ai_service": "available"
  }
}
```

### GET `/utils/generate-course-code`
Neuen einzigartigen Kurscode generieren
```typescript
// Response
{
  "success": true,
  "code": "ABC123"
}
```

---

## ⚠️ FEHLERBEHANDLUNG

### Standard Fehlerformat
```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Required field missing",
    "details": {
      "field": "title",
      "reason": "Title is required"
    }
  },
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### HTTP Status Codes
- `200` - Erfolgreich
- `201` - Erstellt
- `400` - Ungültige Anfrage
- `401` - Nicht authentifiziert
- `403` - Nicht autorisiert
- `404` - Nicht gefunden
- `409` - Konflikt (z.B. Duplikat)
- `429` - Rate Limit überschritten
- `500` - Serverfehler
- `503` - Service nicht verfügbar

---

## 🚀 FRONTEND INTEGRATION

### Axios Setup
```typescript
// api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

### TypeScript Types
```typescript
// types.ts
export interface Course {
  id: string
  code: string
  title: string
  description: string
  level: number
  totalTime: number
  totalQuestions: number
  isPublished: boolean
  createdAt: string
}

export interface Question {
  id: string
  text: string
  answer: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  keywords: string[]
}

export interface ExamAttempt {
  id: string
  userId: string
  examId: string
  startedAt: string
  completedAt?: string
  score?: number
  maxScore?: number
}
```

---

## 🔒 SICHERHEITSHINWEISE

### Authentifizierung
- JWT Token haben 24h Gültigkeitsdauer
- Refresh Tokens haben 7 Tage Gültigkeitsdauer
- Rate Limiting: 100 Requests/Minute pro IP

### Datenvalidierung
- Alle Input-Daten werden serverseitig validiert
- XSS-Protection durch Content-Type Header
- CSRF-Protection durch Origin-Check

### API Keys
- OpenAI API Key wird nur serverseitig verwendet
- Keine Secrets im Frontend-Code
- Alle sensiblen Daten sind verschlüsselt