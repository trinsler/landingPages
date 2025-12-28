# IMAGIO Backend - Ready for Frontend Development

## Quick Start

```bash
cd imagio/
npm install
npm run dev
```

**Backend runs on:** `http://localhost:3000`

## Demo Access

### Admin Interface
- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `imagio123`

### Student Interface
- **URL**: `http://localhost:3000/`
- **Demo Codes**: `DEMO1`, `DEMO2`, `DEMO3`

## Demo Data Available

### Ready-to-Test Courses:
1. **DEMO1** - JavaScript Grundlagen (3 questions, Level 1, 20 min)
2. **DEMO2** - Python Basics (4 questions, Level 2, 30 min)
3. **DEMO3** - Web Development Basics (5 questions, Level 1, 40 min)

### Test Student Flow:
1. Enter name: "Max Mustermann"
2. Enter code: "DEMO1"
3. Take exam with real AI keyword analysis
4. View results with detailed feedback

## Frontend Development

### API Base URL
```javascript
const API_BASE = 'http://localhost:3000/api'
```

### Essential API Calls
```javascript
// Get all courses
fetch(`${API_BASE}/courses`)

// Get exam for course
fetch(`${API_BASE}/courses/DEMO1/exam`)

// Start student session
fetch(`${API_BASE}/student-session`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Student Name',
    courseCode: 'DEMO1'
  })
})

// Submit answer
fetch(`${API_BASE}/attempts/{attemptId}/answers`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    questionId: 'question-uuid',
    answerText: 'student answer',
    mode: 'WRITTEN',
    timeSpent: 120
  })
})
```

### CORS Configuration
**Fully configured for frontend development:**
- `localhost:3001` (default frontend port)
- `localhost:4000` (alternative frontend port)
- `127.0.0.1:3001`, `127.0.0.1:4000`
- All standard headers supported

## Key Features

### Student Experience:
- Course code entry with validation
- Real-time exam timer
- Text and voice answer modes
- AI-powered keyword analysis
- Instant feedback with scores
- Progress tracking

### Admin Experience:
- Course management (create/edit/delete)
- Question editor with keyword management
- Automatic course code generation
- Student attempt tracking

### Technical Features:
- Real-time AI keyword analysis (OpenAI + fallback)
- Automatic course code generation with conflict resolution
- Session tracking and attempt limits
- Comprehensive error handling
- SQLite database persistence

## Error Handling

### Common HTTP Status Codes:
- `400` - Validation errors (show field-specific messages)
- `404` - Resource not found (course/question not found)
- `409` - Conflicts (code already exists)
- `500` - Server errors (show generic error message)

### User-Friendly Error Messages:
- "Kurs nicht gefunden" (Course not found)
- "Code bereits vergeben" (Code already taken)
- "Verbindungsfehler" (Connection error)
- "Sitzung abgelaufen" (Session expired)

## Environment Setup

### Required Environment Variables:
```bash
# Database (automatically configured)
DATABASE_URL="file:./prisma/dev.db"

# AI Features (optional - has fallback)
OPENAI_API_KEY="sk-your-api-key"
```

### No Additional Setup Required:
- Database auto-created with demo data
- Admin credentials pre-configured
- CORS pre-configured for frontend ports
- All dependencies included

## Backend Status: READY

**Confirmed Working:**
- Backend starts without errors
- Demo courses created and accessible
- Admin login functional
- Student exam flow works end-to-end
- API endpoints return expected data
- CORS allows all frontend requests
- Error handling returns proper status codes

**Ready for Frontend Integration:**
- Stable API with comprehensive error handling
- Demo data for immediate development
- Real AI analysis for realistic testing
- Complete documentation

See `API.md` for detailed API reference.