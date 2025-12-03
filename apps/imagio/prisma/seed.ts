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
    {
      code: 'CS002',
      title: 'Intermediate Computer Science - Level 2',
      description: 'Advanced programming concepts and data structures.',
      level: 2,
      totalTime: 10,
      totalQuestions: 4,
      timePerQuestion: 90
    },
    {
      code: 'CS003',
      title: 'Advanced Computer Science - Level 3',
      description: 'Complex algorithms and system design.',
      level: 3,
      totalTime: 15,
      totalQuestions: 5,
      timePerQuestion: 120
    },
    {
      code: 'CS004',
      title: 'Expert Computer Science - Level 4',
      description: 'Expert-level computer science topics and research.',
      level: 4,
      totalTime: 20,
      totalQuestions: 6,
      timePerQuestion: 150
    }
  ]

  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: courseData
    })
    
    console.log(`Created course: ${course.code}`)
    
    // Create exam for course
    const exam = await prisma.exam.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        sourceText: `Learning material for ${courseData.title}. This covers essential topics including digital learning platforms, technology integration, and educational methodologies.`,
        level: courseData.level,
        duration: courseData.totalTime
      }
    })
    
    console.log(`Created exam: ${exam.title}`)
    
    // Link course to exam
    await prisma.course.update({
      where: { id: course.id },
      data: { examId: exam.id }
    })
    
    // Create sample questions with keywords based on course level
    let sampleQuestions: Array<{
      text: string;
      difficulty: 'EASY' | 'MEDIUM' | 'HARD';
      keywords: string[];
    }> = []

    if (courseData.code === 'ABC123') {
      sampleQuestions = [
        {
          text: 'What do you think about digital learning platforms?',
          difficulty: 'EASY' as const,
          keywords: ['digital', 'learning', 'platform', 'technology', 'education']
        },
        {
          text: 'How would you describe the benefits of interactive learning?',
          difficulty: 'EASY' as const,
          keywords: ['interactive', 'learning', 'benefits', 'engagement', 'student']
        },
        {
          text: 'What challenges might arise when implementing new educational technologies?',
          difficulty: 'MEDIUM' as const,
          keywords: ['challenges', 'implementation', 'educational', 'technology', 'barriers']
        }
      ]
    } else if (courseData.level === 1) {
      sampleQuestions = [
        {
          text: 'Explain the basic concepts of computer programming.',
          difficulty: 'EASY' as const,
          keywords: ['programming', 'concepts', 'computer', 'code', 'algorithm']
        },
        {
          text: 'What is the difference between hardware and software?',
          difficulty: 'EASY' as const,
          keywords: ['hardware', 'software', 'computer', 'system', 'components']
        }
      ]
    } else if (courseData.level === 2) {
      sampleQuestions = [
        {
          text: 'Describe the principles of object-oriented programming.',
          difficulty: 'MEDIUM' as const,
          keywords: ['object-oriented', 'programming', 'classes', 'objects', 'inheritance', 'polymorphism']
        },
        {
          text: 'Explain how data structures affect program performance.',
          difficulty: 'MEDIUM' as const,
          keywords: ['data structures', 'performance', 'efficiency', 'algorithms', 'optimization']
        },
        {
          text: 'What are the key considerations in database design?',
          difficulty: 'MEDIUM' as const,
          keywords: ['database', 'design', 'normalization', 'relationships', 'schema']
        },
        {
          text: 'How do you ensure code quality in software development?',
          difficulty: 'MEDIUM' as const,
          keywords: ['code quality', 'testing', 'debugging', 'documentation', 'standards']
        }
      ]
    } else if (courseData.level === 3) {
      sampleQuestions = [
        {
          text: 'Analyze the time complexity of different sorting algorithms.',
          difficulty: 'HARD' as const,
          keywords: ['time complexity', 'sorting algorithms', 'big O', 'efficiency', 'analysis']
        },
        {
          text: 'Discuss the trade-offs in distributed system design.',
          difficulty: 'HARD' as const,
          keywords: ['distributed systems', 'trade-offs', 'scalability', 'consistency', 'availability']
        },
        {
          text: 'Explain the principles of secure software development.',
          difficulty: 'HARD' as const,
          keywords: ['security', 'software development', 'vulnerabilities', 'encryption', 'authentication']
        },
        {
          text: 'How would you design a scalable web architecture?',
          difficulty: 'HARD' as const,
          keywords: ['scalable', 'web architecture', 'load balancing', 'caching', 'microservices']
        },
        {
          text: 'Describe advanced database optimization techniques.',
          difficulty: 'HARD' as const,
          keywords: ['database optimization', 'indexing', 'query performance', 'partitioning', 'replication']
        }
      ]
    } else if (courseData.level === 4) {
      sampleQuestions = [
        {
          text: 'Evaluate the impact of machine learning on modern software systems.',
          difficulty: 'HARD' as const,
          keywords: ['machine learning', 'software systems', 'AI', 'algorithms', 'data processing']
        },
        {
          text: 'Analyze the challenges of maintaining large-scale software systems.',
          difficulty: 'HARD' as const,
          keywords: ['large-scale systems', 'maintenance', 'technical debt', 'architecture', 'evolution']
        },
        {
          text: 'Discuss the future of quantum computing in software development.',
          difficulty: 'HARD' as const,
          keywords: ['quantum computing', 'software development', 'algorithms', 'quantum algorithms', 'future']
        },
        {
          text: 'How do you approach research in computer science?',
          difficulty: 'HARD' as const,
          keywords: ['research', 'computer science', 'methodology', 'innovation', 'scientific method']
        },
        {
          text: 'Explain the ethical implications of AI in software systems.',
          difficulty: 'HARD' as const,
          keywords: ['ethics', 'AI', 'software systems', 'bias', 'responsibility', 'society']
        },
        {
          text: 'Design a novel approach to solving computational complexity problems.',
          difficulty: 'HARD' as const,
          keywords: ['computational complexity', 'algorithms', 'optimization', 'innovative solutions', 'efficiency']
        }
      ]
    }
    
    // Create questions for this exam
    for (let i = 0; i < Math.min(sampleQuestions.length, courseData.totalQuestions); i++) {
      const questionData = sampleQuestions[i]
      await prisma.question.create({
        data: {
          text: questionData.text,
          difficulty: questionData.difficulty,
          keywords: JSON.stringify(questionData.keywords),
          examId: exam.id,
          order: i + 1
        }
      })
    }
    
    console.log(`Created ${Math.min(sampleQuestions.length, courseData.totalQuestions)} questions for exam: ${exam.title}`)
  }

  // Create some system settings
  const systemSettings = [
    {
      key: 'PASS_THRESHOLD',
      value: '60',
      description: 'Minimum percentage required to pass an exam'
    },
    {
      key: 'KEYWORD_MATCH_THRESHOLD',
      value: '0.6',
      description: 'Minimum confidence score for keyword matching'
    },
    {
      key: 'MAX_QUESTION_TIME',
      value: '300',
      description: 'Maximum time allowed per question in seconds'
    }
  ]

  for (const setting of systemSettings) {
    await prisma.systemSetting.create({
      data: setting
    })
  }

  console.log('Created system settings')
  console.log('🎉 Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })