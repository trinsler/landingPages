<template>
  <div>
    <!-- Navigation -->
    <header class="nav">
      <div class="container">
        <div class="nav-content">
          <!-- Logo -->
          <NuxtLink to="/home" class="logo">
            <div class="logo-icon">BC</div>
            <span>BetterClassroom</span>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <div class="nav-links">
            <NuxtLink to="/home">Start</NuxtLink>
            <NuxtLink to="/features">Funktionen</NuxtLink>
            <NuxtLink to="/about">Über uns</NuxtLink>
            <NuxtLink to="/contact" class="nav-cta">Kontakt</NuxtLink>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="mobile-menu-btn">
            {{ mobileMenuOpen ? '✕' : '☰' }}
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
          <NuxtLink to="/home">Start</NuxtLink>
          <NuxtLink to="/features">Funktionen</NuxtLink>
          <NuxtLink to="/about">Über uns</NuxtLink>
          <NuxtLink to="/contact" class="nav-cta">Kontakt</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <!-- Hero Text -->
          <div class="hero-text">
            <!-- Badge -->
            <div class="hero-badges">
              <div class="badge-dot"></div>
              <span>Digitale Bildung neu gedacht</span>
            </div>
            
            <!-- Headline -->
            <h1>
              Besserer
              <br>
              <span class="gradient-text">Unterricht</span>
              <br>
              für alle
            </h1>
            
            <!-- Description -->
            <p>
              BetterClassroom macht digitale Interaktion im Klassenzimmer einfach, intuitiv und effektiv. 
              Entwickelt für echte Lehrende und Lernende.
            </p>
            
            <!-- Buttons -->
            <div class="hero-buttons">
              <NuxtLink to="/contact" class="btn-primary">Demo anfordern</NuxtLink>
              <NuxtLink to="/features" class="btn-secondary">Funktionen entdecken</NuxtLink>
            </div>
            
            <!-- Trust Indicators -->
            <div class="trust-indicators">
              <div class="trust-item">
                <svg class="trust-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>DSGVO-konform</span>
              </div>
              <div class="trust-item">
                <svg class="trust-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>HTWG getestet</span>
              </div>
            </div>
          </div>
          
          <!-- Hero Image -->
          <div class="hero-image">
            <div class="main-image">
              <img src="/assets/seniorsstudents.jpg" alt="Studenten im Hörsaal mit BetterClassroom">
            </div>
            
            <!-- Floating Elements -->
            <div class="floating-card top-right">
              <div class="floating-number">24</div>
              <div class="floating-label">Studenten</div>
            </div>
            
            <div class="floating-card bottom-left">
              <div class="floating-number">3</div>
              <div class="floating-label">Monate</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="features-header">
          <h2>
            Intelligente Funktionen
            <br>
            <span class="gradient-text">für moderne Lehre</span>
          </h2>
          <p>
            Werkzeuge, die wirklich helfen. Einfach zu bedienen, effektiv im Einsatz.
          </p>
        </div>

        <div class="features-grid">
          <!-- Feature 1 -->
          <div class="feature-card">
            <div class="feature-icon">👋</div>
            <h3>Digitale Wortmeldungen</h3>
            <p>
              Stille und organisierte Beteiligung. Kein Händeheben mehr, nur ein Klick.
            </p>
            <ul class="feature-list">
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Einfach bedienen</span>
              </li>
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Keine Unterbrechung</span>
              </li>
            </ul>
          </div>

          <!-- Feature 2 -->
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Live Dashboard</h3>
            <p>
              Alles auf einen Blick. Wer hat sich gemeldet? Was braucht Aufmerksamkeit?
            </p>
            <ul class="feature-list">
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Echtzeit-Übersicht</span>
              </li>
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Strukturiert</span>
              </li>
            </ul>
          </div>

          <!-- Feature 3 -->
          <div class="feature-card">
            <div class="feature-icon">🪑</div>
            <h3>Intelligenter Sitzplan</h3>
            <p>
              Wer sitzt wo? Wer hat sich gemeldet? Visualisiert und klar.
            </p>
            <ul class="feature-list">
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Visual klar</span>
              </li>
              <li>
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Interaktiv</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery">
      <div class="container">
        <div class="gallery-header">
          <h2>
            BetterClassroom
            <br>
            <span class="gradient-text">in Aktion</span>
          </h2>
          <p>
            Einblicke in die digitale Klassenzimmer-Revolution
          </p>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="/assets/studentSitz.png" alt="BetterClassroom digitale Wortmeldung">
            <div class="gallery-overlay"></div>
          </div>
          
          <div class="gallery-item">
            <img src="/assets/fortschritt.png" alt="BetterClassroom Fortschrittsanzeige">
            <div class="gallery-overlay"></div>
          </div>
          
          <div class="gallery-item">
            <img src="/assets/boyListening.jpg" alt="Student konzentriert mit BetterClassroom">
            <div class="gallery-overlay"></div>
          </div>
          
          <div class="gallery-item">
            <img src="/assets/studentWithIpad.jpg" alt="Digitale Lehre mit BetterClassroom">
            <div class="gallery-overlay"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>
            Bereit für besseren
            <br>
            Unterricht?
          </h2>
          <p>
            Erleben Sie BetterClassroom in einer persönlichen Demo. Sehen Sie selbst, wie einfach digitale Interaktion sein kann.
          </p>
          
          <div class="cta-buttons">
            <NuxtLink to="/contact" class="cta-btn-primary">Jetzt Demo anfordern</NuxtLink>
            <NuxtLink to="/about" class="cta-btn-secondary">Unsere Geschichte</NuxtLink>
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
  title: 'BetterClassroom - Digitale Interaktion im Klassenzimmer | HTWG Konstanz',
  meta: [
    {
      name: 'description',
      content: 'BetterClassroom macht digitale Interaktion im Klassenzimmer einfach. Digitale Wortmeldungen, Live Dashboard, intelligenter Sitzplan. Entwickelt an der HTWG Konstanz.',
    },
    {
      name: 'keywords',
      content: 'betterclassroom, digitale lehre, klassenzimmer management, HTWG Konstanz, digitale wortmeldungen, interactive learning'
    }
  ]
})
</script>