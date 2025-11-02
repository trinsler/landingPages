<script setup>
import { ref, computed } from 'vue'

// Mock tasks data
export const useTaskData = () => {
  const acceptedTasks = ref([
    {
      id: 1,
      title: 'Wöchentlicher Einkauf für Frau Schmidt',
      client: 'Anna Schmidt, 68 Jahre',
      area: 'Winnweiler',
      distance: '0.3km',
      baseRate: 15.00,
      platformFee: 1.80,
      payment: 16.80,
      status: 'active',
      clientRating: 4.9,
      clientReviews: 28,
      clientVerified: true,
      responseTime: '5 Min',
      estimatedDuration: '1.5 Stunden',
      description: 'Regelmäßiger Einkauf für eine Seniorin. Leichter Einkauf inklusive Getränke und Grundnahrungsmittel.',
      specialRequirements: 'Kunde hat Gehprobleme, geduldiges Tempo erwünscht',
      recentReviews: [
        { 
          id: 1,
          rating: 5,
          comment: 'Sehr zuverlässig und immer pünktlich. Frau Schmidt ist sehr zufrieden.',
          date: '2024-01-14',
          reviewer: 'Max Mustermann'
        },
        {
          id: 2,
          rating: 5,
          comment: 'Hilfsbereit und freundlich. Kommt allen Wünschen nach.',
          date: '2024-01-12',
          reviewer: 'Anna Schmidt'
        }
      ],
      clientPersona: {
        name: 'Anna Schmidt',
        age: 68,
        rating: 4.9,
        reviews: 28,
        verified: true,
        responseTime: '5 Min',
        description: 'Seniorin, die auf Unterstützung beim wöchentlichen Einkauf angewiesen ist. Wohnt in einer Erdgeschosswohnung mit wenigen Stufen. Sehr aufmerksam und dankbar für gute Hilfe.'
      }
    },
    {
      id: 2,
      title: 'Technik-Support für Herrn Meier',
      client: 'Hans Meier, 75 Jahre',
      area: 'Rockenhausen',
      distance: '4.8km',
      baseRate: 20.00,
      platformFee: 2.40,
      payment: 22.40,
      status: 'active',
      clientRating: 4.7,
      clientReviews: 19,
      clientVerified: true,
      responseTime: '15 Min',
      estimatedDuration: '2 Stunden',
      description: 'Einrichtung und Unterstützung bei der Nutzung von Smartphone und Tablet. E-Mail-Konfiguration und Videoanrufe einrichten.',
      specialRequirements: 'Geduld und einfache Erklärungen wichtig, Kunde ist nicht sehr technikversiert.',
      recentReviews: [
        {
          id: 1,
          rating: 4,
          comment: 'Gute Erklärungen, aber manchmal etwas schnell. Herr Meier versteht die Grundlagen jetzt gut.',
          date: '2024-01-13',
          reviewer: 'Julia Bauer'
        }
      ],
      clientPersona: {
        name: 'Hans Meier',
        age: 75,
        rating: 4.7,
        reviews: 19,
        verified: true,
        responseTime: '15 Min',
        description: 'Senior, der lernen möchte, moderne Technologie zu nutzen. Hat Schwierigkeiten mit komplexen Menüs und kleinen Touchscreen-Elementen.'
      }
    },
    {
      id: 3,
      title: 'Kochen für Familie Weber',
      client: 'Familie Weber',
      area: 'Imsweiler',
      distance: '3.2km',
      baseRate: 18.00,
      platformFee: 2.16,
      payment: 20.16,
      status: 'completed',
      clientRating: 5.0,
      clientReviews: 12,
      clientVerified: true,
      responseTime: '30 Min',
      estimatedDuration: '2.5 Stunden',
      description: 'Vorkochen für die Familie Weber. Einfache, gesunde Gerichte für 3 Personen. Kochen bereits vorhandener Zutaten.',
      specialRequirements: 'Allergien beachten: Nuss- und Laktoseintoleranz bei einem Kind.',
      recentReviews: [
        {
          id: 1,
          rating: 5,
          comment: 'Exzellent gekocht und sehr saubere Arbeitsweise. Familie Weber ist begeistert.',
          date: '2024-01-11',
          reviewer: 'Family Weber'
        }
      ],
      clientPersona: {
        name: 'Familie Weber',
        rating: 5.0,
        reviews: 12,
        verified: true,
        responseTime: '30 Min',
        description: 'Familie mit Kindern, die auf gesunde, selbst gekochte Mahlzeiten angewiesen ist. Wertet auf Qualität und Sauberkeit.'
      }
    },
    {
      id: 4,
      title: 'Gartenpflege bei Herrn Richter',
      client: 'Karl Richter, 79 Jahre',
      area: 'Bischweiler',
      distance: '6.5km',
      baseRate: 22.00,
      platformFee: 2.64,
      payment: 24.64,
      status: 'active',
      clientRating: 4.8,
      clientReviews: 35,
      clientVerified: true,
      responseTime: '1 Stunde',
      estimatedDuration: '3 Stunden',
      description: 'Saisonale Gartenpflege: Rasenmähen, Hecken schneiden, Unkraut entfernen und Pflanzen pflegen. Großer Garten ca. 300m².',
      specialRequirements: 'Erfahrung mit Gartengeräten erforderlich. Körperliche Fitness wichtig.',
      recentReviews: [
        {
          id: 1,
          rating: 5,
          comment: 'Perfekte Gartenpflege, sehr zuverlässig und pünktlich. Herr Richter ist sehr zufrieden.',
          date: '2024-01-14',
          reviewer: 'Karl Richter'
        }
      ],
      clientPersona: {
        name: 'Karl Richter',
        age: 79,
        rating: 4.8,
        reviews: 35,
        verified: true,
        responseTime: '1 Stunde',
        description: 'Rentner mit großer Erfahrung im Gartenbau, der aufgrund von körperlichen Einschränkungen Unterstützung bei der Gartenpflege benötigt.'
      }
    },
    {
      id: 5,
      title: 'Hund Gassi führen für Sabine Klein',
      client: 'Sabine Klein, 45 Jahre',
      area: 'Falkenstein',
      distance: '7.8km',
      baseRate: 10.00,
      platformFee: 1.20,
      payment: 11.20,
      status: 'waiting',
      clientRating: 4.6,
      clientReviews: 18,
      clientVerified: true,
      responseTime: '5 Min',
      estimatedDuration: '45 Minuten',
      description: 'Täglicher Spaziergang mit Golden Retriever (3 Jahre). Ruhige Strecken im nahegelegenen Waldgebiet.',
      specialRequirements: 'Erfahrung mit Hunden, insbesondere großen Rassen. Tierliebe erforderlich.',
      recentReviews: [
        {
          id: 1,
          rating: 4,
          comment: 'Zuverlässig und gut mit Tieren. Manchmal ein bisschen unpünktlich, aber insgesamt sehr zufrieden.',
          date: '2024-01-10',
          reviewer: 'Sabine Klein'
        }
      ],
      clientPersona: {
        name: 'Sabine Klein',
        age: 45,
        rating: 4.6,
        reviews: 18,
        verified: true,
        responseTime: '5 Min',
        description: 'Berufstätige, die einen liebevollen Hundebesitzer für ihre täglichen Spaziergänge sucht. Flexible Termine gewünscht.'
      }
    }
  ])

  // Support issues data
  const supportIssues = [
    {
      id: 1,
      title: 'Kundenproblem',
      description: 'Unstimmigkeiten mit dem Kunden bezüglich Leistung oder Bezahlung',
      icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm2-4V5a2 2 0 00-2-2H5a2 2 0 00-2 2v4h10z"/>
      </svg>`
    },
    {
      id: 2,
      title: 'Bezahlungsproblem',
      description: 'Fragen oder Probleme mit der Auftragsbezahlung',
      icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>`
    },
    {
      id: 3,
      title: 'Sicherheitsproblem',
      description: 'Gefahr oder unsichere Situation beim Auftrag',
      icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>`
    },
    {
      id: 4,
      title: 'Technische Probleme',
      description: 'Probleme mit der App oder Plattform',
      icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>`
    }
  ]

  // Computed properties
  const availableJobsCount = computed(() => 
    acceptedTasks.value.filter(task => task.status === 'active').length
  )

  const statusFilters = computed((tasks = acceptedTasks.value) => [
    { 
      label: 'Alle', 
      value: 'all', 
      count: tasks.length 
    },
    { 
      label: 'Aktiv', 
      value: 'active', 
      count: tasks.filter(task => task.status === 'active').length 
    },
    { 
      label: 'Abgeschlossen', 
      value: 'completed', 
      count: tasks.filter(task => task.status === 'completed').length 
    },
    { 
      label: 'Wartend', 
      value: 'waiting', 
      count: tasks.filter(task => task.status === 'waiting').length 
    },
    { 
      label: 'Storniert', 
      value: 'cancelled', 
      count: tasks.filter(task => task.status === 'cancelled').length 
    }
  ])

  const filteredTasks = computed((selectedStatusFilter = 'all', tasks = acceptedTasks.value) => {
    if (selectedStatusFilter === 'all') {
      return tasks
    }
    return tasks.filter(task => task.status === selectedStatusFilter)
  })

  const markTaskCompleted = (taskId) => {
    const taskIndex = acceptedTasks.value.findIndex(t => t.id === taskId)
    if (taskIndex !== -1) {
      acceptedTasks.value[taskIndex].status = 'completed'
    }
  }

  return {
    acceptedTasks,
    supportIssues,
    availableJobsCount,
    statusFilters,
    filteredTasks,
    markTaskCompleted
  }
}
</script>