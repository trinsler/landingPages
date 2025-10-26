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

    <!-- Hero Section - Artistic Storytelling -->
    <main class="relative pt-40 lg:pt-48 pb-20 lg:pb-32 overflow-hidden">
      <!-- Creative Background -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-custom-primary/10 to-custom-secondary/5"></div>
      </div>
      
      <div class="container mx-auto px-6 lg:px-8 relative">
        <!-- Hero Content -->
        <div class="text-center space-y-12 max-w-5xl mx-auto">
          <!-- Creative Badge -->
          <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-custom-secondary/20 to-custom-primary/10 backdrop-blur-sm rounded-full px-8 py-4 border border-custom-secondary/20">
            <div class="w-3 h-3 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full animate-pulse"></div>
            <span class="text-custom-primary font-medium text-sm tracking-wide">Eine Geschichte, die wirklich passiert ist</span>
          </div>
          
          <!-- Creative Headline -->
          <h1 class="text-6xl lg:text-8xl font-bold text-custom-primary leading-tight tracking-tight">
            Wo Ideen
            <br>
            <span class="text-5xl lg:text-7xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">geboren werden</span>
          </h1>
          
          <!-- Story Subtitle -->
          <p class="text-xl lg:text-2xl text-custom-primary/70 leading-relaxed font-light max-w-3xl mx-auto">
            Keine PowerPoint-Präsentation. Kein Pitch-Deck. Nur drei Studenten, ein Hörsaal und die einfache Frage: 
            <span class="font-medium text-custom-primary">"Was wäre, wenn?"</span>
          </p>
          
          <!-- Visual Story Elements -->
          <div class="flex flex-wrap justify-center items-center gap-8 pt-8">
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                3
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Studenten</div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                3
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Monate</div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-1 bg-custom-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative w-20 h-20 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-custom-white font-bold">
                1
              </div>
              <div class="text-sm text-custom-primary/60 font-light">Idee</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- The Story Section - Visual & Emotional -->
    <section class="py-32 lg:py-48 relative">
      <!-- Creative Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-custom-white via-custom-secondary/5 to-custom-primary/5"></div>
      
      <div class="container mx-auto px-6 lg:px-8 relative">
        <!-- Story Timeline - Asymmetric Layout -->
        <div class="space-y-24">
          <!-- Story Chapter 1 -->
          <div class="grid lg:grid-cols-12 gap-16 items-center">
            <div class="lg:col-span-6 lg:col-start-1">
              <div class="space-y-8">
                <div class="relative inline-block">
                  <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-secondary rounded-full"></div>
                  <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                    Kapitel 1: Der Moment
                  </h2>
                </div>
                
                <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                  Es war ein normaler Dienstag. Vorlesung. Dr. Meyer erklärt komplexe Algorithmen. 
                  Jeder Handgriff, jede Frage, jede Unterbrechung. 
                  Wir saßen da und dachten: Das muss einfacher gehen.
                </p>
                
                <!-- Visual Element -->
                <div class="relative rounded-2xl overflow-hidden border border-custom-secondary/20">
                  <img 
                    src="/assets/seniorsstudents.jpg" 
                    alt="Studenten im Hörsaal - der Moment, in dem alles begann"
                    class="w-full h-64 object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-custom-primary/40 to-transparent"></div>
                  
                  <!-- Quote Overlay -->
                  <div class="absolute bottom-4 left-4 bg-custom-white/90 backdrop-blur-sm rounded-xl p-4 max-w-xs">
                    <div class="text-sm font-bold text-custom-primary">"Hand heben war nervös"</div>
                    <div class="text-xs text-custom-primary/60 mt-1">Beobachtung aus der ersten Reihe</div>
                  </div>
                </div>
              </div>
              
              <div class="lg:col-span-6 lg:col-start-7">
                <!-- Visual Story Grid -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img 
                      src="/assets/boyListening.jpg" 
                      alt="Student konzentriert sich - der Beginn der Veränderung"
                      class="w-full h-40 object-cover rounded-2xl"
                    />
                  </div>
                  <div class="transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img 
                      src="/assets/studentWithIpad.jpg" 
                      alt="Student mit iPad - Technologie trifft auf Bildung"
                      class="w-full h-40 object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

          <!-- Story Chapter 2 -->
          <div class="grid lg:grid-cols-12 gap-16 items-center mt-24 lg:mt-32">
            <div class="lg:col-span-6 lg:col-start-7 order-2 lg:order-1">
              <!-- Visual Evidence -->
              <div class="grid grid-cols-2 gap-4">
                <div class="transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/assets/studentSitz.png" 
                    alt="First Prototype - die erste digitale Wortmeldung"
                    class="w-full h-40 object-cover rounded-2xl"
                  />
                </div>
                <div class="transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/assets/fortschritt.png" 
                    alt="First Success - das erste funktionierende Dashboard"
                    class="w-full h-40 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-5 lg:col-start-1 order-1 lg:order-2">
              <div class="space-y-8">
                <div class="relative inline-block">
                  <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-secondary rounded-full"></div>
                  <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                    Kapitel 2: Das Experiment
                  </h2>
                </div>
                
                <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                  Wir haben angefangen. Kleine Sketze auf Papier. 
                  Erste Prototypen. Feedback von Kommilitonen. 
                  Kein großes Team, kein Budget, nur die Energie der Jugend.
                </p>
                
                <!-- Quote -->
                <div class="border-l-4 border-custom-secondary pl-6 py-4">
                  <p class="text-lg font-light text-custom-primary italic">
                    "Es funktioniert nicht perfekt, aber es funktioniert. Und das ist alles, was zählt."
                  </p>
                  <p class="text-sm text-custom-primary/60 mt-2">- Feedback aus dem Hörsaal</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Story Chapter 3 -->
          <div class="grid lg:grid-cols-12 gap-16 items-center mt-24 lg:mt-32">
            <div class="lg:col-span-5 lg:col-start-1">
              <div class="space-y-8">
                <div class="relative inline-block">
                  <div class="absolute -top-4 -left-4 w-8 h-8 bg-custom-secondary rounded-full"></div>
                  <h2 class="text-4xl lg:text-5xl font-bold text-custom-primary relative">
                    Kapitel 3: Die Realität
                  </h2>
                </div>
                
                <p class="text-lg text-custom-primary/70 leading-relaxed font-light max-w-md">
                  Die HTWG hat uns eine Chance gegeben. 
                  Ein echter Hörsaal. Echte Studierende. 
                  Echter Professor. 
                  Und plötzlich war es keine studentische Übung mehr.
                </p>
                
                <!-- Reality Check -->
                <div class="bg-custom-secondary/10 rounded-2xl p-6 border border-custom-secondary/20">
                  <div class="space-y-2">
                    <div class="flex items-center space-x-3">
                      <div class="w-6 h-6 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-custom-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <div class="text-custom-primary font-medium">Erfolg</div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-6 h-6 bg-gradient-to-br from-custom-primary to-custom-secondary rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-custom-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <div class="text-custom-primary font-medium">Herausforderung</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-6 lg:col-start-8">
              <!-- Final Visual -->
              <div class="relative">
                <img 
                  src="/assets/teacherOnBlackboard.jpg" 
                  alt="Professor mit BetterClassroom - Tradition trifft Innovation"
                  class="w-full h-96 object-cover rounded-3xl border border-custom-secondary/20"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-custom-primary/60 via-transparent to-transparent"></div>
                
                <!-- Success Badge -->
                <div class="absolute top-8 right-8 bg-custom-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-custom-primary">HTWG</div>
                    <div class="text-xs text-custom-primary/60">Glaubt an uns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- The Journey Continues -->
        <div class="text-center space-y-12 pt-16">
          <div class="space-y-6">
            <h2 class="text-5xl lg:text-6xl font-bold text-custom-primary leading-tight">
              Die Geschichte
              <br>
              <span class="text-4xl lg:text-5xl font-light bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">geht weiter</span>
            </h2>
            <p class="text-xl text-custom-primary/70 leading-relaxed font-light max-w-3xl mx-auto">
              BetterClassroom ist nicht das Ende. 
              Es ist der Anfang. 
              Eines neuen Weges, wie wir lernen und lehren.
            </p>
          </div>
          
          <!-- Creative CTA -->
          <div class="space-y-6">
            <NuxtLink to="/contact" class="group inline-flex items-center space-x-4 bg-gradient-to-r from-custom-primary to-custom-secondary text-custom-white px-12 py-4 rounded-full hover:shadow-2xl transition-all duration-500 font-light tracking-wide text-lg overflow-hidden">
              <span class="relative z-10">Werden Sie Teil der Geschichte</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              <div class="absolute inset-0 bg-gradient-to-r from-custom-secondary to-custom-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </NuxtLink>
            
            <div class="flex items-center justify-center space-x-8 text-sm text-custom-primary/50 font-light">
              <span>🎭 Keine perfekte Geschichte</span>
              <span>💪 Echter Mut</span>
              <span>✨ Authentische Leidenschaft</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Über BetterClassroom - Die Geschichte der Bildungsrevolution | HTWG Konstanz',
  meta: [
    {
      name: 'description',
      content: 'Erfahren Sie die Entstehungsgeschichte von BetterClassroom, unserem Team und unserer Mission, die Bildungslandschaft zu revolutionieren. Bereits erfolgreich an der HTWG Konstanz implementiert.',
    },
    {
      name: 'keywords',
      content: 'betterclassroom geschichte, bildungstechnologie entwicklung, HTWG konstanz partnership, klassenzimmer management team, digitale bildung innovation'
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