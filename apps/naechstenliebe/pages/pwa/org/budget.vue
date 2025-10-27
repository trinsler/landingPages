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
        <h1 style="color: white; font-size: 1.25rem; font-weight: 700; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Budget verwalten</h1>
        <div style="width: 2.5rem;"></div>
      </div>
    </header>

    <div style="max-width: 80rem; margin: 0 auto; padding: 1.5rem; position: relative;">
      <!-- Budget Overview - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">Sponsoring-Budget</h2>
          <p style="color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Verwalten Sie Ihr Budget für gesponserte Hilfsleistungen</p>
        </div>

        <!-- Budget Stats -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
          <div style="text-align: center; padding: 1.5rem; background: rgba(95,111,85,0.1); border: 2px solid #5F6F55; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #5F6F55; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ budget.available }}€</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Verfügbar</div>
          </div>
          
          <div style="text-align: center; padding: 1.5rem; background: rgba(143,166,110,0.1); border: 2px solid #8FA66E; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #8FA66E; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ budget.used }}€</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Diesen Monat ausgegeben</div>
          </div>
          
          <div style="text-align: center; padding: 1.5rem; background: rgba(190,205,163,0.1); border: 2px solid #BECDA3; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <div style="font-size: 2.5rem; font-weight: 700; color: #BECDA3; margin-bottom: 0.5rem; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ budget.total }}€</div>
            <div style="font-size: 1rem; color: #474747; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif;">Gesamtbudget</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; transform: rotate(0.5deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.1); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <button 
            @click="addBudget"
            style="background: #5F6F55; color: white; padding: 1rem 2rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            + Budget aufladen
          </button>
          <button 
            @click="downloadReport"
            style="background: #BECDA3; color: #474747; padding: 1rem 2rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 4px 4px 0px rgba(0,0,0,0.2); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-2px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Bericht herunterladen
          </button>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">Zeitraum:</span>
            <select v-model="selectedPeriod" style="padding: 0.5rem; border: 2px solid #BECDA3; background: white; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.1);">
              <option value="month">Dieser Monat</option>
              <option value="quarter">Dieses Quartal</option>
              <option value="year">Dieses Jahr</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Budget Usage Progress - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(-0.5deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1); margin-bottom: 2rem;">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0 0 1.5rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Budget-Verwendung</h3>
        
        <!-- Progress Bar -->
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.9rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ budget.used }}€ von {{ budget.total }}€ verwendet</span>
            <span style="font-size: 0.9rem; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ Math.round((budget.used / budget.total) * 100) }}%</span>
          </div>
          <div style="width: 100%; height: 2rem; background: #f5f5f5; border: 2px solid #BECDA3; position: relative; overflow: hidden;">
            <div :style="'width: ' + Math.min((budget.used / budget.total) * 100, 100) + '%; height: 100%; background: linear-gradient(to right, #5F6F55, #8FA66E); transition: width 0.3s;'"></div>
          </div>
        </div>

        <!-- Budget Categories -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <div 
            v-for="category in budgetCategories" 
            :key="category.name"
            style="border: 2px solid #BECDA3; padding: 1rem; background: rgba(255,255,255,0.7); box-shadow: 2px 2px 0px rgba(0,0,0,0.1);"
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-weight: 600; color: #474747; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.name }}</span>
              <span style="font-weight: 700; color: #5F6F55; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.amount }}€</span>
            </div>
            <div style="font-size: 0.9rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ category.tasks }} Aufträge</div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions - Paper style -->
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; transform: rotate(1deg); box-shadow: 6px 6px 0px rgba(0,0,0,0.15); position: relative; backdrop-filter: blur(3px); border: 1px solid rgba(71,71,71,0.1);">
        <!-- Torn corner -->
        <div style="position: absolute; top: 0; right: 0; width: 25px; height: 25px; background: #f5f5f5; clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: 700; color: #474747; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">Letzte Transaktionen</h3>
          <button 
            @click="viewAllTransactions"
            style="background: #8FA66E; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; font-size: 0.9rem; font-weight: 500; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 0px rgba(0,0,0,0.15); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            Alle anzeigen
          </button>
        </div>
        
        <div v-if="recentTransactions.length > 0" style="display: flex; flex-direction: column; gap: 1rem;">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            style="border: 1px solid #BECDA3; padding: 1rem; background: rgba(255,255,255,0.5); box-shadow: 2px 2px 0px rgba(0,0,0,0.1); transition: transform 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'"
          >
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div :style="'width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 2px 2px 0px rgba(0,0,0,0.1); background: ' + getTransactionColor(transaction.type) + ';'">
                  <svg style="width: 1.25rem; height: 1.25rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="transaction.type === 'expense'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
                </div>
                <div>
                  <h4 style="font-weight: 600; color: #474747; margin: 0 0 0.25rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ transaction.description }}</h4>
                  <p style="font-size: 0.9rem; color: #8F8B82; margin: 0; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ transaction.category }} • {{ transaction.date }}</p>
                </div>
              </div>
              <div style="text-align: right;">
                <div :style="'font-size: 1.1rem; font-weight: 700; font-family: Comic Sans MS, cursive, sans-serif; color: ' + (transaction.type === 'income' ? '#5F6F55' : '#8F8B82') + ';'">
                  {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount }}€
                </div>
                <div style="font-size: 0.8rem; color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif;">{{ transaction.status }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else style="text-align: center; padding: 2rem;">
          <div style="width: 4rem; height: 4rem; background: #BECDA3; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 3px 3px 0px rgba(0,0,0,0.1);">
            <svg style="width: 2rem; height: 2rem; color: #474747;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <p style="color: #8F8B82; font-family: 'Comic Sans MS', cursive, sans-serif; margin: 0;">Keine Transaktionen vorhanden</p>
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

const budget = ref({
  available: 2450,
  used: 1550,
  total: 4000
})

const budgetCategories = ref([
  { name: 'Einkaufen', amount: 680, tasks: 12 },
  { name: 'Hausarbeit', amount: 420, tasks: 8 },
  { name: 'Garten', amount: 310, tasks: 6 },
  { name: 'Technik-Hilfe', amount: 140, tasks: 3 }
])

const recentTransactions = ref([
  {
    id: 1,
    type: 'expense',
    description: 'Einkaufen für Elisabeth Weber',
    category: 'Einkaufen',
    amount: 15,
    date: 'vor 2h',
    status: 'Abgeschlossen'
  },
  {
    id: 2,
    type: 'income',
    description: 'Budget aufgeladen',
    category: 'Aufladung',
    amount: 500,
    date: 'vor 1 Tag',
    status: 'Bestätigt'
  },
  {
    id: 3,
    type: 'expense',
    description: 'Garten pflegen - Klaus Müller',
    category: 'Garten',
    amount: 25,
    date: 'vor 2 Tagen',
    status: 'Abgeschlossen'
  },
  {
    id: 4,
    type: 'expense',
    description: 'Wohnung reinigen - Anna Schmidt',
    category: 'Hausarbeit',
    amount: 20,
    date: 'vor 3 Tagen',
    status: 'Abgeschlossen'
  }
])

const goBack = () => {
  navigateTo('/pwa/org/dashboard')
}

const addBudget = () => {
  // TODO: Open budget top-up modal
  console.log('Adding budget...')
}

const downloadReport = () => {
  // TODO: Generate and download budget report
  console.log('Downloading report...')
}

const viewAllTransactions = () => {
  // TODO: Navigate to detailed transaction history
  console.log('Viewing all transactions...')
}

const getTransactionColor = (type) => {
  return type === 'income' ? '#5F6F55' : '#8F8B82'
}
</script>