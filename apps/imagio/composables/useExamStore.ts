import { ref, computed } from 'vue'

export interface ExamQuestion {
  id: string
  text: string
  answer?: string // Added answer field for manual question entry
  difficulty: 'easy' | 'medium' | 'hard'
  keywords: string[]
  selected: boolean
}

export interface Exam {
  id: string
  title: string
  description: string
  sourceText: string
  questions: ExamQuestion[]
  level: number
  duration?: number
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
}

export interface ExamAnswer {
  questionId: string
  answer: string
  keywordsFound: string[]
  score: number
  percentage: number
  passed: boolean
  mode: 'written' | 'oral'
  timestamp: Date
}

export interface ExamAttempt {
  id: string
  examId: string
  userId: string
  answers: ExamAnswer[]
  startedAt: Date
  completedAt?: Date
  overallScore: number
  passed: boolean
  level: number
}

export interface UserProgress {
  userId: string
  completedLevels: number[]
  currentLevel: number
  examAttempts: ExamAttempt[]
  lastActivity: Date
}

// Course-based exam system
interface CourseInfo {
  code: string
  title: string
  description: string
  examId: string
  totalTime: number
  totalQuestions: number
  timePerQuestion: number
}

const courses = ref<Record<string, CourseInfo>>({
  'ABC123': {
    code: 'ABC123',
    title: 'IMAGIO Mock Scenario - Demo Test',
    description: 'Demo scenario for testing the IMAGIO learning platform.',
    examId: 'mock_abc123_exam',
    totalTime: 8,
    totalQuestions: 3,
    timePerQuestion: 60
  },
  'CS001': {
    code: 'CS001',
    title: 'Basic Computer Science - Level 1',
    description: 'Introduction to fundamental computer science concepts.',
    examId: 'exam_cs001',
    totalTime: 5,
    totalQuestions: 2,
    timePerQuestion: 60
  },
  'CS002': {
    code: 'CS002',
    title: 'Basic Computer Science - Level 2',
    description: 'Programming basics and algorithms.',
    examId: 'exam_cs002',
    totalTime: 8,
    totalQuestions: 3,
    timePerQuestion: 60
  },
  'CS003': {
    code: 'CS003',
    title: 'Basic Computer Science - Level 3',
    description: 'Data structures and problem solving.',
    examId: 'exam_cs003',
    totalTime: 10,
    totalQuestions: 3,
    timePerQuestion: 60
  },
  'CS004': {
    code: 'CS004',
    title: 'Basic Computer Science - Level 4',
    description: 'Advanced programming concepts and system design.',
    examId: 'exam_cs004',
    totalTime: 12,
    totalQuestions: 4,
    timePerQuestion: 60
  }
})

