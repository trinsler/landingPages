<template>
  <div class="helper-job-detail-container">
    <!-- Header Component -->
    <AppHeader 
      :title="job?.title || 'Job Details'"
      current-role="unified"
      :request-count="hasNewJobNotification ? 1 : 0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div v-if="job" class="mobile-container">
      
      <!-- Job Header -->
      <div class="job-header-card">
        <div class="job-category-display">
          <svg class="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="job.category === 'shopping'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18"/>
            <circle v-if="job.category === 'shopping'" cx="9" cy="20" r="1"/>
            <circle v-if="job.category === 'shopping'" cx="20" cy="20" r="1"/>
            <path v-if="job.category === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path v-if="job.category === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 9a2.5 2.5 0 005 0"/>
            <path v-if="job.category === 'gardening'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11.5v3"/>
            <path v-if="job.category === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            <path v-if="job.category === 'cooking'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 2v1m6-1v1"/>
            <path v-if="job.category === 'companionship'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            <path v-if="job.category === 'companionship'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h2 class="job-title">{{ job.title }}</h2>
        <div class="distance-badge">
          <svg class="distance-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ job.distance }} km entfernt
        </div>
      </div>

      <!-- Job Details -->
      <div class="job-details-card">
        <h3 class="section-title">Job Details</h3>
        
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Kategorie</div>
            <div class="detail-value">{{ getCategoryName(job.category) }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Preis</div>
            <div class="detail-value">{{ job.price }}€</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Dauer</div>
            <div class="detail-value">{{ job.duration }} {{ job.duration === 1 ? 'Stunde' : 'Stunden' }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Zeitpunkt</div>
            <div class="detail-value">{{ formatJobTiming(job) }}</div>
          </div>
        </div>

        <div class="location-info">
          <div class="location-item">
            <div class="detail-label">Ort</div>
            <div class="detail-value">{{ job.location.city }}, {{ job.location.zipCode }}</div>
          </div>
        </div>

        <div v-if="job.description" class="job-description">
          <h4 class="description-title">Beschreibung</h4>
          <p class="description-text">{{ job.description }}</p>
        </div>
      </div>

      <!-- Seeker Info -->
      <div class="seeker-info-card">
        <h3 class="section-title">Über den Hilfesuchenden</h3>
        
        <div class="seeker-profile">
          <div class="seeker-avatar">
            <svg class="seeker-avatar-img" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="seeker-details">
            <div class="seeker-header">
              <h4 class="seeker-name">{{ job.seeker.firstName }}</h4>
              <div class="seeker-badges">
                <span v-if="job.seeker.isVerified" class="verified-badge">
                  <svg class="verified-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Verifiziert
                </span>
              </div>
            </div>
            <div class="seeker-meta">
              <span class="seeker-age">{{ job.seeker.age }} Jahre</span>
              <div class="seeker-rating">
                <span class="rating-stars">★★★★★</span>
                <span class="rating-value">{{ job.seeker.rating }}</span>
                <span class="rating-count">({{ job.seeker.reviewCount }})</span>
              </div>
            </div>
            <p v-if="job.seeker.shortBio" class="seeker-bio">{{ job.seeker.shortBio }}</p>
          </div>
        </div>

        <button @click="viewSeekerProfile" class="view-profile-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          Profil ansehen
        </button>
      </div>

      <!-- Application Status -->
      <div class="application-status-card">
        <div v-if="getApplicationStatus() === 'not_applied'" class="apply-section">
          <h3 class="apply-title">Möchtest du helfen?</h3>
          <p class="apply-subtitle">Bewirb dich jetzt für diesen Job</p>
          <button @click="showApplyDialog = true" class="apply-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Bewerben
          </button>
        </div>

        <div v-else-if="getApplicationStatus() === 'applied'" class="applied-section">
          <div class="applied-icon-container">
            <svg class="applied-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="applied-title">Bewerbung läuft</h3>
          <p class="applied-subtitle">Du wirst benachrichtigt, sobald sich der Hilfesuchende entschieden hat</p>
          <div class="applied-actions">
            <button disabled class="applied-status-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Bewerbung gesendet
            </button>
            <button @click="showWithdrawDialog = true" class="withdraw-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Bewerbung zurückziehen
            </button>
          </div>
        </div>

        <div v-else-if="getApplicationStatus() === 'accepted'" class="accepted-section">
          <div class="accepted-icon-container">
            <svg class="accepted-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="accepted-title">Glückwunsch! Du wurdest ausgewählt</h3>
          <p class="accepted-subtitle">Du wurdest für diesen Job ausgewählt. Hier sind alle Details:</p>
          
          <!-- Vollständige Adresse (nur wenn angenommen) -->
          <div class="full-address-card">
            <h4 class="address-title">📍 Standort</h4>
            <div class="full-address">
              <div class="address-line">{{ job.location.street }}</div>
              <div class="address-line">{{ job.location.zipCode }} {{ job.location.city }}</div>
            </div>
          </div>
          
          <!-- Kontakt-Infos (nur wenn angenommen) -->
          <div class="contact-info-card">
            <h4 class="contact-title">📞 Kontakt</h4>
            <div class="contact-item">
              <span class="contact-label">Name:</span>
              <span class="contact-value">{{ job.seeker.firstName }} {{ job.seeker.lastName }}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">Telefon:</span>
              <a :href="`tel:${job.seeker.phone}`" class="contact-phone">
                {{ job.seeker.phone }}
              </a>
            </div>
          </div>

          <!-- Action Buttons (Job-Durchführung) -->
          <div class="accepted-actions">
            <!-- Chat Button (immer sichtbar) -->
            <button @click="openChatWithSeeker" class="chat-action-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
              </svg>
              Chat starten
            </button>
            
            <!-- Route Button (nur vor Job-Start) -->
            <button v-if="job.status === 'accepted'" @click="openRoutePlanning" class="route-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Route planen
            </button>
            
            <!-- Job Start/Complete Buttons -->
            <div v-if="canStartJob" class="job-action-btn">
              <button @click="startJob" class="start-job-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Job starten
              </button>
            </div>
            
            <div v-else-if="job.status === 'in_progress'" class="job-action-btn">
              <button @click="showCompleteJobDialog = true" class="complete-job-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Job abschließen
              </button>
            </div>
            
            <!-- Waiting for Confirmation Screen -->
            <div v-else-if="job.completed_by_helper && !job.completed_by_seeker" class="waiting-confirmation">
              <div class="waiting-content">
                <div class="waiting-spinner"></div>
                <h4 class="waiting-title">Warte auf Bestätigung</h4>
                <p class="waiting-text">{{ job.seeker.firstName }} muss den Job ebenfalls als abgeschlossen bestätigen</p>
              </div>
            </div>
            
            <!-- US-5.8: Problem Report Button -->
            <button @click="showHelperProblemDialog = true" class="report-problem-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              Problem melden
            </button>
            
            <!-- Cancel Button (nur bei bestimmten Status) -->
            <button v-if="canCancelJob" @click="showCancelJobDialog = true" class="cancel-job-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Job absagen
            </button>
          </div>
        </div>

        <div v-else-if="getApplicationStatus() === 'full'" class="full-section">
          <div class="full-icon-container">
            <svg class="full-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="full-title">Job ist voll besetzt</h3>
          <p class="full-subtitle">Dieser Job hat bereits die maximale Anzahl an Bewerbern erreicht</p>
          <button disabled class="full-btn">
            Job voll besetzt
          </button>
        </div>

        <!-- Job Stornierung Dialog -->
        <div v-if="showCancelJobDialog" class="dialog-overlay" @click.self="showCancelJobDialog = false">
          <div class="cancel-job-dialog">
            <div class="dialog-header">
              <svg class="warning-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <h3 class="dialog-title">Job wirklich absagen?</h3>
              <p class="dialog-subtitle">Möchtest du den Job "{{ job?.title }}" wirklich absagen?</p>
            </div>
            
            <div class="dialog-content">
              <div v-if="!canCancelJob" class="cancellation-notice error">
                <svg class="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <span class="notice-text">Absagen nicht mehr möglich. Bitte kontaktiere den Hilfesuchenden direkt.</span>
              </div>
              
              <div v-else class="cancellation-info">
                <div class="info-notice">
                  <svg class="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="notice-text">{{ job?.seeker?.firstName || 'Der Hilfesuchende' }} wird benachrichtigt und kann einen neuen Helfer suchen</span>
                </div>
              </div>
              
              <div v-if="canCancelJob" class="reason-section">
                <label class="reason-label" for="cancelReason">Grund (optional)</label>
                <textarea 
                  v-model="cancelJobReason"
                  id="cancelReason"
                  class="reason-textarea"
                  placeholder="z.B. 'Ich bin plötzlich krank' oder 'Ich habe einen anderen Termin'"
                  rows="3"
                  maxlength="200"
                ></textarea>
                <div class="char-counter">{{ cancelJobReason.length }}/200</div>
              </div>
              
              <div class="dialog-actions">
                <button v-if="canCancelJob" @click="confirmCancelJob" :disabled="isCancellingJob" class="confirm-cancel-btn">
                  <svg v-if="isCancellingJob" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  {{ isCancellingJob ? 'Wird abgesagt...' : 'Ja, absagen' }}
                </button>
                
                <button @click="showCancelJobDialog = false" :disabled="isCancellingJob" class="cancel-btn">
                  {{ canCancelJob ? 'Abbrechen' : 'OK' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="back-actions">
        <button @click="goBackToDashboard" class="back-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
          </svg>
          Zurück zum Dashboard
        </button>
      </div>

    </div>

    <!-- Job Completion Dialog -->
    <div v-if="showCompleteJobDialog" class="dialog-overlay" @click.self="showCompleteJobDialog = false">
      <div class="complete-job-dialog">
        <div class="dialog-header">
          <svg class="complete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="dialog-title">Job abgeschlossen?</h3>
          <p class="dialog-subtitle">Möchtest du den Job "{{ job?.title }}" wirklich als abgeschlossen markieren?</p>
        </div>
        
        <div class="dialog-content">
          <div class="completion-notice">
            <svg class="notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="notice-text">Der Hilfesuchende muss den Abschluss ebenfalls bestätigen</span>
          </div>
          
          <div class="info-text">
            <p>Nach deiner Bestätigung warten wir auf die Bestätigung von {{ job?.seeker?.firstName }}.</p>
            <p>Erst dann wird der Job als vollständig abgeschlossen markiert und die Zahlung ausgelöst.</p>
          </div>
          
          <div class="dialog-actions">
            <button @click="confirmCompleteJob" :disabled="isCompletingJob" class="confirm-complete-btn">
              <svg v-if="isCompletingJob" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ isCompletingJob ? 'Wird abgeschlossen...' : 'Ja, abschließen' }}
            </button>
            
            <button @click="showCompleteJobDialog = false" :disabled="isCompletingJob" class="cancel-complete-btn">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Job wird geladen...</p>
    </div>

    <!-- Withdraw Dialog -->
    <div v-if="showWithdrawDialog" class="dialog-overlay" @click.self="showWithdrawDialog = false">
      <div class="withdraw-dialog">
        <div class="dialog-header">
          <svg class="warning-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h3 class="dialog-title">Bewerbung zurückziehen?</h3>
          <p class="dialog-subtitle">Möchtest du deine Bewerbung für "{{ job?.title }}" wirklich zurückziehen?</p>
        </div>
        
        <div class="dialog-content">
          <div class="notification-notice">
            <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="info-text">{{ job?.seeker?.firstName || 'Der Hilfesuchende' }} wird über den Rückzug benachrichtigt</span>
          </div>
          
          <div class="dialog-actions">
            <button @click="confirmWithdrawal" :disabled="isWithdrawing" class="confirm-withdraw-btn">
              <svg v-if="isWithdrawing" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              {{ isWithdrawing ? 'Wird zurückgezogen...' : 'Ja, zurückziehen' }}
            </button>
            
            <button @click="showWithdrawDialog = false" :disabled="isWithdrawing" class="cancel-withdraw-btn">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Dialog -->
    <div v-if="showApplyDialog" class="dialog-overlay" @click.self="showApplyDialog = false">
      <div class="apply-dialog">
        <div class="dialog-header">
          <h3 class="dialog-title">Auf Job bewerben</h3>
          <p class="dialog-subtitle">Möchtest du dich für "{{ job?.title }}" bewerben?</p>
        </div>
        
        <div class="dialog-content">
          <div class="message-section">
            <label class="message-label" for="applicationMessage">Nachricht an {{ job?.seeker?.firstName }} (optional)</label>
            <textarea 
              v-model="applicationMessage"
              id="applicationMessage"
              class="message-textarea"
              placeholder="z.B. 'Ich habe Erfahrung mit Gartenarbeit und würde gerne helfen...'"
              rows="4"
              maxlength="500"
            ></textarea>
            <div class="char-counter">{{ applicationMessage.length }}/500</div>
          </div>
          
          <div class="dialog-actions">
            <button @click="submitApplication" :disabled="isSubmitting" class="submit-apply-btn">
              <svg v-if="isSubmitting" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              {{ isSubmitting ? 'Bewerbung wird gesendet...' : 'Jetzt bewerben' }}
            </button>
            
            <button @click="showApplyDialog = false" :disabled="isSubmitting" class="cancel-apply-btn">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- US-5.8: Helper Problem Report Dialog -->
    <div v-if="showHelperProblemDialog" class="dialog-overlay" @click.self="showHelperProblemDialog = false">
      <div class="helper-problem-dialog">
        <div class="dialog-header">
          <svg class="warning-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h3 class="dialog-title">Problem melden</h3>
          <p class="dialog-subtitle">Was ist passiert?</p>
        </div>
        
        <div class="dialog-content">
          <div class="problem-info">
            <p><strong>Job:</strong> {{ job?.title }}</p>
            <p><strong>Hilfesuchender:</strong> {{ job?.seeker?.firstName }} {{ job?.seeker?.lastName }}</p>
          </div>
          
          <div class="problem-reason-section">
            <label class="section-label">Was ist passiert?</label>
            <div class="radio-options">
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperProblemType" 
                  value="seeker_not_present"
                  name="problemType"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Hilfesuchender war nicht da</div>
                  <div class="option-subtitle">Niemand war an der angegebenen Adresse</div>
                </div>
              </label>
              
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperProblemType" 
                  value="job_different"
                  name="problemType"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Job war anders als beschrieben</div>
                  <div class="option-subtitle">Die Aufgabe war schwieriger oder anders als erwartet</div>
                </div>
              </label>
              
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperProblemType" 
                  value="inappropriate_behavior"
                  name="problemType"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Unangemessenes Verhalten</div>
                  <div class="option-subtitle">Fehlverhalten oder unangemessene Anweisungen</div>
                </div>
              </label>
              
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperProblemType" 
                  value="other"
                  name="problemType"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Sonstiges</div>
                  <div class="option-subtitle">Anderes Problem</div>
                </div>
              </label>
            </div>
          </div>
          
          <div class="reason-section">
            <label class="reason-label" for="helperProblemDescription">Beschreibung *</label>
            <textarea 
              v-model="helperProblemDescription"
              id="helperProblemDescription"
              class="reason-textarea"
              placeholder="Bitte beschreiben Sie genau, was passiert ist..."
              rows="4"
              maxlength="300"
              required
            ></textarea>
            <div class="char-counter">{{ helperProblemDescription.length }}/300</div>
          </div>
          
          <div class="cancel-job-section">
            <label class="checkbox-option">
              <input 
                type="checkbox" 
                v-model="shouldCancelJob" 
                id="cancelJob"
                class="checkbox-input"
              >
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Ich möchte den Job abbrechen</span>
            </label>
          </div>
          
          <div class="dialog-actions">
            <button 
              @click="submitHelperProblem" 
              :disabled="isSubmittingProblem || !helperProblemType.trim() || !helperProblemDescription.trim()" 
              class="submit-problem-btn"
            >
              <svg v-if="isSubmittingProblem" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              {{ isSubmittingProblem ? 'Wird gemeldet...' : 'Melden' }}
            </button>
            
            <button @click="showHelperProblemDialog = false" :disabled="isSubmittingProblem" class="cancel-problem-btn">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="helper-tasks"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import UnifiedFooter from '~/components/pwa/unified/UnifiedFooter.vue'
import { usePayments } from '~/composables/usePayments.js'

definePageMeta({
  layout: false
})

// Get job ID from route
const route = useRoute()
const jobId = route.params.jobId

// Job data
const job = ref(null)

// UI state
const showApplyDialog = ref(false)
const showWithdrawDialog = ref(false)
const showCancelJobDialog = ref(false)
const showCompleteJobDialog = ref(false)
const applicationMessage = ref('')
const cancelJobReason = ref('')
const isSubmitting = ref(false)
const isWithdrawing = ref(false)
const isCancellingJob = ref(false)
const isCompletingJob = ref(false)

// US-5.8: Helper problem reporting state
const showHelperProblemDialog = ref(false)
const helperProblemType = ref('')
const helperProblemDescription = ref('')
const shouldCancelJob = ref(false)
const isSubmittingProblem = ref(false)
const hasNotificationPermission = ref(false)
const hasNewJobNotification = ref(false)

// Mock current helper ID (in real app, get from auth)
const currentHelperId = ref('helper1')

// Notification permission state
const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    hasNotificationPermission.value = permission === 'granted'
    return hasNotificationPermission.value
  }
  return false
}

// Show push notification
const showPushNotification = (title, body, onClick) => {
  if ('Notification' in window && hasNotificationPermission.value) {
    const notification = new Notification(title, {
      body: body,
      icon: '/icons/app-icon.png',
      badge: '/icons/notification-badge.png',
      tag: `job-${jobId}`
    })
    
    notification.onclick = () => {
      if (onClick) onClick()
      notification.close()
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000)
  }
}

// Check if job can be cancelled (2h rule)
const canCancelJob = computed(() => {
  if (!job.value) return false
  
  // Cannot cancel if job is already completed or in progress for more than 30 minutes
  if (job.value.status === 'in_progress') return false
  if (job.value.completed_by_helper) return false
  
  // If job is immediate, can cancel anytime before starting
  if (job.value.isImmediate) return true
  
  // For scheduled jobs, check if more than 2h before start time
  if (job.value.scheduledDate && job.value.scheduledTime) {
    const scheduledDateTime = new Date(job.value.scheduledDate + 'T' + job.value.scheduledTime)
    const now = new Date()
    const hoursUntilStart = (scheduledDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    return hoursUntilStart > 2
  }
  
  return false
})

// Check if job can be started (±30 min window)
const canStartJob = computed(() => {
  if (!job.value || job.value.status !== 'accepted') return false
  
  if (job.value.isImmediate) return true
  
  if (job.value.scheduledDate && job.value.scheduledTime) {
    const scheduledDateTime = new Date(job.value.scheduledDate + 'T' + job.value.scheduledTime)
    const now = new Date()
    const minutesUntilStart = (scheduledDateTime.getTime() - now.getTime()) / (1000 * 60)
    
    // Allow start within ±30 minutes window
    return minutesUntilStart <= 30 && minutesUntilStart >= -30
  }
  
  return false
})

// Mock job data for helpers to view
const mockHelperJobs = {
  '1': {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    status: 'open',
    price: 25,
    duration: 2,
    distance: 1.2,
    isImmediate: true,
    createdAt: new Date().toISOString(),
    description: 'Ich brauche jemanden, der für mich bei REWE einkauft. Die Einkaufsliste ist fertig (ca. 15 Artikel). Bezahlung erfolgt über die App. Einkauf soll heute Nachmittag stattfinden.',
    location: {
      city: 'München',
      zipCode: '80331',
      street: 'Hauptstraße 12'
    },
    seeker: {
      id: 'seeker1',
      firstName: 'Maria',
      lastName: 'Schmidt',
      phone: '0176 12345678',
      age: 67,
      rating: 4.8,
      reviewCount: 23,
      isVerified: true,
      shortBio: 'Freundliche Seniorin, die sich über Hilfe im Alltag freut'
    },
    applicationCount: 1,
    applications: [
      {
        id: 'app1',
        helperId: 'helper2',
        message: 'Ich helfe gerne beim Einkaufen!'
      }
    ]
  },
  '2': {
    id: 2,
    title: 'Garten gießen',
    category: 'gardening',
    status: 'applications_received',
    price: 15,
    duration: 1,
    distance: 0.8,
    isImmediate: false,
    scheduledDate: '2024-11-08',
    scheduledTime: '14:00',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'Meine Pflanzen brauchen Wasser, ich bin aber im Urlaub. Bitte alle Topfpflanzen und den kleinen Gemüsegarten gießen.',
    location: {
      city: 'München',
      zipCode: '80337',
      street: 'Sonnenweg 5'
    },
    seeker: {
      id: 'seeker2',
      firstName: 'Klaus',
      lastName: 'Weber',
      phone: '0151 98765432',
      age: 72,
      rating: 4.9,
      reviewCount: 15,
      isVerified: true,
      shortBio: 'Gartenliebhaber, der manchmal Unterstützung braucht'
    },
    applicationCount: 3,
    applications: [
      {
        id: 'app2',
        helperId: 'helper1',
        message: 'Ich habe viel Erfahrung mit Gartenpflege'
      },
      {
        id: 'app3',
        helperId: 'helper3',
        message: 'Gerne helfe ich beim Gießen'
      },
      {
        id: 'app4',
        helperId: 'helper4',
        message: 'Ich liebe Gartenarbeit!'
      }
    ]
  },
  '3': {
    id: 3,
    title: 'Mittagessen kochen',
    category: 'cooking',
    status: 'open',
    price: 30,
    duration: 2.5,
    distance: 2.1,
    isImmediate: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ich brauche ein gesundes Mittagessen für 2 Personen. Gerne etwas Vegetarisches mit frischen Zutaten.',
    location: {
      city: 'München',
      zipCode: '80469',
      street: 'Gärtnerstraße 23'
    },
    seeker: {
      id: 'seeker3',
      firstName: 'Anna',
      lastName: 'Müller',
      phone: '0160 11223344',
      age: 58,
      rating: 4.7,
      reviewCount: 31,
      isVerified: false,
      shortBio: 'Arbeitsreiche Mutter, die sich über kulinarische Unterstützung freut'
    },
    applicationCount: 0,
    applications: []
  },
  '4': {
    id: 4,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    status: 'accepted',
    price: 20,
    duration: 1.5,
    distance: 0.8,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 hours from now
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Ich brauche jemanden, der für mich bei REWE einkauft. Die Einkaufsliste ist fertig (ca. 12 Artikel).',
    location: {
      city: 'München',
      zipCode: '80331',
      street: 'Hauptstraße 12'
    },
    seeker: {
      id: 'seeker1',
      firstName: 'Maria',
      lastName: 'Schmidt',
      phone: '0176 12345678',
      age: 67,
      rating: 4.8,
      reviewCount: 23,
      isVerified: true,
      shortBio: 'Freundliche Seniorin, die sich über Hilfe im Alltag freut'
    },
    applicationCount: 1,
    applications: [
      {
        id: 'app1',
        helperId: 'helper1', // Current helper
        message: 'Ich helfe gerne beim Einkaufen!',
        appliedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
      }
    ],
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    acceptedHelperId: 'helper1',
    started_at: null,
    completed_by_helper: false,
    completed_by_seeker: false,
    completed_at_by_helper: null
  },
  '5': {
    id: 5,
    title: 'Gartenarbeit',
    category: 'gardening',
    status: 'in_progress',
    price: 30,
    duration: 2,
    distance: 1.2,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 30 * 60 * 1000).toISOString().split('T')[0], // 30 minutes from now
    scheduledTime: new Date(Date.now() + 30 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    description: 'Unkraut jäten und Blumen gießen.',
    location: {
      city: 'München',
      zipCode: '80337',
      street: 'Sonnenweg 15'
    },
    seeker: {
      id: 'seeker2',
      firstName: 'Klaus',
      lastName: 'Weber',
      phone: '0151 98765432',
      age: 72,
      rating: 4.7,
      reviewCount: 15,
      isVerified: true,
      shortBio: 'Rentner, der Hilfe im Garten braucht'
    },
    applicationCount: 1,
    applications: [
      {
        id: 'app2',
        helperId: 'helper1', // Current helper
        message: 'Ich habe Erfahrung mit Gartenarbeit',
        appliedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ],
    acceptedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    transactionId: 'txn_garden_work_456', // US-8.4: Transaction ID for payment cancellation
    acceptedHelperId: 'helper1',
    started_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // Started 10 minutes ago
    completed_by_helper: false,
    completed_by_seeker: false,
    completed_at_by_helper: null
  },
  '6': {
    id: 6,
    title: 'Begleitung zum Arzt',
    category: 'companionship',
    status: 'accepted',
    price: 25,
    duration: 1,
    distance: 0.5,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 hours from now
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    description: 'Begleitung zum Arzttermin und Rückfahrt',
    location: {
      city: 'München',
      zipCode: '80469',
      street: 'Gärtnerstraße 23'
    },
    seeker: {
      id: 'seeker3',
      firstName: 'Elisabeth',
      lastName: 'Müller',
      phone: '0160 11223344',
      age: 58,
      rating: 4.9,
      reviewCount: 31,
      isVerified: true,
      shortBio: 'Hilfe bei Arztbesuchen'
    },
    applicationCount: 1,
    applications: [
      {
        id: 'app3',
        helperId: 'helper1', // Current helper
        message: 'Ich bin sehr zuverlässig und pünktlich.',
        appliedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ],
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    acceptedHelperId: 'helper1',
    started_at: null,
    completed_by_helper: false,
    completed_by_seeker: false,
    completed_at_by_helper: null
  }
}

// Methods
const getCategoryName = (category) => {
  const categoryNames = {
    'shopping': 'Einkaufen',
    'gardening': 'Gartenarbeit',
    'cooking': 'Kochen',
    'cleaning': 'Putzen',
    'companionship': 'Gesellschaft',
    'childcare': 'Kinderbetreuung',
    'transportation': 'Fahrdienst',
    'other': 'Sonstiges'
  }
  return categoryNames[category] || category
}

const formatJobTiming = (job) => {
  if (job.isImmediate) {
    return 'Sofort'
  } else {
    const date = new Date(job.scheduledDate + 'T' + job.scheduledTime)
    return date.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const getApplicationStatus = () => {
  if (!job.value) return 'not_applied'
  
  // Check if job is accepted and current helper is the accepted helper
  if (job.value.status === 'accepted' && job.value.acceptedHelperId === currentHelperId.value) {
    return 'accepted'
  }
  
  // Check if job is full (3 applications)
  if (job.value.applicationCount >= 3) {
    return 'full'
  }
  
  // Check if current helper has already applied
  const hasApplied = job.value.applications.some(app => app.helperId === currentHelperId.value)
  if (hasApplied) {
    return 'applied'
  }
  
  return 'not_applied'
}

const viewSeekerProfile = () => {
  navigateTo(`/pwa/shared/profile/${job.value.seeker.id}?fromJob=true&returnTo=helper`)
}

const submitApplication = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Submitting application:', {
      jobId: jobId,
      helperId: currentHelperId.value,
      message: applicationMessage.value,
      seekerName: job.value.seeker.firstName
    })
    
    // Update local state to simulate successful application
    job.value.applications.push({
      id: `app_${Date.now()}`,
      helperId: currentHelperId.value,
      message: applicationMessage.value
    })
    job.value.applicationCount += 1
    
    if (job.value.applicationCount >= 3) {
      job.value.status = 'applications_received'
    }
    
    // Show success message
    alert(`Bewerbung gesendet! ${job.value.seeker.firstName} wird benachrichtigt und du erhältst eine Nachricht, sobald eine Entscheidung getroffen wurde.`)
    
    // Reset dialog state
    showApplyDialog.value = false
    applicationMessage.value = ''
    
    // Navigate back to dashboard
    navigateTo('/pwa')
    
  } catch (error) {
    console.error('Error submitting application:', error)
    alert('Fehler beim Senden der Bewerbung. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmitting.value = false
  }
}

const confirmWithdrawal = async () => {
  if (isWithdrawing.value) return
  
  isWithdrawing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Withdrawing application:', {
      jobId: jobId,
      helperId: currentHelperId.value,
      seekerName: job.value.seeker.firstName
    })
    
    // Find and remove the current helper's application
    const applicationIndex = job.value.applications.findIndex(app => app.helperId === currentHelperId.value)
    if (applicationIndex > -1) {
      job.value.applications.splice(applicationIndex, 1)
      job.value.applicationCount -= 1
      
      // If application count drops below 3, set status back to 'open'
      if (job.value.applicationCount < 3 && job.value.status === 'applications_received') {
        job.value.status = 'open'
      }
    }
    
    // Show success message
    alert(`Bewerbung zurückgezogen. ${job.value.seeker.firstName} wurde benachrichtigt.`)
    
    // Reset dialog state
    showWithdrawDialog.value = false
    
  } catch (error) {
    console.error('Error withdrawing application:', error)
    alert('Fehler beim Zurückziehen der Bewerbung. Bitte versuchen Sie es erneut.')
  } finally {
    isWithdrawing.value = false
  }
}

const goBackToDashboard = () => {
  navigateTo('/pwa')
}

// New methods for accepted jobs
const openChatWithSeeker = () => {
  navigateTo(`/pwa/shared/chat?seeker=${job.value.seeker.id}&job=${jobId}`)
}

const openRoutePlanning = () => {
  const address = `${job.value.location.street}, ${job.value.location.zipCode} ${job.value.location.city}`
  const encodedAddress = encodeURIComponent(address)
  
  // Try to open Google Maps first, fallback to Apple Maps on iOS
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('mac')) {
    // Apple Maps
    window.open(`http://maps.apple.com/?address=${encodedAddress}&q=${encodedAddress}`, '_blank')
  } else {
    // Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }
}

const confirmCancelJob = async () => {
  if (isCancellingJob.value) return
  
  isCancellingJob.value = true
  
  try {
    console.log('Cancelling accepted job:', {
      jobId: jobId,
      reason: cancelJobReason.value,
      seekerName: job.value.seeker.firstName
    })
    
    // US-8.4: Cancel payment authorization if job has a transaction
    if (job.value?.transactionId) {
      try {
        const { cancelPayment } = usePayments()
        const paymentResult = await cancelPayment(
          job.value.transactionId, 
          `Job vom Helfer storniert: ${cancelJobReason.value}`
        )
        
        if (!paymentResult.success) {
          console.error('Payment cancellation failed:', paymentResult.error)
          // Continue with job cancellation even if payment cancellation fails
        }
      } catch (error) {
        console.error('Payment cancellation error:', error)
        // Continue with job cancellation
      }
    }
    
    // Simulate job cancellation API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update job status
    job.value.status = 'cancelled_by_helper'
    job.value.cancelledAt = new Date().toISOString()
    job.value.cancellationReason = cancelJobReason.value
    
    // Show success message
    alert(`Job erfolgreich abgesagt. ${job.value.seeker.firstName} wurde benachrichtigt. Die Zahlung wurde storniert.`)
    
    // Reset dialog state
    showCancelJobDialog.value = false
    cancelJobReason.value = ''
    
    // Navigate back to dashboard
    navigateTo('/pwa')
    
  } catch (error) {
    console.error('Error cancelling job:', error)
    alert('Fehler beim Absagen des Jobs. Bitte versuchen Sie es erneut.')
  } finally {
    isCancellingJob.value = false
  }
}

// Job Start Method
const startJob = async () => {
  if (!job.value) return
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Starting job:', {
      jobId: jobId,
      helperName: currentHelperId.value,
      seekerName: job.value.seeker.firstName
    })
    
    // Update local state
    job.value.status = 'in_progress'
    job.value.started_at = new Date().toISOString()
    
    // Send push notification to seeker
    showPushNotification(
      `${job.value.seeker.firstName}, ${getCurrentHelperName()} hat den Job gestartet`,
      `Der Job "${job.value.title}" wurde jetzt begonnen.`,
      () => {
        // Navigate to seeker view when notification is clicked
        window.focus()
      }
    )
    
    // Show success message
    alert(`Job gestartet! ${job.value.seeker.firstName} wurde benachrichtigt.`)
    
  } catch (error) {
    console.error('Error starting job:', error)
    alert('Fehler beim Starten des Jobs. Bitte versuchen Sie es erneut.')
  }
}

// Job Completion Method
const confirmCompleteJob = async () => {
  if (isCompletingJob.value) return
  
  isCompletingJob.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Completing job:', {
      jobId: jobId,
      helperName: currentHelperId.value,
      seekerName: job.value.seeker.firstName
    })
    
    // Update local state
    job.value.completed_by_helper = true
    job.value.completed_at_by_helper = new Date().toISOString()
    
    // Send push notification to seeker
    showPushNotification(
      `${job.value.seeker.firstName}, ${getCurrentHelperName()} hat den Job abgeschlossen`,
      `Bitte bestätige die Abschluss des Jobs "${job.value.title}".`,
      () => {
        // Open seeker job detail page when notification is clicked
        window.focus()
      }
    )
    
    // Reset dialog state
    showCompleteJobDialog.value = false
    
    // Show success message
    alert(`Job als abgeschlossen markiert! ${job.value.seeker.firstName} wurde benachrichtigt und muss den Abschluss bestätigen.`)
    
  } catch (error) {
    console.error('Error completing job:', error)
    alert('Fehler beim Abschließen des Jobs. Bitte versuchen Sie es erneut.')
  } finally {
    isCompletingJob.value = false
  }
}

// Helper method to get current helper name
const getCurrentHelperName = () => {
  // In real app, get from current user profile
  return 'Max Mustermann'
}

// US-5.8: Submit helper problem report
const submitHelperProblem = async () => {
  if (isSubmittingProblem.value) return
  
  isSubmittingProblem.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Submitting helper problem report:', {
      jobId: jobId,
      problemType: helperProblemType.value,
      description: helperProblemDescription.value,
      shouldCancelJob: shouldCancelJob.value,
      seekerName: job.value.seeker.firstName
    })
    
    // Create support ticket (simulated)
    console.log('Support ticket created:', {
      jobId: jobId,
      type: 'helper_problem',
      helperId: currentHelperId.value,
      problemType: helperProblemType.value,
      description: helperProblemDescription.value,
      severity: 'medium'
    })
    
    // Handle job cancellation if requested
    if (shouldCancelJob.value) {
      job.value.status = 'cancelled_by_helper'
      job.value.cancelledAt = new Date().toISOString()
      
      // Send notification to seeker (simulated)
      showPushNotification(
        'Job abgesagt',
        `Der Helfer hat den Job "${job.value.title}" wegen eines Problems abgesagt.`,
        () => window.focus()
      )
    }
    
    let successMessage = `Problem wurde erfolgreich gemeldet.`
    
    if (shouldCancelJob.value) {
      successMessage += ` Der Job wurde abgesagt und ${job.value.seeker.firstName} wurde benachrichtigt.`
    } else {
      successMessage += ` Das Support-Team wird sich mit Ihnen in Verbindung setzen.`
    }
    
    // Show success message
    alert(successMessage)
    
    // Reset dialog state
    showHelperProblemDialog.value = false
    helperProblemType.value = ''
    helperProblemDescription.value = ''
    shouldCancelJob.value = false
    
    // If job was cancelled, navigate back
    if (shouldCancelJob.value) {
      navigateTo('/pwa')
    }
    
  } catch (error) {
    console.error('Error submitting problem report:', error)
    alert('Fehler beim Senden der Meldung. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmittingProblem.value = false
  }
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa')
      break
    case 'helper-earnings':
      navigateTo('/pwa/helper/earnings')
      break
    case 'seeker-create':
      navigateTo('/pwa/jobs/create/category')
      break
    case 'seeker-history':
      navigateTo('/pwa/jobs/my-jobs')
      break
    case 'seeker-favorites':
      navigateTo('/pwa/seeker/favorites')
      break
    case 'profile':
      navigateTo('/pwa/shared/profile')
      break
  }
}

