import { ref, computed } from 'vue'

// Global role state
const currentRole = ref('seeker') // 'seeker' or 'helper'

export function useRole() {
  const toggleRole = () => {
    currentRole.value = currentRole.value === 'seeker' ? 'helper' : 'seeker'
    
    // Navigate to appropriate dashboard after role switch
    const targetPath = currentRole.value === 'helper' 
      ? '/pwa/helper/dashboard' 
      : '/pwa/seeker/dashboard'
    
    navigateTo(targetPath)
  }

  const getRoleBasedTitle = (basePage) => {
    const titles = {
      seeker: {
        dashboard: 'Nachbarschaftshilfe',
        tasks: 'Auftragshistorie',
        favorites: 'Favoriten',
        'task-create': 'Hilfe anfragen',
        profile: 'Mein Profil',
        news: 'Neuigkeiten',
        support: 'Support & Hilfe'
      },
      helper: {
        dashboard: 'Dashboard',
        tasks: 'Meine Aufträge',
        loyalty: 'Treueprogramm',
        earnings: 'Verdienste',
        news: 'Neuigkeiten',
        'news-publisher': 'News Publisher',
        support: 'Support & Hilfe',
        profile: 'Mein Profil'
      }
    }
    
    return titles[currentRole.value][basePage] || basePage
  }

  const getRoleBasedNavigation = (tab) => {
    const navigation = {
      seeker: {
        dashboard: '/pwa/seeker/dashboard',
        tasks: '/pwa/seeker/history',
        favorites: '/pwa/seeker/favorites',
        'task-create': '/pwa/seeker/task-create',
        profile: '/pwa/shared/profile',
        news: '/pwa/shared/news',
        support: '/pwa/shared/support'
      },
      helper: {
        dashboard: '/pwa/helper/dashboard',
        tasks: '/pwa/helper/tasks',
        loyalty: '/pwa/helper/loyalty',
        earnings: '/pwa/helper/earnings',
        news: '/pwa/shared/news',
        'news-publisher': '/pwa/helper/news-publisher',
        support: '/pwa/shared/support',
        profile: '/pwa/shared/profile'
      }
    }
    
    return navigation[currentRole.value][tab]
  }

  const getRequestButtonAction = () => {
    return currentRole.value === 'helper' 
      ? () => navigateTo('/pwa/helper/dashboard')
      : () => navigateTo('/pwa/seeker/task-create')
  }

  const getNewsAction = () => {
    return () => navigateTo('/pwa/shared/news')
  }

  // Detect current role from URL
  const detectRoleFromPath = (path) => {
    if (path.includes('/pwa/helper/')) {
      currentRole.value = 'helper'
    } else if (path.includes('/pwa/seeker/')) {
      currentRole.value = 'seeker'
    }
  }

  return {
    currentRole: computed(() => currentRole.value),
    toggleRole,
    getRoleBasedTitle,
    getRoleBasedNavigation,
    getRequestButtonAction,
    getNewsAction,
    detectRoleFromPath
  }
}