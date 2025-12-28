# IMAGIO API Documentation

**Base URL:** `http://localhost:3000/api`

## Complete User Flows

### Student Flow (Step-by-Step)

#### 1. Get Available Courses
```http
GET /api/courses
```
**Response:**
```json
{
  "courses": [
    {
      "id": "8d8ccfd4-8287-4155-9477-3b913d52e7fd",
      "code": "DEMO1",
      "title": "JavaScript Grundlagen",
      "description": "Einführung in JavaScript für Anfänger",
      "examId": "e996b08e-2a76-4432-935b-deb5dfcc5f15",
      "totalTime": 1200,
      "totalQuestions": 3,
      "timePerQuestion": 240,
      "level": 1,
      "maxAttempts": 3
    }
  ],
  "success": true
}
```

#### 2. Start Student Session
```http
POST /api/student-session
Content-Type: application/json

{
  "name": "Max Mustermann",
  "courseCode": "DEMO1"
}
```
**Response:**
```json
{
  "success": true,
  "attemptId": "82b0beba-acd8-447e-b3f5-cd2f072e6f59",
  "userId": "a8f7513b-b820-458a-bcc7-6275e9ae09e6",
  "examData": {
    "attemptId": "82b0beba-acd8-447e-b3f5-cd2f072e6f59",
    "userId": "a8f7513b-b820-458a-bcc7-6275e9ae09e6"
  }
}
```

#### 3. Load Exam Questions
```http
GET /api/courses/DEMO1/exam
```
**Response:**
```json
{
  "exam": {
    "id": "e996b08e-2a76-4432-935b-deb5dfcc5f15",
    "title": "JavaScript Grundlagen",
    "description": "JavaScript Test",
    "sourceText": "Grundlagen von JavaScript",
    "level": 1,
    "duration": 20,
    "totalQuestions": 3
  },
  "questions": [
    {
      "id": "c6666d27-48ea-4d18-b673-7b724cf220ac",
      "text": "Was ist eine Variable in JavaScript?",
      "answer": "Eine Variable ist ein Container für Daten",
      "difficulty": "EASY",
      "keywords": "[\"Variable\",\"Container\",\"Daten\",\"JavaScript\"]",
      "selected": true
    }
  ]
}
```

#### 4. Submit Answer
```http
POST /api/attempts/{attemptId}/answers
Content-Type: application/json

{
  "questionId": "c6666d27-48ea-4d18-b673-7b724cf220ac",
  "answerText": "Eine Variable speichert Daten und kann verschiedene Werte haben",
  "mode": "WRITTEN",
  "timeSpent": 30
}
```
**Response:**
```json
{
  "answerId": "21c934c3-addf-48f6-9bec-436aa690047d",
  "analysis": {
    "foundKeywords": ["Variable", "Daten"],
    "missedKeywords": ["Container", "JavaScript"],
    "score": 5,
    "percentage": 50,
    "passed": false,
    "details": [
      {
        "keyword": "Variable",
        "found": true,
        "variations": ["variable"],
        "confidence": 1.0
      }
    ]
  },
  "passed": false,
  "score": 5,
  "percentage": 50
}
```

### Admin Flow (Step-by-Step)

#### 1. Admin Login
```http
POST /api/auth/admin-login
Content-Type: application/json

{
  "username": "admin",
  "password": "imagio123"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

#### 2. Create Course
```http
POST /api/courses
Content-Type: application/json

{
  "code": "JS101",
  "title": "JavaScript Basics",
  "description": "Learn JavaScript fundamentals",
  "level": 1,
  "totalTime": 1800,
  "totalQuestions": 5,
  "timePerQuestion": 360,
  "maxAttempts": 3,
  "isPublished": true
}
```

#### 3. Create Exam with Questions
```http
POST /api/exams
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Test your JavaScript knowledge",
  "sourceText": "JavaScript fundamentals",
  "level": 1,
  "duration": 30,
  "courseId": "course-uuid-here",
  "questions": [
    {
      "text": "What is a variable?",
      "answer": "A variable is a container for storing data",
      "keywords": "[\"variable\", \"container\", \"data\", \"storing\"]",
      "difficulty": "EASY",
      "order": 1
    }
  ]
}
```

## All API Endpoints

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List all published courses |
| POST | `/api/courses` | Create new course |
| PUT | `/api/courses` | Update existing course |
| DELETE | `/api/courses/delete-by-code` | Delete course by code |
| GET | `/api/courses/{code}/exam` | Get exam for course code |
| POST | `/api/courses/replace-code` | Generate new course code |

### Student Sessions & Attempts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/student-session` | Start new student exam session |
| POST | `/api/attempts/{id}/answers` | Submit answer for question |
| POST | `/api/attempts/{id}/complete` | Complete exam attempt |

### Exams

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/exams` | Create exam with questions |
| PUT | `/api/exams` | Update exam |
| POST | `/api/exams/{id}/start` | Start exam session |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/admin-login` | Admin authentication |

### Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/utils/generate-course-code` | Generate unique course code |
| POST | `/api/generate-keywords` | AI keyword generation |
| GET | `/api/health` | Health check |

## Data Models

### Course
```typescript
interface Course {
  id: string
  code: string           // e.g. "DEMO1", "JS101"
  title: string
  description: string
  level: number          // 1-4
  totalTime: number      // seconds
  totalQuestions: number
  timePerQuestion: number // seconds
  maxAttempts: number    // default: 3
  isPublished: boolean
  examId?: string
}
```

### Question
```typescript
interface Question {
  id: string
  text: string
  answer?: string        // Expected answer (for reference)
  difficulty: "EASY" | "MEDIUM" | "HARD"
  keywords: string       // JSON array: "[\"keyword1\", \"keyword2\"]"
  selected: boolean
}
```

### Student Session
```typescript
interface StudentSession {
  attemptId: string      // Use this for answer submissions
  userId: string
  examData: {
    attemptId: string
    userId: string
  }
}
```

### Answer Analysis
```typescript
interface AnswerAnalysis {
  foundKeywords: string[]
  missedKeywords: string[]
  score: number          // 0-10
  percentage: number     // 0-100
  passed: boolean        // >= 50% threshold
  details: Array<{
    keyword: string
    found: boolean
    variations?: string[]
    confidence: number
  }>
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found (course/question not found)
- `409` - Conflict (duplicate course code)
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": true,
  "statusCode": 400,
  "statusMessage": "Course not found",
  "message": "Course not found"
}
```

### Common Error Messages
- `"Name and course code are required"` - Missing required fields
- `"Course or exam not found"` - Invalid course code
- `"Question ID, answer text, and mode are required"` - Missing answer data
- `"Invalid credentials"` - Wrong admin login
- `"Code bereits vergeben"` - Duplicate course code

## Frontend Integration Examples

### React/Vue Component Examples

#### Course Selection
```javascript
// Get available courses
const courses = await fetch('/api/courses')
  .then(r => r.json())
  .then(data => data.courses)

// Start student session
const startSession = async (name, courseCode) => {
  const response = await fetch('/api/student-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, courseCode })
  })
  return response.json()
}
```

#### Exam Taking
```javascript
// Load exam questions
const loadExam = async (courseCode) => {
  const response = await fetch(`/api/courses/${courseCode}/exam`)
  return response.json()
}

// Submit answer
const submitAnswer = async (attemptId, questionId, answerText, mode, timeSpent) => {
  const response = await fetch(`/api/attempts/${attemptId}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionId,
      answerText,
      mode: mode.toUpperCase(), // "WRITTEN" or "ORAL"
      timeSpent
    })
  })
  return response.json()
}
```

#### Admin Login
```javascript
const adminLogin = async (username, password) => {
  const response = await fetch('/api/auth/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (!response.ok) {
    throw new Error('Invalid credentials')
  }
  return response.json()
}
```

## Notes for Frontend Developers

### Important Details
1. **Course Codes**: Always 6-character strings (e.g., "DEMO1", "ABC123")
2. **Time Values**: All durations in seconds, convert to minutes for UI
3. **Keywords**: Stored as JSON strings, parse with `JSON.parse()`
4. **Answer Modes**: Use "WRITTEN" or "ORAL" (uppercase)
5. **Attempt IDs**: Required for all answer submissions

### CORS Configuration
All endpoints support CORS for:
- `localhost:3001` (typical frontend port)
- `localhost:4000` (alternative frontend port)
- Standard headers: Content-Type, Authorization, etc.

### Demo Data
Three courses available for immediate testing:
- **DEMO1**: JavaScript Grundlagen (3 questions, Level 1)
- **DEMO2**: Python Basics (4 questions, Level 2)
- **DEMO3**: Web Development Basics (5 questions, Level 1)

### Authentication
- **Students**: No authentication required (anonymous)
- **Admins**: Use `/api/auth/admin-login` with `admin`/`imagio123`

**Ready for frontend development! All endpoints tested and working.**