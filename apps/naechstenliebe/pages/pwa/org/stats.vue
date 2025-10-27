<template>
  <div style="min-height: 100vh; background: #f5f5f5; font-family: 'Comic Sans MS', cursive, sans-serif;">
    <!-- Header -->
    <header style="position: sticky; top: 0; z-index: 50; background: #474747; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;">
        <button @click="goBack" style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
          <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Statistiken & Analysen</h1>
        <button @click="exportStats" style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
          <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </button>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Period Selector - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; transform: rotate(-1deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
          <span style="font-size: 1rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Zeitraum:</span>
          <button 
            v-for="period in periods" 
            :key="period.value"
            @click="selectedPeriod = period.value"
            :style="'padding: 0.75rem 1.5rem; border: 2px solid ' + (selectedPeriod === period.value ? '#474747' : '#BECDA3') + '; background: ' + (selectedPeriod === period.value ? '#474747' : 'rgba(255,255,255,0.8)') + '; color: ' + (selectedPeriod === period.value ? 'white' : '#474747') + '; cursor: pointer; transition: all 0.3s; font-family: Comic Sans MS, cursive, sans-serif; font-weight: 600; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);'"
            onmouseover="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#5F6F55'; }"
            onmouseout="if (this.dataset.notSelected !== 'false') { this.style.borderColor='#BECDA3'; }"
            :data-not-selected="selectedPeriod !== period.value"
          >
            {{ period.label }}
          </button>
        </div>
      </div>

      <!-- Key Metrics - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 1.5rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif; text-align: center;">Leistungsübersicht {{ getCurrentPeriodLabel() }}</h2>
        
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
          <div style="text-align: center; padding: 2rem 1rem; background: rgba(95,111,85,0.1); border: 2px solid #5F6F55; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(-1deg);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ currentStats.completedTasks }}</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Erledigte Aufträge</div>
            <div :style="'font-size: 0.9rem; font-family: Comic Sans MS, cursive, sans-serif; color: ' + (currentStats.taskGrowth >= 0 ? '#5F6F55' : '#8F8B82') + ';'">
              {{ currentStats.taskGrowth >= 0 ? '+' : '' }}{{ currentStats.taskGrowth }}% vs. letzter Zeitraum
            </div>
          </div>
          
          <div style="text-align: center; padding: 2rem 1rem; background: rgba(143,166,110,0.1); border: 2px solid #8FA66E; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(0.5deg);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #8FA66E; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ currentStats.activeHelpers }}</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Aktive Helfer</div>
            <div :style="'font-size: 0.9rem; font-family: Comic Sans MS, cursive, sans-serif; color: ' + (currentStats.helperGrowth >= 0 ? '#5F6F55' : '#8F8B82') + ';'">
              {{ currentStats.helperGrowth >= 0 ? '+' : '' }}{{ currentStats.helperGrowth }}% Aktivität
            </div>
          </div>
          
          <div style="text-align: center; padding: 2rem 1rem; background: rgba(190,205,163,0.1); border: 2px solid #BECDA3; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(-0.5deg);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ currentStats.satisfaction }}%</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Zufriedenheit</div>
            <div style="font-size: 0.9rem; color: #8FA66E; font-family: 'Comic Sans MS', cursive, sans-serif;">
              ⭐ {{ currentStats.avgRating }} Durchschnitt
            </div>
          </div>
          
          <div style="text-align: center; padding: 2rem 1rem; background: rgba(71,71,71,0.1); border: 2px solid #474747; box-shadow: 3px 3px 0px rgba(0,0,0,0.1); transform: rotate(1deg);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #474747; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ currentStats.responseTime }}h</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; margin-bottom: 0.25rem; font-family: 'Comic Sans MS', cursive, sans-serif;">Ø Reaktionszeit</div>
            <div :style="'font-size: 0.9rem; font-family: Comic Sans MS, cursive, sans-serif; color: ' + (currentStats.responseImprovement >= 0 ? '#5F6F55' : '#8F8B82') + ';'">
              {{ currentStats.responseImprovement >= 0 ? 'Verbessert um ' : 'Verschlechtert um ' }}{{ Math.abs(currentStats.responseImprovement) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Top Helpers - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">🏆 Top-Helfer {{ getCurrentPeriodLabel() }}</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div 
            v-for="(helper, index) in topHelpers" 
            :key="helper.id"
            :style="'padding: 1.5rem; border: 2px solid #BECDA3; background: rgba(255,255,255,0.7); box-shadow: 3px 3px 0px rgba(0,0,0,0.1); position: relative; transform: rotate(' + (index % 2 === 0 ? '-0.5deg' : '0.5deg') + ');'"
          >
            <!-- Ranking Badge -->
            <div :style="'position: absolute; top: -8px; left: -8px; width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: Comic Sans MS, cursive, sans-serif; color: white; font-size: 0.9rem; background: ' + getRankingColor(index + 1) + '; box-shadow: 2px 2px 0px rgba(0,0,0,0.2);'">
              {{ index + 1 }}
            </div>
            
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img src="/icons/verschiedeneMenschen.svg" alt="Profil" style="width: 1.5rem; height: 1.5rem;">
              </div>
              <div>
                <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.name }}</h4>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.skills.join(', ') }}</div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
              <div style="text-align: center; padding: 0.5rem; background: rgba(95,111,85,0.1); border: 1px solid #5F6F55;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #5F6F55; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.completedTasks }}</div>
                <div style="font-size: 0.7rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">Aufträge</div>
              </div>
              <div style="text-align: center; padding: 0.5rem; background: rgba(143,166,110,0.1); border: 1px solid #8FA66E;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #8FA66E; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ helper.rating }}⭐</div>
                <div style="font-size: 0.7rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">Bewertung</div>
              </div>
            </div>
            
            <div style="text-align: center;">
              <span style="background: #5F6F55; color: white; padding: 0.25rem 0.75rem; font-size: 0.8rem; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 1px 1px 0px rgba(0,0,0,0.1);">
                {{ helper.totalEarnings }}€ verdient
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Categories - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(0.8deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">📊 Meist nachgefragte Hilfe</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          <div 
            v-for="category in serviceCategories" 
            :key="category.name"
            style="border: 2px solid #BECDA3; padding: 1.5rem; background: rgba(255,255,255,0.7); box-shadow: 3px 3px 0px rgba(0,0,0,0.1);"
          >
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 3rem; height: 3rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
                <img :src="category.icon" :alt="category.name" style="width: 1.5rem; height: 1.5rem;">
              </div>
              <div>
                <h4 style="font-weight: 600; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.name }}</h4>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.9rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.tasks }} Aufträge</span>
                <span style="font-size: 0.9rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.percentage }}%</span>
              </div>
              <div style="width: 100%; height: 0.75rem; background: #f5f5f5; border: 1px solid #BECDA3; position: relative; overflow: hidden;">
                <div :style="'width: ' + category.percentage + '%; height: 100%; background: linear-gradient(to right, #5F6F55, #8FA66E); transition: width 0.3s;'"></div>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Ø {{ category.avgPrice }}€</span>
              <span style="font-size: 0.9rem; color: #5F6F55; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.satisfaction }}% zufrieden</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Overview - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.3deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">📈 Monatliche Entwicklung</h3>
          <button 
            @click="exportMonthlyReport"
            style="background: #8FA66E; color: white; padding: 0.75rem 1.5rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 3px 3px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Monatsreport herunterladen
          </button>
        </div>
        
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr style="background: #5F6F55; color: white;">
                <th style="padding: 1rem; text-align: left; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #474747;">Monat</th>
                <th style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #474747;">Aufträge</th>
                <th style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #474747;">Aktive Helfer</th>
                <th style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #474747;">Umsatz</th>
                <th style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #474747;">Zufriedenheit</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(month, index) in monthlyData" 
                :key="month.month"
                :style="'background: ' + (index % 2 === 0 ? 'rgba(190,205,163,0.1)' : 'rgba(255,255,255,0.8)') + ';'"
              >
                <td style="padding: 1rem; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #BECDA3; font-weight: 600; color: #474747;">{{ month.month }}</td>
                <td style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #BECDA3; color: #474747;">{{ month.tasks }}</td>
                <td style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #BECDA3; color: #474747;">{{ month.helpers }}</td>
                <td style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #BECDA3; color: #5F6F55; font-weight: 600;">{{ month.revenue }}€</td>
                <td style="padding: 1rem; text-align: center; font-family: 'Comic Sans MS', cursive, sans-serif; border: 1px solid #BECDA3; color: #8FA66E; font-weight: 600;">{{ month.satisfaction }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Padding for content -->
    <div style="height: 2rem;"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const selectedPeriod = ref('month')

const periods = ref([
  { value: 'week', label: 'Diese Woche' },
  { value: 'month', label: 'Dieser Monat' },
  { value: 'quarter', label: 'Dieses Quartal' },
  { value: 'year', label: 'Dieses Jahr' }
])

const currentStats = ref({
  completedTasks: 67,
  taskGrowth: 12,
  activeHelpers: 18,
  helperGrowth: 8,
  satisfaction: 94,
  avgRating: 4.8,
  responseTime: 2.3,
  responseImprovement: 15
})

const topHelpers = ref([
  {
    id: 1,
    name: 'Anna Müller',
    skills: ['Einkaufen', 'Kochen'],
    completedTasks: 23,
    rating: 4.9,
    totalEarnings: 345
  },
  {
    id: 2,
    name: 'Tim Schmidt',
    skills: ['Technik', 'Garten'],
    completedTasks: 19,
    rating: 4.8,
    totalEarnings: 285
  },
  {
    id: 3,
    name: 'Lisa Weber',
    skills: ['Reinigung', 'Einkaufen'],
    completedTasks: 16,
    rating: 4.7,
    totalEarnings: 240
  }
])

const serviceCategories = ref([
  {
    name: 'Einkaufen',
    icon: '/icons/einkaufenMadl.svg',
    tasks: 28,
    percentage: 42,
    avgPrice: 15,
    satisfaction: 96
  },
  {
    name: 'Hausarbeit',
    icon: '/icons/staubsaugen.svg',
    tasks: 18,
    percentage: 27,
    avgPrice: 20,
    satisfaction: 92
  },
  {
    name: 'Garten',
    icon: '/icons/gießenBub.svg',
    tasks: 12,
    percentage: 18,
    avgPrice: 25,
    satisfaction: 89
  }
])

const monthlyData = ref([
  { month: 'Januar 2024', tasks: 45, helpers: 15, revenue: 675, satisfaction: 91 },
  { month: 'Februar 2024', tasks: 52, helpers: 16, revenue: 780, satisfaction: 93 },
  { month: 'März 2024', tasks: 61, helpers: 17, revenue: 915, satisfaction: 92 },
  { month: 'April 2024', tasks: 67, helpers: 18, revenue: 1005, satisfaction: 94 }
])

const getCurrentPeriodLabel = () => {
  const labels = {
    week: 'diese Woche',
    month: 'diesen Monat',
    quarter: 'dieses Quartal',
    year: 'dieses Jahr'
  }
  return labels[selectedPeriod.value] || 'diesen Monat'
}

const getRankingColor = (rank) => {
  const colors = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32'  // Bronze
  }
  return colors[rank] || '#8F8B82'
}

const goBack = () => {
  navigateTo('/pwa/org/dashboard')
}

const exportStats = () => {
  // TODO: Export statistics as CSV/PDF
  console.log('Exporting statistics...')
}

const exportMonthlyReport = () => {
  // TODO: Export detailed monthly report
  console.log('Exporting monthly report...')
}
</script>