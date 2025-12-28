# IMAGIO Backend API Documentation

## Base URL
```
http://localhost:3000/api
```

## Core Endpoints

### Courses API

#### Get All Courses
```http
GET /api/courses
Response: { courses: Course[], success: boolean }
```

#### Create Course  
```http
POST /api/courses
Body: {
  code: string,
  title: string, 
  description: string,
  level: number,
  totalTime: number, // seconds
  totalQuestions: number,
  timePerQuestion: number, // seconds
  maxAttempts: number,
  isPublished: boolean
}
```

#### Update Course
```http  
PUT /api/courses
Body: { id: string, ...courseData }
```

#### Get Course Exam
```http
GET /api/courses/{code}/exam
Response: { exam: ExamDetails, questions: QuestionDetails[] }
```

### Exams API

#### Create Exam with Questions
```http
POST /api/exams
Body: {
  title: string,
  description: string,
  sourceText: string,
  level: number,
  duration: number,
  courseId: string,
  questions: [{
    text: string,
    answer: string,
    keywords: string, // JSON array
    difficulty: "EASY"|"MEDIUM"|"HARD",
    order: number
  }]
}
```

### Student API

#### Start Exam Session
```http
POST /api/student-session
Body: {
  name: string,
  courseCode: string
}
Response: { 
  attemptId: string,
  userId: string, 
  examData: {...}
}
```

#### Submit Answer
```http
POST /api/attempts/{attemptId}/answers
Body: {
  questionId: string,
  answerText: string,
  mode: "WRITTEN"|"ORAL",
  timeSpent: number
}
Response: {
  answerId: string,
  analysis: KeywordAnalysisResult,
  passed: boolean,
  score: number,
  percentage: number
}
```

### Utilities

#### Generate Course Code
```http
GET /api/utils/generate-course-code
Response: { success: boolean, code: string }
```

#### Generate Keywords (AI)
```http
POST /api/generate-keywords  
Body: { answerText: string, questionText?: string }
Response: { keywords: string[] }
```

#### Replace Course Code
```http
POST /api/courses/replace-code
Body: { oldCode: string }
Response: { success: boolean, code: string }
```

### Admin API

#### Admin Login
```http
POST /api/auth/admin-login
Body: { username: string, password: string }
Response: { success: boolean, user: {...} }
```

## Data Models

### Course
```typescript
interface Course {
  id: string
  code: string // Unique 6-digit code
  title: string
  description: string  
  level: number // 1-3
  totalTime: number // seconds
  totalQuestions: number
  timePerQuestion: number // seconds
  maxAttempts: number // default: 3
  isPublished: boolean
  examId?: string
}
```

### Question  
```typescript
interface Question {
  id: string
  text: string
  answer: string
  keywords: string[] // For AI analysis
  difficulty: "EASY" | "MEDIUM" | "HARD"
  order: number
  examId: string
}
```

### Student Answer Analysis
```typescript
interface AnalysisResult {
  passed: boolean // >= 50% keywords found
  score: number // 0-10 scale
  percentage: number // 0-100%
  feedback: string
  foundKeywords: string[]
  missingKeywords: string[]
}
```

## Environment Setup

### Required Environment Variables
```bash
# Database  
DATABASE_URL="file:./prisma/dev.db"

# OpenAI (optional - fallback to simple keyword extraction)
OPENAI_API_KEY="sk-..."

# Security (optional - defaults provided)
JWT_SECRET="your-secret-key"
ADMIN_PASSWORD="imagio123"
```

## Error Handling
All endpoints return consistent error format:
```json
{
  "statusCode": 400|404|500,
  "statusMessage": "Error description"
}
```

## Notes for Frontend Team

1. **Course Codes**: Always 6-digit strings (e.g., "DEMO1", "123456")
2. **Time Format**: All durations in seconds, convert to minutes in UI
3. **Keywords**: Stored as JSON strings, parse with `JSON.parse()`
4. **Analysis**: Real-time AI analysis of student answers
5. **Sessions**: Each exam creates unique `attemptId` for tracking

## Demo Data Available
- **DEMO1**: JavaScript Grundlagen (3 questions)
- **DEMO2**: Python Basics (4 questions)  
- **DEMO3**: Web Development Basics (5 questions)