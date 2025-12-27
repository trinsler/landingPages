import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

interface ReplaceCodeRequest {
  oldCode: string;
  newCode: string;
  confirmReplace?: boolean;
}

interface ReplaceCodeResponse {
  success: boolean;
  action: 'conflict_detected' | 'preview' | 'completed';
  message: string;
  conflictInfo?: {
    existingCourse: {
      id: string;
      code: string;
      title: string;
      questionCount: number;
    };
    targetCourse: {
      id: string; 
      code: string;
      title: string;
      questionCount: number;
    };
  };
  migration?: {
    questionsTransferred: number;
    oldCourseDeleted: boolean;
  };
}

export default defineEventHandler(async (event): Promise<ReplaceCodeResponse> => {
  const body = await readBody<ReplaceCodeRequest>(event)
  
  if (!body.oldCode || !body.newCode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Alter und neuer Kurscode sind erforderlich'
    })
  }

  if (body.oldCode === body.newCode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Alter und neuer Code sind identisch'
    })
  }

  try {
    // Finde beide Kurse
    const [oldCourse, existingNewCourse] = await Promise.all([
      prisma.course.findUnique({
        where: { code: body.oldCode },
        include: { 
          exam: {
            include: { questions: true }
          }
        }
      }),
      prisma.course.findUnique({
        where: { code: body.newCode },
        include: { 
          exam: {
            include: { questions: true }
          }
        }
      })
    ])

    // Prüfe ob alter Kurs existiert
    if (!oldCourse) {
      throw createError({
        statusCode: 404,
        statusMessage: `Kurs mit Code "${body.oldCode}" nicht gefunden`
      })
    }

    // Wenn neuer Code bereits existiert - NICHT erlauben, anderen Kurs zu überschreiben
    if (existingNewCourse) {
      throw createError({
        statusCode: 409,
        statusMessage: `Code "${body.newCode}" wird bereits von einem anderen Kurs verwendet. Bitte generiere einen anderen Code.`
      })
    }

    // Einfacher Fall: Ändere nur den Code
    await prisma.course.update({
      where: { id: oldCourse.id },
      data: { code: body.newCode }
    })

    return {
      success: true,
      action: 'completed',
      message: `Kurs erfolgreich von "${body.oldCode}" zu "${body.newCode}" aktualisiert`,
      migration: {
        questionsTransferred: oldCourse.exam?.questions?.length || 0,
        oldCourseDeleted: false
      }
    }

  } catch (error) {
    console.error('Error replacing course code:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `Fehler beim Ersetzen des Kurscodes: ${error.message}`
    })
  }
})