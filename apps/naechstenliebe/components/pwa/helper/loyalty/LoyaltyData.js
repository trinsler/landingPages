// Mock user data
export const userStats = {
  totalPoints: 2450,
  completedTasks: 87,
  currentStreak: 12,
  avgRating: 4.8
}

// User current tier
export const userTier = {
  level: 'GOLD',
  name: 'Gold Helfer',
  description: 'Verlässlicher Helfer mit exzellenten Bewertungen',
  minPoints: 2000,
  benefits: [
    {
      id: 1,
      title: '10% Bonus auf alle Aufträge',
      description: 'Zusätzliche 10% Aufschlag auf jeden abgeschlossenen Auftrag'
    },
    {
      id: 2,
      title: 'Prioritärer Kundensupport',
      description: 'Schnellere Antwortzeiten bei Support-Anfragen'
    },
    {
      id: 3,
      title: 'Exklusive Aufträge',
      description: 'Zugriff auf Premium-Aufträge mit höherer Bezahlung'
    },
    {
      id: 4,
      title: 'Flexible Stornierung',
      description: 'Kostenfreie Stornierung bis 2 Stunden vor Auftragsbeginn'
    }
  ]
})

// All available tiers
export const allTiers = [
  {
    level: 'BRONZE',
    name: 'Bronze Helfer',
    description: 'Neue Helfer am Anfang ihrer Reise',
    minPoints: 0
  },
  {
    level: 'SILVER',
    name: 'Silber Helfer',
    description: 'Erfahrene Helfer mit guten Bewertungen',
    minPoints: 500
  },
  {
    level: 'GOLD',
    name: 'Gold Helfer',
    description: 'Verlässlicher Helfer mit exzellenten Bewertungen',
    minPoints: 2000
  },
  {
    level: 'PLATINUM',
    name: 'Platin Helfer',
    description: 'Top-Helfer mit herausragendem Service',
    minPoints: 5000
  }
])

// Recent achievements
export const recentAchievements = [
  {
    id: 1,
    title: 'Erster Gold-Auftrag',
    description: 'Als Gold Helfer ersten Auftrag abgeschlossen',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`,
    date: '2024-01-14'
  },
  {
    id: 2,
    title: '10-Auftrags-Serie',
    description: '10 Aufträge hintereinander pünktlich erledigt',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
    </svg>`,
    date: '2024-01-12'
  },
  {
    id: 3,
    title: '5.0 Sterne Woche',
    description: 'Eine Woche lang nur 5-Sterne-Bewertungen erhalten',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>`,
    date: '2024-01-10'
  }
])

// Active challenges
export const activeChallenges = [
  {
    id: 1,
    title: 'Auftrags-Meister',
    description: 'Schließen Sie 100 Aufträge insgesamt ab',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>`,
    points: 500,
    current: 87,
    target: 100
  },
  {
    id: 2,
    title: 'Wochen-Champion',
    description: 'Erreichen Sie 15 abgeschlossene Aufträge in einer Woche',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>`,
    points: 250,
    current: 8,
    target: 15
  },
  {
    id: 3,
    title: 'Perfekt bewertet',
    description: 'Erhalten Sie 50 5-Sterne-Bewertungen',
    icon: `<svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>`,
    points: 300,
    current: 42,
    target: 50
  }
])

export const getTierDisplayName = (level) => {
  const tierNames = {
    'BRONZE': 'Bronze',
    'SILVER': 'Silber', 
    'GOLD': 'Gold',
    'PLATINUM': 'Platin'
  }
  return tierNames[level] || level
}