// Global state - in production, this would be replaced with a proper database
const exams = ref<Exam[]>([
  {
    id: 'mock_abc123_exam',
    title: 'IMAGIO Demo Test',
    description: 'Interactive demo test for exploring the IMAGIO learning platform',
    sourceText: 'Welcome to IMAGIO! This is a demo scenario to test your knowledge about digital learning and technology. Answer the questions to see how our intelligent learning system works.',
    questions: [
      {
        id: 'q1_abc123',
        text: 'What do you think about digital learning platforms like IMAGIO?',
        difficulty: 'easy',
        keywords: ['digital', 'learning', 'platform', 'technology', 'education', 'online', 'interactive', 'modern', 'flexible', 'accessible'],
        selected: true
      },
      {
        id: 'q2_abc123',
        text: 'Describe how technology can help with education.',
        difficulty: 'medium',
        keywords: ['technology', 'help', 'education', 'tools', 'resources', 'access', 'learning', 'innovation', 'digital', 'students'],
        selected: true
      },
      {
        id: 'q3_abc123',
        text: 'What features would make a learning platform more effective?',
        difficulty: 'medium',
        keywords: ['features', 'effective', 'learning', 'interactive', 'feedback', 'progress', 'engagement', 'personalization', 'assessment', 'communication'],
        selected: true
      }
    ],
    level: 1,
    duration: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true
  },
  {
    id: 'exam_cs001',
    title: 'Basic Computer Science - Level 1',
    description: 'Introduction to fundamental computer science concepts',
    sourceText: 'Computer science is the study of computational systems and computers. It includes both theoretical and practical approaches.',
    questions: [
      {
        id: 'q1_cs1',
        text: 'What is a computer program?',
        difficulty: 'easy',
        keywords: ['computer program', 'instructions', 'code', 'software', 'computer', 'execute', 'tasks', 'programming', 'algorithm', 'application'],
        selected: true
      },
      {
        id: 'q2_cs1',
        text: 'Explain what an algorithm is.',
        difficulty: 'easy',
        keywords: ['algorithm', 'steps', 'instructions', 'solve', 'problem', 'sequence', 'process', 'logical', 'procedure', 'method'],
        selected: true
      }
    ],
    level: 1,
    duration: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true
  },
  {
    id: 'exam_cs002',
    title: 'Basic Computer Science - Level 2',
    description: 'Programming basics and algorithms',
    sourceText: 'Programming involves writing code to create software applications. Variables store data and loops repeat actions.',
    questions: [
      {
        id: 'q1_cs2',
        text: 'What is a variable in programming?',
        difficulty: 'easy',
        keywords: ['variable', 'store', 'data', 'value', 'memory', 'programming', 'information', 'container', 'name', 'reference'],
        selected: true
      },
      {
        id: 'q2_cs2',
        text: 'Explain what a loop does in programming.',
        difficulty: 'medium',
        keywords: ['loop', 'repeat', 'iteration', 'code', 'multiple times', 'programming', 'control structure', 'automated', 'cycles', 'execution'],
        selected: true
      },
      {
        id: 'q3_cs2',
        text: 'What is the difference between hardware and software?',
        difficulty: 'medium',
        keywords: ['hardware', 'software', 'physical', 'programs', 'computer', 'components', 'applications', 'tangible', 'digital', 'difference'],
        selected: true
      }
    ],
    level: 2,
    duration: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true
  },
  {
    id: 'exam_cs003',
    title: 'Basic Computer Science - Level 3',
    description: 'Data structures and problem solving',
    sourceText: 'Data structures organize information efficiently. Arrays store lists of data and functions perform specific tasks.',
    questions: [
      {
        id: 'q1_cs3',
        text: 'What is an array in programming?',
        difficulty: 'medium',
        keywords: ['array', 'list', 'data', 'elements', 'collection', 'ordered', 'index', 'programming', 'structure', 'multiple values'],
        selected: true
      },
      {
        id: 'q2_cs3',
        text: 'Explain what a function does.',
        difficulty: 'medium',
        keywords: ['function', 'code', 'reusable', 'task', 'input', 'output', 'programming', 'procedure', 'block', 'modular'],
        selected: true
      },
      {
        id: 'q3_cs3',
        text: 'What is debugging in programming?',
        difficulty: 'hard',
        keywords: ['debugging', 'errors', 'bugs', 'fix', 'programming', 'testing', 'troubleshooting', 'identify', 'code', 'problems'],
        selected: true
      }
    ],
    level: 3,
    duration: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true
  },
  {
    id: 'exam_cs004',
    title: 'Basic Computer Science - Level 4',
    description: 'Advanced programming concepts and system design',
    sourceText: 'Object-oriented programming organizes code into objects. Databases store and manage large amounts of information.',
    questions: [
      {
        id: 'q1_cs4',
        text: 'What is object-oriented programming?',
        difficulty: 'hard',
        keywords: ['object-oriented', 'programming', 'objects', 'classes', 'encapsulation', 'inheritance', 'code organization', 'OOP', 'methods', 'properties'],
        selected: true
      },
      {
        id: 'q2_cs4',
        text: 'Explain what a database is.',
        difficulty: 'medium',
        keywords: ['database', 'data', 'storage', 'organized', 'information', 'retrieve', 'manage', 'tables', 'records', 'system'],
        selected: true
      },
      {
        id: 'q3_cs4',
        text: 'What is the purpose of testing in software development?',
        difficulty: 'hard',
        keywords: ['testing', 'software', 'quality', 'bugs', 'verification', 'development', 'reliability', 'functionality', 'errors', 'validation'],
        selected: true
      },
      {
        id: 'q4_cs4',
        text: 'Describe what an operating system does.',
        difficulty: 'hard',
        keywords: ['operating system', 'computer', 'manage', 'resources', 'software', 'hardware', 'interface', 'programs', 'files', 'system'],
        selected: true
      }
    ],
    level: 4,
    duration: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: true
  }
])

