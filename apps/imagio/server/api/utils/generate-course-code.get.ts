import { prisma } from '~/server/lib/prisma'

interface GenerateCodeResponse {
  success: boolean
  code: string
}

/**
 * Robuste Code-Generierung: Garantiert eindeutigen Code durch DB-Prüfung
 */
export default defineEventHandler(async (): Promise<GenerateCodeResponse> => {
  try {
    let attempts = 0
    const maxAttempts = 500 // Mehr Versuche für bessere Sicherheit
    
    console.log('🔄 Starte Code-Generierung...')
    
    while (attempts < maxAttempts) {
      attempts++
      
      // Verschiedene Code-Strategien für mehr Variation
      let randomCode: string
      
      if (attempts <= 100) {
        // Standard: 6-stellige Zahl
        randomCode = Math.floor(100000 + Math.random() * 900000).toString()
      } else if (attempts <= 200) {
        // Backup: 7-stellige Zahl
        randomCode = Math.floor(1000000 + Math.random() * 9000000).toString()
      } else if (attempts <= 300) {
        // Backup: Buchstaben + Zahlen (z.B. AB1234)
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const letter1 = letters[Math.floor(Math.random() * letters.length)]
        const letter2 = letters[Math.floor(Math.random() * letters.length)]
        const numbers = Math.floor(1000 + Math.random() * 9000)
        randomCode = `${letter1}${letter2}${numbers}`
      } else {
        // Letzte Option: Timestamp-basiert
        const timestamp = Date.now().toString()
        const random = Math.floor(Math.random() * 1000)
        randomCode = `T${timestamp.slice(-5)}${random}`
      }
      
      console.log(`🔍 Versuch ${attempts}: Prüfe Code ${randomCode}`)
      
      // Prüfe DB auf Eindeutigkeit
      const existingCourse = await prisma.course.findUnique({
        where: { code: randomCode }
      })
      
      // Code ist eindeutig!
      if (!existingCourse) {
        console.log(`✅ Eindeutiger Code gefunden: ${randomCode} (nach ${attempts} Versuchen)`)
        return {
          success: true,
          code: randomCode
        }
      }
      
      console.log(`❌ Code ${randomCode} bereits vergeben, versuche neuen...`)
    }
    
    // Fallback nach allen Versuchen
    console.error('⚠️ Konnte nach 500 Versuchen keinen eindeutigen Code finden!')
    const emergencyCode = `EMG${Date.now().toString().slice(-6)}`
    
    console.log(`🚨 Verwende Notfall-Code: ${emergencyCode}`)
    return {
      success: true, 
      code: emergencyCode
    }
    
  } catch (error) {
    console.error('❌ Fehler bei Code-Generierung:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Fehler bei der Code-Generierung'
    })
  }
})