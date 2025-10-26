<template>
  <div class="min-h-screen bg-custom-white overflow-x-hidden">
    <!-- Creative Navigation Header -->
    <header class="fixed top-0 w-full bg-custom-white/90 backdrop-blur-sm z-50 border-b border-custom-secondary/10">
      <nav class="container mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-24">
          <!-- Artistic Logo -->
          <div class="flex items-center space-x-4">
            <div class="relative group">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300">
                <span class="text-custom-white font-bold text-lg">BC</span>
              </div>
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span class="text-xl font-light text-custom-primary tracking-wider">BetterClassroom</span>
          </div>
          
          <!-- Creative Navigation -->
          <div class="hidden lg:flex items-center space-x-16">
            <NuxtLink to="/home" class="text-custom-primary hover:text-custom-secondary transition-all duration-300 font-light tracking-wide relative group">
              Home
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-secondary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/features" class="text-custom-primary hover:text-custom-secondary transition-all duration-300 font-light tracking-wide relative group">
              Entdecken
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-secondary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/about" class="text-custom-primary hover:text-custom-secondary transition-all duration-300 font-light tracking-wide relative group">
              Geschichte
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-secondary transition-all duration-300 group-hover:w-full"></div>
            </NuxtLink>
            <NuxtLink to="/contact" class="relative group">
              <div class="px-8 py-3 bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white rounded-full hover:shadow-lg transition-all duration-300 font-light tracking-wide overflow-hidden">
                <span class="relative z-10">Loslegen</span>
                <div class="absolute inset-0 bg-gradient-to-r from-custom-secondary to-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Creative Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-custom-primary group">
            <div class="space-y-1.5">
              <div class="w-8 h-0.5 bg-custom-primary transition-all duration-300" :class="mobileMenuOpen ? 'rotate-45 translate-y-2' : ''"></div>
              <div class="w-8 h-0.5 bg-custom-primary transition-all duration-300" :class="mobileMenuOpen ? 'opacity-0' : ''"></div>
              <div class="w-8 h-0.5 bg-custom-primary transition-all duration-300" :class="mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"></div>
            </div>
          </button>
        </div>
        
        <!-- Creative Mobile Menu -->
        <div v-if="mobileMenuOpen" class="lg:hidden py-8 border-t border-custom-secondary/10">
          <div class="flex flex-col space-y-6 text-lg">
            <NuxtLink to="/home" class="text-custom-primary font-light tracking-wide">Home</NuxtLink>
            <NuxtLink to="/features" class="text-custom-primary font-light tracking-wide">Entdecken</NuxtLink>
            <NuxtLink to="/about" class="text-custom-primary font-light tracking-wide">Geschichte</NuxtLink>
            <NuxtLink to="/contact" class="bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white px-8 py-3 rounded-full inline-block text-center font-light tracking-wide">Loslegen</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section - Creative Feature Introduction -->
    <main class="relative pt-40 lg:pt-48 pb-20 lg:pb-32 overflow-hidden">
      <!-- Artistic Background -->
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-custom-primary/10 to-custom-secondary/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-custom-secondary/10 to-custom-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-6 lg:px-8 relative">
        <div class="text-center space-y-12 max-w-5xl mx-auto">
          <!-- Creative Badge -->
          <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-secondary/20 to-custom-primary/10 backdrop-blur-sm rounded-full px-8 py-4 border border-custom-secondary/20">
            <div class="w-3 h-3 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full animate-pulse"></div>
            <span class="text-custom-primary font-medium text-sm tracking-wide">Werkzeuge für moderne Lehre</span>
          </div>
          
          <!-- Artistic Headline -->
          <h1 class="text-6xl lg:text-8xl font-bold text-custom-primary leading-tight tracking-tight">
            Mehr als nur
            <br>
            <span class="text-5xl lg:text-7xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">Funktionen</span>
          </h1>
          
          <!-- Story Subtitle -->
          <p class="text-xl lg:text-2xl text-custom-primary/70 leading-relaxed font-light max-w-3xl mx-auto">
            Keine komplizierten Bedienungen. Keine endlosen Einstellungen. 
            <span class="font-medium text-custom-primary">Nur Werkzeuge, die wirklich funktionieren.</span>
          </p>
          
          <!-- Feature Preview Images -->
          <div class="flex flex-wrap justify-center items-center gap-8 pt-8">
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                📚
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Lehre</div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                🎯
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Interaktion</div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                ✨
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Einfachheit</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Creative Feature Showcase - Asymmetrical Layout -->
    <section class="py-32 lg:py-48 relative">
      <!-- Artistic Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-custom-white via-custom-secondary/5 to-custom-primary/5"></div>
      
      <div class="container mx-auto px-6 lg:px-8 relative">
        <!-- Feature Section 1 - Digital Meldungen -->
        <div class="grid lg:grid-cols-12 gap-16 items-center mb-32">
          <div class="lg:col-span-5 lg:col-start-1">
            <div class="space-y-8">
              <div class="relative inline-block">
                <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-secondary rounded-full"></div>
                <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                  Stille Fragen
                </h2>
              </div>
              
              <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                Kein Händeheben mehr. Kein Nervosität. 
                Nur ein Klick und die Frage ist da. 
                Einfach. Unkompliziert. Effektiv.
              </p>
              
              <!-- Visual Feature Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/assets/boyListening.jpg" 
                    alt="Student konzentriert sich - digitale Interaktion"
                    class="w-full h-32 object-cover rounded-2xl"
                  />
                </div>
                <div class="transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/assets/studentWithIpad.jpg" 
                    alt="Student mit iPad - moderne Lernmethoden"
                    class="w-full h-32 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-6 lg:col-start-8">
            <!-- Main Feature Visual -->
            <div class="relative">
              <div class="bg-gradient-to-br from-custom-primary to-custom-secondary rounded-3xl p-12 text-custom-white">
                <div class="space-y-6">
                  <div class="w-16 h-16 bg-custom-white/20 rounded-2xl flex items-center justify-center">
                    <span class="text-3xl">👋</span>
                  </div>
                  <h3 class="text-3xl font-bold">Digitale Wortmeldungen</h3>
                  <p class="text-lg font-light opacity-90">
                    Einfach. Schnell. Diskret. 
                    So wie es sein sollte.
                  </p>
                </div>
              </div>
              
              <!-- Floating Elements -->
              <div class="absolute -top-4 -right-4 w-24 h-24 bg-custom-secondary/20 rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500"></div>
              <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-custom-primary/20 rounded-full transform -rotate-6 hover:rotate-0 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        <!-- Feature Section 2 - Dashboard -->
        <div class="grid lg:grid-cols-12 gap-16 items-center mb-32">
          <div class="lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <!-- Dashboard Visual -->
            <div class="relative">
              <div class="bg-custom-secondary/10 rounded-3xl p-8 border border-custom-secondary/20">
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-custom-white rounded-2xl p-4">
                    <div class="text-3xl font-bold text-custom-primary">12</div>
                    <div class="text-sm text-custom-primary/60">Aktive Meldungen</div>
                  </div>
                  <div class="bg-custom-white rounded-2xl p-4">
                    <div class="text-3xl font-bold text-custom-primary">24</div>
                    <div class="text-sm text-custom-primary/60">Studenten</div>
                  </div>
                  <div class="bg-gradient-to-br from-custom-primary to-custom-secondary rounded-2xl p-4 text-custom-white col-span-2">
                    <div class="text-2xl font-bold">Live Dashboard</div>
                    <div class="text-sm opacity-80">Alles auf einen Blick</div>
                  </div>
                </div>
              </div>
              
              <!-- Floating Decorations -->
              <div class="absolute top-8 right-8 w-16 h-16 bg-custom-primary/10 rounded-full animate-pulse"></div>
              <div class="absolute bottom-8 left-8 w-12 h-12 bg-custom-secondary/20 rounded-2xl transform rotate-45"></div>
            </div>
          </div>
          
          <div class="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <div class="space-y-8">
              <div class="relative inline-block">
                <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-primary rounded-full"></div>
                <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                  Alles im Blick
                </h2>
              </div>
              
              <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                Kein Chaos. Keine Überforderung. 
                Nur klare Übersicht. 
                Wer was will. Wer wann dran ist.
              </p>
              
              <!-- Simple Feature List -->
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white text-sm font-bold">✓</div>
                  <span class="text-custom-primary font-light">Live-Anzeige</span>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white text-sm font-bold">✓</div>
                  <span class="text-custom-primary font-light">Prioritäten</span>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white text-sm font-bold">✓</div>
                  <span class="text-custom-primary font-light">Einfachheit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Section 3 - Sitzplan -->
        <div class="grid lg:grid-cols-12 gap-16 items-center mb-32">
          <div class="lg:col-span-5 lg:col-start-1">
            <div class="space-y-8">
              <div class="relative inline-block">
                <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-secondary rounded-full"></div>
                <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                  Wer sitzt wo?
                </h2>
              </div>
              
              <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                Nicht mehr "Du da hinten". 
                Nicht mehr "Wer war das?". 
                Einfach sehen. Einfach wissen.
              </p>
              
              <!-- Interactive Element -->
              <div class="bg-custom-secondary/10 rounded-2xl p-6 border border-custom-secondary/20">
                <div class="grid grid-cols-3 gap-2">
                  <div class="aspect-square bg-custom-white rounded-lg flex items-center justify-center text-custom-primary font-bold text-sm">A1</div>
                  <div class="aspect-square bg-custom-white rounded-lg flex items-center justify-center text-custom-primary font-bold text-sm">A2</div>
                  <div class="aspect-square bg-gradient-to-br from-custom-primary to-custom-secondary rounded-lg flex items-center justify-center text-custom-white font-bold text-sm">A3</div>
                  <div class="aspect-square bg-custom-white rounded-lg flex items-center justify-center text-custom-primary font-bold text-sm">B1</div>
                  <div class="aspect-square bg-custom-white rounded-lg flex items-center justify-center text-custom-primary font-bold text-sm">B2</div>
                  <div class="aspect-square bg-custom-white rounded-lg flex items-center justify-center text-custom-primary font-bold text-sm">B3</div>
                </div>
                <div class="text-center mt-4 text-sm text-custom-primary/60 font-light">Interaktiver Sitzplan</div>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-6 lg:col-start-8">
            <!-- Classroom Visual -->
            <div class="relative">
              <img 
                src="/assets/seniorsstudents.jpg" 
                alt="Klassenzimmer - BetterClassroom in Aktion"
                class="w-full h-80 object-cover rounded-3xl border border-custom-secondary/20"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-custom-primary/60 via-transparent to-transparent rounded-3xl"></div>
              
              <!-- Overlay Info -->
              <div class="absolute bottom-8 left-8 bg-custom-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
                <div class="text-lg font-bold text-custom-primary mb-2">Intelligenter Sitzplan</div>
                <div class="text-sm text-custom-primary/70 font-light">Wer hat sich gemeldet? Wer sitzt wo? Alles sichtbar.</div>
              </div>
              
              <!-- Decorative Elements -->
              <div class="absolute top-8 right-8 w-16 h-16 bg-custom-secondary/30 rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        <!-- Creative Feature Gallery -->
        <div class="text-center space-y-12 pt-16">
          <div class="space-y-6">
            <h2 class="text-5xl lg:text-6xl font-bold text-custom-primary leading-tight">
              Einfach.
              <br>
              <span class="text-4xl lg:text-5xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">Besser.</span>
            </h2>
            <p class="text-xl text-custom-primary/70 leading-relaxed font-light max-w-3xl mx-auto">
              BetterClassroom ist keine magische Lösung. 
              Es ist einfach ein besserer Weg. 
              Für Lehrende. Für Lernende. Für Bildung.
            </p>
          </div>
          
          <!-- Visual Gallery -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/assets/teacherOnBlackboard.jpg" 
                alt="Lehre mit BetterClassroom - Tradition trifft Innovation"
                class="w-full h-40 object-cover rounded-2xl"
              />
            </div>
            <div class="transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/assets/studentSitz.png" 
                alt="Studentische Interaktion - digitale Partizipation"
                class="w-full h-40 object-cover rounded-2xl"
              />
            </div>
            <div class="transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/assets/fortschritt.png" 
                alt="Fortschritt in der Bildung - messbare Ergebnisse"
                class="w-full h-40 object-cover rounded-2xl"
              />
            </div>
            <div class="transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/assets/htwg-logo.png" 
                alt="HTWG Konstanz - Partner für Innovation"
                class="w-full h-40 object-cover rounded-2xl bg-custom-secondary/10 p-4"
              />
            </div>
          </div>
          
          <!-- Creative CTA -->
          <div class="space-y-6">
            <NuxtLink to="/contact" class="group inline-flex items-center space-x-4 bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white px-12 py-4 rounded-full hover:shadow-2xl transition-all duration-500 font-light tracking-wide text-lg overflow-hidden">
              <span class="relative z-10">Selbst erleben</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              <div class="absolute inset-0 bg-gradient-to-r from-custom-secondary to-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </NuxtLink>
            
            <div class="flex items-center justify-center space-x-8 text-sm text-custom-primary/50 font-light">
              <span>🎯 Einfach zu bedienen</span>
              <span>💡 Echt nützlich</span>
              <span>⚡ Schnell einsatzbereit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Reactive state for mobile menu
const mobileMenuOpen = ref(false)

// SEO Meta
useHead({
  title: 'BetterClassroom Funktionen - Werkzeuge für moderne Lehre | HTWG Konstanz',
  meta: [
    {
      name: 'description',
      content: 'Entdecken Sie die einfachen Werkzeuge von BetterClassroom: Stille Fragen, Live Dashboard, intelligenter Sitzplan. Einfach. Besser. Für echte Lehre.',
    },
    {
      name: 'keywords',
      content: 'betterclassroom funktionen, digitale wortmeldungen, stille fragen, live dashboard, intelligenter sitzplan, einfache lehre, HTWG konstanz'
    }
  ]
})
</script>

<style scoped>
.container-custom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .container-custom {
    padding: 0 1rem;
  }
}
</style>