const userProgress = ref<UserProgress>({
  userId: 'user_1',
  completedLevels: [],
  currentLevel: 1,
  examAttempts: [],
  lastActivity: new Date()
})

export const useExamStore = () => {
  // Computed properties
  const availableExams = computed(() => 
    exams.value.filter(exam => 
      exam.isPublished && exam.level <= userProgress.value.currentLevel + 1
    )
  )

  const completedExams = computed(() => 
    exams.value.filter(exam => 
      userProgress.value.completedLevels.includes(exam.level)
    )
  )

  const currentLevelExams = computed(() =>
    exams.value.filter(exam => exam.level === userProgress.value.currentLevel)
  )

  // Exam management
  const createExam = (examData: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExam: Exam = {
      ...examData,
      id: `exam_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    exams.value.push(newExam)
    saveToLocalStorage()
    return newExam
  }

  const updateExam = (examId: string, updates: Partial<Exam>) => {
    const examIndex = exams.value.findIndex(exam => exam.id === examId)
    if (examIndex !== -1) {
      exams.value[examIndex] = {
        ...exams.value[examIndex],
        ...updates,
        updatedAt: new Date()
      }
      saveToLocalStorage()
      return exams.value[examIndex]
    }
    return null
  }

  const deleteExam = (examId: string) => {
    const examIndex = exams.value.findIndex(exam => exam.id === examId)
    if (examIndex !== -1) {
      exams.value.splice(examIndex, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getExamById = (examId: string) => {
    return exams.value.find(exam => exam.id === examId)
  }

  // Question management
  const updateQuestion = (examId: string, questionId: string, updates: Partial<ExamQuestion>) => {
    const exam = getExamById(examId)
    if (exam) {
      const questionIndex = exam.questions.findIndex(q => q.id === questionId)
      if (questionIndex !== -1) {
        exam.questions[questionIndex] = {
          ...exam.questions[questionIndex],
          ...updates
        }
        exam.updatedAt = new Date()
        saveToLocalStorage()
        return exam.questions[questionIndex]
      }
    }
    return null
  }

  const deleteQuestion = (examId: string, questionId: string) => {
    const exam = getExamById(examId)
    if (exam) {
      const questionIndex = exam.questions.findIndex(q => q.id === questionId)
      if (questionIndex !== -1) {
        exam.questions.splice(questionIndex, 1)
        exam.updatedAt = new Date()
        saveToLocalStorage()
        return true
      }
    }
    return false
  }

  // Exam attempt management
  const startExamAttempt = (examId: string, userId: string): ExamAttempt => {
    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      examId,
      userId,
      answers: [],
      startedAt: new Date(),
      overallScore: 0,
      passed: false,
      level: getExamById(examId)?.level || 1
    }
    
    userProgress.value.examAttempts.push(attempt)
    saveToLocalStorage()
    return attempt
  }

  const submitAnswer = (
    attemptId: string, 
    questionId: string, 
    answer: string, 
    analysis: any,
    mode: 'written' | 'oral' = 'written'
  ) => {
    const attempt = userProgress.value.examAttempts.find(a => a.id === attemptId)
    if (attempt) {
      const answerRecord: ExamAnswer = {
        questionId,
        answer,
        keywordsFound: analysis.foundKeywords,
        score: analysis.score,
        percentage: analysis.percentage,
        passed: analysis.passed,
        mode,
        timestamp: new Date()
      }
      
      // Remove existing answer for this question if any
      attempt.answers = attempt.answers.filter(a => a.questionId !== questionId)
      attempt.answers.push(answerRecord)
      
      saveToLocalStorage()
      return answerRecord
    }
    return null
  }

  const completeExamAttempt = (attemptId: string) => {
    const attempt = userProgress.value.examAttempts.find(a => a.id === attemptId)
    if (attempt) {
      attempt.completedAt = new Date()
      
      // Calculate overall score
      const passedAnswers = attempt.answers.filter(a => a.passed).length
      const totalAnswers = attempt.answers.length
      attempt.overallScore = totalAnswers > 0 ? (passedAnswers / totalAnswers) * 100 : 0
      attempt.passed = passedAnswers === totalAnswers // All questions must pass
      
      // Update user progress
      if (attempt.passed && !userProgress.value.completedLevels.includes(attempt.level)) {
        userProgress.value.completedLevels.push(attempt.level)
        userProgress.value.currentLevel = Math.max(userProgress.value.currentLevel, attempt.level + 1)
      }
      
      userProgress.value.lastActivity = new Date()
      saveToLocalStorage()
      return attempt
    }
    return null
  }

  // Level management
  const isLevelUnlocked = (level: number) => {
    return level <= userProgress.value.currentLevel
  }

  const getNextLevel = () => {
    return userProgress.value.currentLevel + 1
  }

  // Local storage management
  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('examPortal_exams', JSON.stringify(exams.value))
      localStorage.setItem('examPortal_userProgress', JSON.stringify(userProgress.value))
    }
  }

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedExams = localStorage.getItem('examPortal_exams')
      const savedProgress = localStorage.getItem('examPortal_userProgress')
      
      if (savedExams) {
        try {
          exams.value = JSON.parse(savedExams)
        } catch (e) {
          console.warn('Failed to load exams from localStorage')
        }
      }
      
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress)
          userProgress.value = {
            ...userProgress.value,
            ...parsed,
            lastActivity: new Date(parsed.lastActivity)
          }
        } catch (e) {
          console.warn('Failed to load user progress from localStorage')
        }
      }
    }
  }

  // Course management
  const getCourseByCode = (code: string): CourseInfo | null => {
    return courses.value[code] || null
  }

  const getExamByCourseCode = (code: string): Exam | null => {
    const course = getCourseByCode(code)
    if (course) {
      return exams.value.find(exam => exam.id === course.examId) || null
    }
    return null
  }

  // Statistics
  const getExamStatistics = () => {
    const totalExams = exams.value.length
    const completedExams = userProgress.value.completedLevels.length
    const totalAttempts = userProgress.value.examAttempts.length
    const passedAttempts = userProgress.value.examAttempts.filter(a => a.passed).length
    
    return {
      totalExams,
      completedExams,
      totalAttempts,
      passedAttempts,
      successRate: totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0,
      currentLevel: userProgress.value.currentLevel,
      completedLevels: userProgress.value.completedLevels
    }
  }

  // Initialize
  loadFromLocalStorage()

  return {
    // State
    exams: computed(() => exams.value),
    userProgress: computed(() => userProgress.value),
    courses: computed(() => courses.value),
    
    // Computed
    availableExams,
    completedExams,
    currentLevelExams,
    
    // Methods
    createExam,
    updateExam,
    deleteExam,
    getExamById,
    updateQuestion,
    deleteQuestion,
    startExamAttempt,
    submitAnswer,
    completeExamAttempt,
    isLevelUnlocked,
    getNextLevel,
    getCourseByCode,
    getExamByCourseCode,
    getExamStatistics,
    saveToLocalStorage,
    loadFromLocalStorage
  }
}