// Initialize on mount
onMounted(async () => {
  // Request notification permission
  await requestNotificationPermission()
  
  // Load job data
  job.value = mockHelperJobs[jobId] || null
  
  if (!job.value) {
    alert('Job nicht gefunden')
    navigateTo('/pwa')
  }
  
  // Check if this job was just accepted (simulate push notification)
  if (job.value.status === 'accepted' && job.value.acceptedHelperId === currentHelperId.value) {
    const timeSinceAccepted = Date.now() - new Date(job.value.acceptedAt).getTime()
    
    // If accepted less than 30 seconds ago, show notification
    if (timeSinceAccepted < 30000) {
      hasNewJobNotification.value = true
      
      showPushNotification(
        `Glückwunsch! Du wurdest für '${job.value.title}' ausgewählt`,
        'Öffne die Job-Details um alle Informationen zu sehen.',
        () => {
          // Focus window when notification is clicked
          window.focus()
        }
      )
    }
  }
})
</script>

<style scoped>
/* Mobile First Design for Helper Job Detail */
.helper-job-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.helper-job-detail-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(95, 111, 85, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(190, 205, 163, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(143, 139, 130, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.mobile-container {
  padding: 1rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(95, 111, 85, 0.1);
  border-top: 3px solid #5F6F55;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

/* Job Header */
.job-header-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.job-category-display {
  width: 4rem;
  height: 4rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.category-icon {
  width: 2rem;
  height: 2rem;
  color: #5F6F55;
}

.job-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.distance-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.distance-icon {
  width: 1rem;
  height: 1rem;
}

/* Cards */
.job-details-card,
.seeker-info-card,
.application-status-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
}

/* Detail Grid */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-value {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
}

/* Location Info */
.location-info {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
}

.location-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Job Description */
.job-description {
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 1.5rem;
}

.description-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.description-text {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Seeker Info */
.seeker-profile {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.seeker-avatar {
  width: 3.5rem;
  height: 3.5rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.seeker-avatar-img {
  width: 1.75rem;
  height: 1.75rem;
  color: #5F6F55;
}

.seeker-details {
  flex: 1;
}

.seeker-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.seeker-name {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.seeker-badges {
  display: flex;
  gap: 0.5rem;
}

.verified-badge {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.verified-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.seeker-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.seeker-age {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.seeker-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-stars {
  color: #fbbf24;
  font-size: 0.875rem;
}

.rating-value {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
}

.rating-count {
  color: #6b7280;
  font-size: 0.875rem;
}

.seeker-bio {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.view-profile-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.view-profile-btn:hover {
  background: rgba(95, 111, 85, 0.2);
}

/* Application Status */
.apply-section,
.applied-section,
.accepted-section,
.full-section {
  text-align: center;
}

.apply-title,
.applied-title,
.accepted-title,
.full-title {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.apply-subtitle,
.applied-subtitle,
.accepted-subtitle,
.full-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.apply-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 3.5rem;
}

.apply-btn:hover {
  background: #4a5c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(95, 111, 85, 0.3);
}

.applied-icon-container,
.accepted-icon-container,
.full-icon-container {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.applied-icon-container {
  background: rgba(59, 130, 246, 0.1);
}

.accepted-icon-container {
  background: rgba(34, 197, 94, 0.1);
}

.full-icon-container {
  background: rgba(107, 114, 128, 0.1);
}

.applied-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
}

.accepted-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #22c55e;
}

.full-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
}

.applied-btn,
.full-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  opacity: 0.6;
}

/* Accepted Job Styles */
.full-address-card,
.contact-info-card {
  background: rgba(95, 111, 85, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
}

.full-address {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.address-line {
  color: #474747;
  font-weight: 500;
  font-size: 0.95rem;
}

.address-title,
.contact-title {
  color: #474747;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.contact-value {
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
}

.contact-phone {
  color: #5F6F55;
  text-decoration: none;
  font-weight: 600;
}

.contact-phone:hover {
  text-decoration: underline;
}

.accepted-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.chat-action-btn,
.route-btn,
.cancel-job-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.route-btn {
  background: #3b82f6;
}

.route-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.cancel-job-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.cancel-job-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

.chat-action-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

/* Cancel Job Dialog */
.cancel-job-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.cancellation-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.cancellation-notice.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.cancellation-notice.error .notice-text {
  color: #ef4444;
}

.cancellation-info {
  margin-bottom: 1.5rem;
}

.info-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.notice-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: #3b82f6;
}

.cancellation-notice.error .notice-icon {
  color: #ef4444;
}

.notice-text {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.reason-section {
  margin-bottom: 1.5rem;
}

.reason-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.reason-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
  transition: border-color 0.2s ease;
  background: white;
}

.reason-textarea:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.reason-textarea::placeholder {
  color: #9ca3af;
}

.confirm-cancel-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.confirm-cancel-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Job Action Buttons */
.job-action-btn {
  margin-top: 1rem;
}

.start-job-btn {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.start-job-btn:hover {
  background: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.complete-job-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.complete-job-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
}

/* Waiting Confirmation Screen */
.waiting-confirmation {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 1rem;
  text-align: center;
}

.waiting-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.waiting-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.waiting-title {
  color: #3b82f6;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.waiting-text {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

/* Job Completion Dialog */
.complete-job-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.complete-icon {
  width: 3rem;
  height: 3rem;
  color: #22c55e;
  margin-bottom: 1rem;
}

.completion-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  margin-bottom: 1.5rem;
}

.completion-notice .notice-icon {
  color: #22c55e;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.info-text {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.info-text p {
  margin: 0 0 0.5rem 0;
}

.info-text p:last-child {
  margin-bottom: 0;
}

.confirm-complete-btn {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.confirm-complete-btn:hover:not(:disabled) {
  background: #16a34a;
  transform: translateY(-1px);
}

.confirm-complete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cancel-complete-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-complete-btn:hover:not(:disabled) {
  background: rgba(107, 114, 128, 0.2);
}

.cancel-complete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Back Actions */
.back-actions {
  margin-bottom: 1.5rem;
}

.back-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.back-btn:hover {
  background: rgba(107, 114, 128, 0.2);
  transform: translateY(-1px);
}

/* Apply Dialog */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.apply-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.dialog-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.dialog-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

.dialog-content {
  text-align: left;
}

.message-section {
  margin-bottom: 1.5rem;
}

.message-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.message-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
  transition: border-color 0.2s ease;
  background: white;
}

.message-textarea:focus {
  outline: none;
  border-color: #5F6F55;
  box-shadow: 0 0 0 3px rgba(95, 111, 85, 0.1);
}

.message-textarea::placeholder {
  color: #9ca3af;
}

.char-counter {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.25rem;
}

.dialog-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.submit-apply-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3rem;
}

.submit-apply-btn:hover:not(:disabled) {
  background: #4a5c44;
  transform: translateY(-1px);
}

.submit-apply-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cancel-apply-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-apply-btn:hover:not(:disabled) {
  background: rgba(107, 114, 128, 0.2);
}

.cancel-apply-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

.spinning {
  animation: spin 1s linear infinite;
}

/* Tablet Optimizations */
@media (min-width: 768px) {
  .mobile-container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
  
  .job-header-card {
    padding: 3rem 2rem;
  }
  
  .job-category-display {
    width: 3rem;
    height: 3rem;
  }
  
  .category-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .job-title {
    font-size: 1.25rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
  .seeker-profile {
    align-items: center;
  }
  
  .dialog-actions {
    flex-direction: row;
  }
  
  .submit-apply-btn {
    flex: 2;
  }
  
  .cancel-apply-btn {
    flex: 1;
  }
}

/* US-5.8: Helper Problem Report Dialog */
.helper-problem-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.problem-info {
  background: rgba(249, 115, 22, 0.05);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.problem-info p {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 0.875rem;
}

.problem-info p:last-child {
  margin-bottom: 0;
}

.problem-info strong {
  color: #474747;
  font-weight: 600;
}

.problem-reason-section {
  margin-bottom: 1.5rem;
}

.cancel-job-section {
  margin-bottom: 1.5rem;
}

.checkbox-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;
}

.checkbox-option:hover {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.02);
}

.checkbox-option:has(input:checked) {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.05);
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0.125rem;
  transition: all 0.3s ease;
}

.checkbox-input:checked ~ .checkbox-custom {
  border-color: #5F6F55;
  background: #5F6F55;
}

.checkbox-input:checked ~ .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.375rem;
  height: 0.625rem;
  background: white;
  border-radius: 1px;
  clip-path: polygon(50% 100%, 0% 50%, 100% 0%);
}

.checkbox-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.submit-problem-btn {
  background: #f97316;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.submit-problem-btn:hover:not(:disabled) {
  background: #ea580c;
  transform: translateY(-1px);
}

.submit-problem-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cancel-problem-btn {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.cancel-problem-btn:hover {
  background: rgba(107, 114, 128, 0.2);
}

.report-problem-btn {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.report-problem-btn:hover {
  background: rgba(249, 115, 22, 0.2);
  transform: translateY(-1px);
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .spinning {
    animation: none;
  }
  
  .apply-btn:hover,
  .back-btn:hover,
  .submit-apply-btn:hover {
    transform: none;
  }
}
</style>