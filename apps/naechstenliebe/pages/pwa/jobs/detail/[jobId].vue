<template>
  <div class="job-detail-container">
    <!-- Header Component -->
    <AppHeader 
      :title="job?.title || 'Job Details'"
      current-role="unified"
      :request-count="0"
      @open-requests="() => navigateTo('/pwa')"
      @open-profile="() => navigateTo('/pwa/shared/profile')"
      @open-news="() => navigateTo('/pwa/shared/news')"
      @toggle-role="() => navigateTo('/pwa')"
    />
    
    <div v-if="job" class="mobile-container">
      
      <!-- Job Header -->
      <div class="job-header-card">
        <div class="job-category-display">
          <img :src="job.categoryIcon" :alt="job.category" class="category-icon">
        </div>
        <h2 class="job-title">{{ job.title }}</h2>
        <div class="job-status-badge" :class="job.status">
          {{ getStatusText(job.status) }}
        </div>
      </div>

      <!-- Job Details -->
      <div class="job-details-card">
        <h3 class="section-title">Details</h3>
        
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
            <div class="detail-label">Zeitpunkt</div>
            <div class="detail-value">{{ formatJobTiming(job) }}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Erstellt</div>
            <div class="detail-value">{{ formatDate(job.createdAt) }}</div>
          </div>
        </div>

        <div v-if="job.description" class="job-description">
          <h4 class="description-title">Beschreibung</h4>
          <p class="description-text">{{ job.description }}</p>
        </div>
      </div>

      <!-- Applications (for open jobs) -->
      <div v-if="job.status === 'applications_received' && job.applications" class="applications-card">
        <h3 class="section-title">Bewerbungen ({{ job.applications.length }})</h3>
        
        <div class="applications-list">
          <div v-for="application in job.applications" :key="application.id" class="application-item">
            <div class="application-header">
              <div class="applicant-avatar">
                <img src="/icons/verschiedeneMenschen.svg" alt="Bewerber" class="avatar-img">
              </div>
              <div class="applicant-info">
                <h4 class="applicant-name">{{ application.helperName }}</h4>
                <div class="applicant-rating">
                  <span class="rating-stars">★★★★★</span>
                  <span class="rating-value">{{ application.rating }}</span>
                  <span class="rating-count">({{ application.reviewCount }})</span>
                </div>
              </div>
              <button @click="viewProfile(application.helperId)" class="view-profile-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Profil
              </button>
            </div>
            
            <p v-if="application.message" class="application-message">{{ application.message }}</p>
            
            <div class="application-actions">
              <button @click="acceptApplication(application)" class="accept-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Annehmen
              </button>
              <button @click="declineApplication(application)" class="decline-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Helper (for accepted/in_progress jobs) -->
      <div v-if="(job.status === 'accepted' || job.status === 'in_progress') && job.helper" class="helper-card">
        <h3 class="section-title">Ihr Helfer</h3>
        
        <div class="helper-info">
          <div class="helper-avatar">
            <img src="/icons/verschiedeneMenschen.svg" alt="Helfer" class="helper-avatar-img">
          </div>
          <div class="helper-details">
            <h4 class="helper-name">{{ job.helper.name }}</h4>
            <div class="helper-rating">
              <span class="rating-stars">★★★★★</span>
              <span class="rating-value">{{ job.helper.rating }}</span>
              <span class="rating-count">({{ job.helper.reviewCount }})</span>
            </div>
            <p class="helper-completion">{{ job.helper.completedJobs }} Jobs erfolgreich abgeschlossen</p>
          </div>
        </div>

        <div class="helper-actions">
          <button @click="openChat(job.helper.id)" class="chat-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.707-.408l-3.005.606C6.581 20.365 6 19.7 6 19c0-.28.115-.532.308-.742l.813-3.262A8.002 8.002 0 013 12a8 8 0 018-8 8 8 0 018 8z"/>
            </svg>
            Nachricht senden
          </button>
          <button @click="viewProfile(job.helper.id)" class="profile-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Profil ansehen
          </button>
        </div>

        <div v-if="canCompleteJob" class="job-progress">
          <!-- Waiting for Helper Confirmation -->
          <div v-if="job.completed_by_helper && !job.completed_by_seeker" class="waiting-helper-confirmation">
            <div class="waiting-content">
              <div class="waiting-spinner"></div>
              <h4 class="waiting-title">Helfer hat Job abgeschlossen</h4>
              <p class="waiting-text">{{ job.helper.name }} hat den Job als erledigt markiert. Bitte bestätigen Sie, ob der Helfer da war und den Job erledigt hat.</p>
            </div>
          </div>
          
          <!-- Regular Job Progress -->
          <div v-else class="progress-header">
            <h4 class="progress-title">Job Status</h4>
            <span class="progress-status">In Bearbeitung</span>
          </div>
          <p v-if="!job.completed_by_helper" class="progress-text">Der Helfer arbeitet gerade an Ihrem Auftrag</p>
          
          <button @click="markAsCompleted" class="complete-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Job abschließen
          </button>
        </div>
      </div>

      <!-- Completed Job Info -->
      <div v-if="job.status === 'completed'" class="completion-card">
        <div class="completion-header">
          <svg class="completion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="completion-title">Job abgeschlossen</h3>
        </div>
        
        <p class="completion-date">Erledigt am {{ formatDate(job.completedAt) }}</p>
        
        <div v-if="!job.hasRated" class="rating-prompt">
          <h4 class="rating-title">Bewerten Sie Ihren Helfer</h4>
          <p class="rating-subtitle">Ihre Bewertung hilft anderen Nutzern</p>
          <button @click="openRating" class="rating-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            Jetzt bewerten
          </button>
        </div>
        
        <div v-else class="rating-completed">
          <span class="rating-thanks">Vielen Dank für Ihre Bewertung!</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="job-actions">
        <button @click="goBackToJobs" class="back-btn">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
          </svg>
          Zurück zu meinen Jobs
        </button>
        
        <!-- Edit and Delete buttons for open jobs -->
        <div v-if="job.status === 'open' || job.status === 'applications_received'" class="job-edit-actions">
          <button @click="editJob" class="edit-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Bearbeiten
          </button>
          
          <button @click="showDeleteConfirmation = true" class="delete-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Job löschen
          </button>
        </div>
        
        <!-- Cancel button for accepted/in_progress jobs -->
        <div v-if="job.status === 'accepted' || job.status === 'in_progress'" class="job-cancel-actions">
          <button @click="showCancelConfirmation = true" class="cancel-job-btn">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Job stornieren
          </button>
        </div>
      </div>

      <!-- Delete Confirmation Dialog -->
      <div v-if="showDeleteConfirmation" class="confirmation-overlay" @click.self="showDeleteConfirmation = false">
        <div class="confirmation-dialog">
          <div class="confirmation-header">
            <svg class="confirmation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h3 class="confirmation-title">Job wirklich löschen?</h3>
          </div>
          
          <div class="confirmation-content">
            <p class="confirmation-text">{{ getDeleteConfirmationText() }}</p>
            
            <div class="confirmation-actions">
              <button @click="confirmDeleteJob" class="confirm-delete-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Ja, löschen
              </button>
              
              <button @click="showDeleteConfirmation = false" class="cancel-delete-btn">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cancel Job Confirmation Dialog -->
      <div v-if="showCancelConfirmation" class="confirmation-overlay" @click.self="showCancelConfirmation = false">
        <div class="confirmation-dialog cancel-dialog">
          <div class="confirmation-header">
            <svg class="confirmation-icon cancel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h3 class="confirmation-title">Job wirklich stornieren?</h3>
          </div>
          
          <div class="confirmation-content">
            <div class="cancel-info">
              <div class="helper-notification">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span class="info-text">{{ job?.helper?.name || 'Der Helfer' }} wird benachrichtigt</span>
              </div>
              
              <div class="cost-notice" :class="{ 'warning': getCostNoticeText().includes('Stornierungsgebühr') }">
                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <span class="info-text">{{ getCostNoticeText() }}</span>
              </div>
            </div>
            
            <div class="reason-section">
              <label class="reason-label" for="cancelReason">Grund der Stornierung (optional)</label>
              <textarea 
                v-model="cancelReason"
                id="cancelReason"
                class="reason-textarea"
                placeholder="z.B. 'Ich habe es selbst erledigt' oder 'Termin hat sich geändert'"
                rows="3"
                maxlength="200"
              ></textarea>
              <div class="char-counter">{{ cancelReason.length }}/200</div>
            </div>
            
            <div class="confirmation-actions">
              <button @click="confirmCancelJob" class="confirm-cancel-btn">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Ja, stornieren
              </button>
              
              <button @click="showCancelConfirmation = false" class="cancel-action-btn">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- US-5.5: Job Completion Dialog -->
      <div v-if="showCompleteJobDialog" class="confirmation-overlay" @click.self="showCompleteJobDialog = false">
        <div class="completion-confirmation-dialog">
          <div class="confirmation-header">
            <svg class="confirmation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="confirmation-title">Job abgeschlossen?</h3>
            <p class="confirmation-subtitle">War der Helfer da und hat den Job erledigt?</p>
          </div>
          
          <div class="confirmation-content">
            <div class="radio-options">
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperWasThere" 
                  value="yes"
                  name="helperPresence"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Ja, alles erledigt</div>
                  <div class="option-subtitle">Der Helfer war da und hat den Job wie vereinbart erledigt</div>
                </div>
              </label>
              
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="helperWasThere" 
                  value="no"
                  name="helperPresence"
                  class="radio-input"
                >
                <span class="radio-custom"></span>
                <div class="option-content">
                  <div class="option-title">Nein, Helfer ist nicht erschienen</div>
                  <div class="option-subtitle">Der Helfer kam nicht oder hat den Job nicht erledigt</div>
                </div>
              </label>
            </div>
            
            <div class="confirmation-actions">
              <button 
                v-if="helperWasThere === 'yes'" 
                @click="confirmCompleteJob" 
                :disabled="isCompletingJob" 
                class="confirm-complete-btn"
              >
                <svg v-if="isCompletingJob" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ isCompletingJob ? 'Wird abgeschlossen...' : 'Job abschließen' }}
              </button>
              
              <button 
                v-if="helperWasThere === 'no'" 
                @click="showProblemReportDialog = true; showCompleteJobDialog = false" 
                class="problem-report-btn"
              >
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                Problem melden
              </button>
              
              <button @click="showCompleteJobDialog = false" :disabled="isCompletingJob" class="cancel-action-btn">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Problem Report Dialog -->
      <div v-if="showProblemReportDialog" class="confirmation-overlay" @click.self="showProblemReportDialog = false">
        <div class="problem-report-dialog">
          <div class="confirmation-header">
            <svg class="confirmation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h3 class="confirmation-title">Problem melden</h3>
            <p class="confirmation-subtitle">Beschreiben Sie bitte das Problem mit dem Helfer</p>
          </div>
          
          <div class="confirmation-content">
            <div class="problem-info">
              <p><strong>Helfer:</strong> {{ job?.helper?.name }}</p>
              <p><strong>Job:</strong> {{ job?.title }}</p>
              <p><strong>Problem:</strong> Helfer ist nicht erschienen</p>
            </div>
            
            <div class="reason-section">
              <label class="reason-label" for="problemDescription">Beschreibe das Problem *</label>
              <textarea 
                v-model="problemDescription"
                id="problemDescription"
                class="reason-textarea"
                placeholder="Bitte beschreiben Sie, was passiert ist..."
                rows="4"
                maxlength="300"
                required
              ></textarea>
              <div class="char-counter">{{ problemDescription.length }}/300</div>
            </div>
            
            <div class="job-action-section">
              <label class="section-label">Möchtest du den Job stornieren oder neu ausschreiben?</label>
              <div class="radio-options">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    v-model="jobAction" 
                    value="cancel"
                    name="jobAction"
                    class="radio-input"
                  >
                  <span class="radio-custom"></span>
                  <div class="option-content">
                    <div class="option-title">Job stornieren</div>
                    <div class="option-subtitle">Der Job wird storniert, es fallen keine Kosten an</div>
                  </div>
                </label>
                
                <label class="radio-option">
                  <input 
                    type="radio" 
                    v-model="jobAction" 
                    value="repost"
                    name="jobAction"
                    class="radio-input"
                  >
                  <span class="radio-custom"></span>
                  <div class="option-content">
                    <div class="option-title">Job neu ausschreiben</div>
                    <div class="option-subtitle">Der Job wird dupliziert und erneut ausgeschrieben</div>
                  </div>
                </label>
              </div>
            </div>
            
            <div class="confirmation-actions">
              <button 
                @click="reportProblem" 
                :disabled="isReportingProblem || !problemDescription.trim() || !jobAction" 
                class="confirm-problem-btn"
              >
                <svg v-if="isReportingProblem" class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                {{ isReportingProblem ? 'Wird gemeldet...' : 'Problem melden' }}
              </button>
              
              <button @click="showProblemReportDialog = false" :disabled="isReportingProblem" class="cancel-action-btn">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Loading state -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Job wird geladen...</p>
    </div>

    <!-- Footer Component -->
    <UnifiedFooter 
      active-tab="seeker-history"
      current-role="unified"
      @navigate="handleFooterNavigation"
    />

    <!-- Padding for bottom nav -->
    <div style="height: 5rem;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
const showDeleteConfirmation = ref(false)
const showCancelConfirmation = ref(false)
const showCompleteJobDialog = ref(false)
const showProblemReportDialog = ref(false)
const cancelReason = ref('')
const helperWasThere = ref('')
const isCompletingJob = ref(false)
const isReportingProblem = ref(false)
const hasNotificationPermission = ref(false)
const reminderTimeouts = ref([])
const problemDescription = ref('')
const jobAction = ref('') // 'cancel' or 'repost'

// Mock job data based on ID
const mockJobs = {
  '1': {
    id: 1,
    title: 'Einkaufen bei REWE',
    category: 'shopping',
    categoryIcon: '/icons/einkaufenMadl.svg',
    status: 'applications_received',
    price: 25,
    isImmediate: true,
    createdAt: new Date().toISOString(),
    description: 'Ich brauche jemanden, der für mich bei REWE einkauft. Die Einkaufsliste ist fertig (ca. 15 Artikel). Bezahlung erfolgt über die App. Einkauf soll heute Nachmittag stattfinden.',
    applications: [
      {
        id: 1,
        helperId: 'helper1',
        helperName: 'Maria H.',
        rating: 4.9,
        reviewCount: 47,
        message: 'Hallo! Ich kann gerne heute für Sie einkaufen. Bin sehr erfahren und zuverlässig.',
        appliedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        helperId: 'helper2',
        helperName: 'Klaus B.',
        rating: 4.7,
        reviewCount: 32,
        message: 'Ich wohne ganz in der Nähe von REWE und könnte sofort loslegen.',
        appliedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        helperId: 'helper3',
        helperName: 'Anna K.',
        rating: 4.8,
        reviewCount: 28,
        message: 'Gerne helfe ich Ihnen beim Einkaufen. Bin sehr sorgfältig bei der Auswahl.',
        appliedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ]
  },
  '2': {
    id: 2,
    title: 'Garten gießen',
    category: 'gardening',
    categoryIcon: '/icons/gießenBub.svg',
    status: 'in_progress',
    price: 15,
    isImmediate: false,
    scheduledDate: '2024-11-08', // Tomorrow for testing
    scheduledTime: '14:00',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'Meine Pflanzen brauchen Wasser, ich bin aber im Urlaub. Bitte alle Topfpflanzen und den kleinen Gemüsegarten gießen.',
    helper: {
      id: 'helper3',
      name: 'Anna K.',
      rating: 4.8,
      reviewCount: 28,
      completedJobs: 25
    },
    acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    transactionId: 'txn_garden_123' // US-8.3: Transaction ID for payment capture
  },
  '3': {
    id: 3,
    title: 'Mittagessen kochen',
    category: 'cooking',
    categoryIcon: '/icons/kochen.svg',
    status: 'completed',
    price: 30,
    isImmediate: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ich brauche ein gesundes Mittagessen für 2 Personen. Gerne etwas Vegetarisches.',
    helper: {
      id: 'helper1',
      name: 'Maria H.',
      rating: 4.9,
      reviewCount: 47,
      completedJobs: 45
    },
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    hasRated: false,
    completed_by_helper: true,
    completed_by_seeker: true,
    completed_at_by_helper: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at_by_seeker: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString()
  },
  '4': {
    id: 4,
    title: 'Einkauf in 30 Minuten',
    category: 'shopping',
    categoryIcon: '/icons/einkaufenMadl.svg',
    status: 'accepted',
    price: 20,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 30 * 60 * 1000).toISOString().split('T')[0], // 30 minutes from now
    scheduledTime: new Date(Date.now() + 30 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    description: 'Schneller Einkauf für das Abendessen. Liste ist schon fertig.',
    helper: {
      id: 'helper1',
      name: 'Maria H.',
      rating: 4.9,
      reviewCount: 47,
      completedJobs: 45
    },
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  '5': {
    id: 5,
    title: 'Begleitung zum Arzt',
    category: 'companionship',
    categoryIcon: '/icons/gesellschaft.svg',
    status: 'in_progress',
    price: 25,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 hours from now
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    description: 'Begleitung zum Arzttermin und Rückfahrt',
    helper: {
      id: 'helper1',
      name: 'Maria H.',
      rating: 4.9,
      reviewCount: 47,
      completedJobs: 45
    },
    acceptedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    started_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // Started 10 minutes ago
    completed_by_helper: false,
    completed_by_seeker: false,
    completed_at_by_helper: null,
    completed_at_by_seeker: null
  },
  '6': {
    id: 6,
    title: 'Wohnung putzen',
    category: 'cleaning',
    categoryIcon: '/icons/staubsaugen.svg',
    status: 'in_progress',
    price: 35,
    isImmediate: false,
    scheduledDate: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 hour from now
    scheduledTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    description: 'Gründliche Reinigung der Wohnung',
    helper: {
      id: 'helper2',
      name: 'Klaus B.',
      rating: 4.7,
      reviewCount: 32,
      completedJobs: 28
    },
    acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    started_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // Started 45 minutes ago
    completed_by_helper: true, // Helper marked as completed
    completed_by_seeker: false, // Seeker hasn't confirmed yet
    completed_at_by_helper: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // Helper completed 5 minutes ago
    completed_at_by_seeker: null
  }
}

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

// Check if job completion button should be visible
const canCompleteJob = computed(() => {
  if (!job.value) return false
  
  // Show button if job is in progress OR if helper has marked it complete
  return job.value.status === 'in_progress' || 
         (job.value.completed_by_helper && !job.value.completed_by_seeker)
})

// US-5.6: Setup timeout reminders for incomplete confirmations
const setupTimeoutReminders = () => {
  // Clear existing timeouts
  reminderTimeouts.value.forEach(timeout => clearTimeout(timeout))
  reminderTimeouts.value = []
  
  if (!job.value) return
  
  const now = new Date().getTime()
  
  // If helper completed but seeker hasn't confirmed
  if (job.value.completed_by_helper && !job.value.completed_by_seeker && job.value.completed_at_by_helper) {
    const completionTime = new Date(job.value.completed_at_by_helper).getTime()
    const timeSinceCompletion = now - completionTime
    
    // 24h reminder (only if less than 24h have passed)
    const timeUntil24h = 24 * 60 * 60 * 1000 - timeSinceCompletion
    if (timeUntil24h > 0) {
      const timeout24h = setTimeout(() => {
        showPushNotification(
          'Erinnerung: Job bestätigen',
          `Bitte bestätigen Sie ob ${job.value.helper.name} den Job "${job.value.title}" erledigt hat.`,
          () => window.focus()
        )
      }, timeUntil24h)
      reminderTimeouts.value.push(timeout24h)
    }
    
    // 48h automatic completion (only if less than 48h have passed)
    const timeUntil48h = 48 * 60 * 60 * 1000 - timeSinceCompletion
    if (timeUntil48h > 0) {
      const timeout48h = setTimeout(() => {
        // Auto-complete by system
        job.value.completed_by_seeker = true
        job.value.status = 'completed'
        job.value.completedAt = new Date().toISOString()
        
        showPushNotification(
          'Job automatisch abgeschlossen',
          `Der Job "${job.value.title}" wurde nach 48h automatisch abgeschlossen.`,
          () => window.focus()
        )
        
        // US-7.1: Rating notification after automatic completion
        setTimeout(() => {
          showPushNotification(
            `Wie war deine Erfahrung mit ${job.value.helper.name}?`,
            `Bewerte den Job "${job.value.title}" jetzt.`,
            () => navigateTo(`/pwa/jobs/rate/${jobId}`)
          )
        }, 2000)
        
        // US-7.6: Check for badge unlocks after job completion
        setTimeout(() => {
          checkForBadgeUnlocks('job_completion', {
            jobId: jobId,
            jobTitle: job.value.title,
            isAutomatic: true
          })
        }, 3000)
        
        // Show message to user
        alert(`Der Job "${job.value.title}" wurde nach 48h automatisch abgeschlossen. Die Zahlung wurde durchgeführt.`)
        
        // Navigate back to jobs
        navigateTo('/pwa/jobs/my-jobs')
      }, timeUntil48h)
      reminderTimeouts.value.push(timeout48h)
    }
  }
  
  // If seeker completed but helper hasn't confirmed
  if (job.value.completed_by_seeker && !job.value.completed_by_helper && job.value.completed_at_by_seeker) {
    const completionTime = new Date(job.value.completed_at_by_seeker).getTime()
    const timeSinceCompletion = now - completionTime
    
    // 24h reminder to helper
    const timeUntil24h = 24 * 60 * 60 * 1000 - timeSinceCompletion
    if (timeUntil24h > 0) {
      const timeout24h = setTimeout(() => {
        // This would normally send to helper, for demo we show to seeker
        showPushNotification(
          'Erinnerung gesendet',
          `Eine Erinnerung wurde an ${job.value.helper.name} gesendet, den Job zu bestätigen.`,
          () => window.focus()
        )
      }, timeUntil24h)
      reminderTimeouts.value.push(timeout24h)
    }
    
    // 48h automatic completion
    const timeUntil48h = 48 * 60 * 60 * 1000 - timeSinceCompletion
    if (timeUntil48h > 0) {
      const timeout48h = setTimeout(() => {
        // Auto-complete by system
        job.value.completed_by_helper = true
        job.value.status = 'completed'
        job.value.completedAt = new Date().toISOString()
        
        showPushNotification(
          'Job automatisch abgeschlossen',
          `Der Job "${job.value.title}" wurde nach 48h automatisch abgeschlossen.`,
          () => window.focus()
        )
        
        // US-7.1: Rating notification after automatic completion
        setTimeout(() => {
          showPushNotification(
            `Wie war deine Erfahrung mit ${job.value.helper.name}?`,
            `Bewerte den Job "${job.value.title}" jetzt.`,
            () => navigateTo(`/pwa/jobs/rate/${jobId}`)
          )
        }, 2000)
        
        // US-7.6: Check for badge unlocks after job completion
        setTimeout(() => {
          checkForBadgeUnlocks('job_completion', {
            jobId: jobId,
            jobTitle: job.value.title,
            isAutomatic: true
          })
        }, 3000)
        
        // Show message to user
        alert(`Der Job "${job.value.title}" wurde nach 48h automatisch abgeschlossen. Die Zahlung wurde durchgeführt.`)
        
        // Navigate back to jobs
        navigateTo('/pwa/jobs/my-jobs')
      }, timeUntil48h)
      reminderTimeouts.value.push(timeout48h)
    }
  }
}

// Methods
const getStatusText = (status) => {
  const statusTexts = {
    'open': 'Offen',
    'applications_received': 'Bewerbungen erhalten',
    'accepted': 'Angenommen',
    'in_progress': 'In Arbeit',
    'completed': 'Abgeschlossen',
    'cancelled_by_seeker': 'Von mir abgebrochen',
    'cancelled_by_helper': 'Vom Helfer abgebrochen'
  }
  return statusTexts[status] || status
}

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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const acceptApplication = async (application) => {
  if (!confirm(`Möchten Sie ${application.helperName} als Helfer auswählen?`)) {
    return
  }

  try {
    // US-8.2: Create pre-authorization when accepting helper
    console.log('Accepting application and creating pre-authorization:', application)
    
    const { createPreAuthorization } = usePayments()
    const preAuthResult = await createPreAuthorization(
      job.value.id,
      'current_seeker_id', // In real app: get from auth context
      job.value.price
    )
    
    if (preAuthResult.success) {
      // Update job status and assign helper
      job.value.status = 'accepted'
      job.value.acceptedAt = new Date().toISOString()
      job.value.helper = {
        id: application.helperId,
        name: application.helperName,
        rating: application.rating,
        reviewCount: application.reviewCount
      }
      job.value.transactionId = preAuthResult.transaction.id
      
      alert(`${application.helperName} wurde als Helfer ausgewählt! Die Zahlung wurde autorisiert.`)
      
      // Send notification to helper
      showPushNotification(
        `${application.helperName}, Job zugewiesen!`,
        `Sie wurden für "${job.value.title}" ausgewählt.`,
        () => window.focus()
      )
      
      navigateTo('/pwa/jobs/my-jobs')
    } else {
      // Pre-authorization failed
      alert(`Fehler bei der Zahlungsautorisierung: ${preAuthResult.error}\n\nBitte überprüfen Sie Ihre Zahlungsmethode.`)
      
      // Navigate to payment methods if no payment method exists
      if (preAuthResult.error.includes('Keine Zahlungsmethode')) {
        if (confirm('Möchten Sie jetzt eine Zahlungsmethode hinzufügen?')) {
          navigateTo('/pwa/shared/payment-methods')
        }
      }
    }
  } catch (error) {
    console.error('Error accepting application:', error)
    alert('Fehler beim Auswählen des Helfers. Bitte versuchen Sie es erneut.')
  }
}

const declineApplication = (application) => {
  if (confirm(`Möchten Sie die Bewerbung von ${application.helperName} ablehnen?`)) {
    // In real app: API call to decline application
    console.log('Declining application:', application)
    alert('Bewerbung abgelehnt')
    // Remove from applications list
    const index = job.value.applications.findIndex(app => app.id === application.id)
    if (index > -1) {
      job.value.applications.splice(index, 1)
    }
  }
}

const viewProfile = (helperId) => {
  navigateTo(`/pwa/shared/profile/${helperId}?fromJob=true`)
}

const openChat = (helperId) => {
  navigateTo(`/pwa/shared/chat?helper=${helperId}`)
}

const markAsCompleted = () => {
  // Open completion dialog instead of simple confirmation
  showCompleteJobDialog.value = true
}

// US-5.5: Job completion confirmation
const confirmCompleteJob = async () => {
  if (isCompletingJob.value) return
  
  isCompletingJob.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Completing job:', {
      jobId: jobId,
      helperWasThere: helperWasThere.value,
      helperName: job.value?.helper?.name
    })
    
    // Update local state
    job.value.completed_by_seeker = true
    job.value.completed_at_by_seeker = new Date().toISOString()
    
    // Check if both parties have confirmed completion
    const bothConfirmed = job.value.completed_by_helper && job.value.completed_by_seeker
    
    if (bothConfirmed) {
      // Job is fully completed
      job.value.status = 'completed'
      job.value.completedAt = new Date().toISOString()
      
      // US-8.3: Capture payment when job is completed by both parties
      try {
        const { capturePayment } = usePayments()
        const paymentResult = await capturePayment(job.value.transactionId)
        
        if (paymentResult.success) {
          // Show success message
          alert(`Job "${job.value.title}" wurde erfolgreich abgeschlossen! Die Zahlung wurde durchgeführt.`)
          
          // US-7.1: Navigate to rating page
          setTimeout(() => {
            navigateTo(`/pwa/jobs/rate/${jobId}`)
          }, 1000)
        } else {
          throw new Error(paymentResult.error)
        }
      } catch (error) {
        console.error('Payment capture failed:', error)
        alert(`Job wurde abgeschlossen, aber es gab ein Problem mit der Zahlung: ${error.message}`)
        // Still navigate to rating page even if payment failed
        setTimeout(() => {
          navigateTo(`/pwa/jobs/rate/${jobId}`)
        }, 1000)
      }
      
    } else {
      // Only seeker confirmed, waiting for helper
      alert(`${job.value.helper.name} wurde benachrichtigt und muss den Job ebenfalls als abgeschlossen bestätigen.`)
      
      // Send push notification to helper
      showPushNotification(
        `${job.value.helper.name}, Job-Update!`,
        `Der Job "${job.value.title}" wurde als abgeschlossen bestätigt.`,
        () => {
          // In real app: navigate to helper job detail
          window.focus()
        }
      )
    }
    
    // Reset dialog state
    showCompleteJobDialog.value = false
    helperWasThere.value = ''
    
  } catch (error) {
    console.error('Error completing job:', error)
    alert('Fehler beim Abschließen des Jobs. Bitte versuchen Sie es erneut.')
  } finally {
    isCompletingJob.value = false
  }
}

// US-7.6: Badge Unlock System
const checkForBadgeUnlocks = async (trigger, data) => {
  try {
    // Simulate API call to check for new badge unlocks
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock badge unlock logic based on trigger
    const unlockedBadges = []
    
    if (trigger === 'job_completion') {
      // Check for completion-related badges
      if (data.jobId === '1' || Math.random() > 0.7) { // Simulate badge unlock
        unlockedBadges.push({
          id: Date.now(),
          name: 'Erster Schritt',
          description: 'Du hast deinen ersten Job erfolgreich abgeschlossen!',
          type: 'completion',
          rarity: 'common',
          xpReward: 10,
          icon: '🎯'
        })
      }
      
      // Check for milestone badges
      if (Math.random() > 0.8) {
        unlockedBadges.push({
          id: Date.now() + 1,
          name: 'Wochenend Krieger',
          description: 'Du hast einen Job am Wochenende abgeschlossen!',
          type: 'special',
          rarity: 'common',
          xpReward: 25,
          icon: '🌟'
        })
      }
    }
    
    // Show unlock notifications for each badge
    unlockedBadges.forEach(badge => {
      showPushNotification(
        `🏆 Auszeichnung freigeschaltet: ${badge.name}!`,
        `${badge.description} +${badge.xpReward} XP`,
        () => {
          // Navigate to badges page
          navigateTo('/pwa/profile/badges')
        }
      )
      
      // Also create in-app notification
      setTimeout(() => {
        alert(`🎉 Glückwunsch! Du hast die Auszeichnung "${badge.name}" freigeschaltet!\n\n${badge.description}\n\n+${badge.xpReward} XP`)
      }, 1000)
    })
    
    if (unlockedBadges.length > 0) {
      console.log('Badges unlocked:', unlockedBadges)
      
      // Simulate updating user stats
      const totalXPGained = unlockedBadges.reduce((sum, badge) => sum + badge.xpReward, 0)
      console.log(`Total XP gained: ${totalXPGained}`)
    }
    
  } catch (error) {
    console.error('Error checking badge unlocks:', error)
  }
}

// US-7.5: 3-Strikes Banning System for No-Shows
const checkAndApplyThreeStrikesRule = async (helperId) => {
  try {
    // Simulate API call to get helper's no-show history
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock helper data - in real app would come from database
    const mockHelperData = {
      [helperId]: {
        no_show_count: job.value.helper.no_show_count || 0,
        is_banned: false,
        ban_until: null
      }
    }
    
    const helperData = mockHelperData[helperId]
    const newNoShowCount = helperData.no_show_count + 1
    
    console.log(`Helper ${helperId} no-show count: ${helperData.no_show_count} -> ${newNoShowCount}`)
    
    if (newNoShowCount >= 3) {
      // Apply 7-day ban
      const banUntil = new Date()
      banUntil.setDate(banUntil.getDate() + 7)
      
      helperData.is_banned = true
      helperData.ban_until = banUntil.toISOString()
      helperData.no_show_count = newNoShowCount
      
      console.log(`Helper ${helperId} banned until ${banUntil.toISOString()}`)
      
      // Send ban notification to helper
      showPushNotification(
        'Dein Account wurde temporär gesperrt',
        `Aufgrund von 3 No-Shows wurde dein Account für 7 Tage gesperrt. Bitte überprüfe deine Zuverlässigkeit.`,
        () => window.focus()
      )
      
      // Send email notification (simulated)
      console.log('Ban email sent to helper:', {
        helperId: helperId,
        banReason: '3 no-shows',
        banUntil: banUntil.toISOString(),
        message: 'Your account has been temporarily banned due to 3 no-shows. You will be unable to accept new jobs for 7 days.'
      })
      
      // Create support ticket for ban review (simulated)
      console.log('Support ticket created for ban review:', {
        helperId: helperId,
        type: 'automatic_ban',
        reason: '3_no_shows',
        banUntil: banUntil.toISOString(),
        requires_review: true
      })
      
      return {
        banned: true,
        banDuration: 7,
        banUntil: banUntil.toISOString(),
        message: 'Helper has been banned for 7 days due to 3 no-shows'
      }
    } else {
      // Update no-show count
      helperData.no_show_count = newNoShowCount
      
      // Send warning notification
      const remainingStrikes = 3 - newNoShowCount
      showPushNotification(
        `Warnung: No-Show registriert`,
        `Dies ist dein ${newNoShowCount}. No-Show. Bei 3 No-Shows wird dein Account temporär gesperrt.`,
        () => window.focus()
      )
      
      return {
        banned: false,
        noShowCount: newNoShowCount,
        remainingStrikes: remainingStrikes,
        message: `Helper has ${newNoShowCount} no-shows. ${remainingStrikes} more until ban.`
      }
    }
  } catch (error) {
    console.error('Error checking 3-strikes rule:', error)
    return {
      error: true,
      message: 'Failed to check helper status'
    }
  }
}

// US-5.7: Enhanced problem reporting when helper didn't show up
const reportProblem = async () => {
  if (isReportingProblem.value) return
  
  isReportingProblem.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Reporting problem:', {
      jobId: jobId,
      problem: 'helper_not_shown',
      helperName: job.value?.helper?.name,
      description: problemDescription.value,
      action: jobAction.value
    })
    
    // Update job status
    job.value.status = 'cancelled_by_helper'
    job.value.cancelledAt = new Date().toISOString()
    
    // US-7.5: Automatically create bad rating for no-show
    const badRatingData = {
      jobId: jobId,
      helperId: job.value.helper.id,
      rating: 1, // Automatic 1-star rating
      showed_up: false, // Explicitly false for no-show
      recommend: false, // Automatically not recommended
      comment: 'Systemgenerierte Bewertung: Helfer ist nicht zum vereinbarten Termin erschienen.',
      jobTitle: job.value.title,
      reviewed_at: new Date().toISOString(),
      is_system_generated: true,
      reason: 'no_show'
    }
    
    console.log('Creating automatic bad rating:', badRatingData)
    
    // Send notification to helper about the bad rating
    showPushNotification(
      `Du wurdest für den Job "${job.value.title}" als nicht erschienen gemeldet.`,
      'Eine schlechte Bewertung wurde automatisch erstellt.',
      () => window.focus()
    )
    
    // US-7.5: Check helper's no-show count and implement 3-strikes system
    const strikesResult = await checkAndApplyThreeStrikesRule(job.value.helper.id)
    
    // Create support ticket (simulated)
    console.log('Support ticket created:', {
      jobId: jobId,
      type: 'helper_no_show',
      helperId: job.value?.helper?.id,
      description: problemDescription.value,
      severity: strikesResult.banned ? 'high' : 'medium',
      ban_info: strikesResult.banned ? strikesResult : null
    })
    
    let successMessage = `Problem wurde gemeldet. ${job.value.helper.name} wird benachrichtigt.`
    
    if (strikesResult.banned) {
      const banEndDate = new Date(strikesResult.banUntil).toLocaleDateString('de-DE')
      successMessage += ` Aufgrund von 3 No-Shows wurde der Helfer für 7 Tage gesperrt (bis ${banEndDate}).`
    } else {
      successMessage += ` Dies ist der ${strikesResult.noShowCount}. No-Show des Helfers.`
      if (strikesResult.remainingStrikes <= 1) {
        successMessage += ` Bei einem weiteren No-Show wird der Helfer gesperrt.`
      }
    }
    
    // Handle job action
    if (jobAction.value === 'repost') {
      successMessage += ` Ihr Job wurde neu ausgeschrieben.`
      
      // In real app: API call to duplicate job
      setTimeout(() => {
        alert('Ihr Job wurde erfolgreich neu ausgeschrieben und ist jetzt verfügbar.')
      }, 2500)
      
    } else {
      successMessage += ` Der Job wurde storniert.`
    }
    
    // Show success message
    alert(successMessage)
    
    // Reset dialog state
    showProblemReportDialog.value = false
    problemDescription.value = ''
    jobAction.value = ''
    
    // Navigate back to jobs
    navigateTo('/pwa/jobs/my-jobs')
    
  } catch (error) {
    console.error('Error reporting problem:', error)
    alert('Fehler beim Senden der Meldung. Bitte versuchen Sie es erneut.')
  } finally {
    isReportingProblem.value = false
  }
}

const openRating = () => {
  navigateTo(`/pwa/jobs/rate/${jobId}`)
}

const editJob = () => {
  navigateTo(`/pwa/jobs/edit/${jobId}`)
}

const getCostNoticeText = () => {
  if (!job.value) return ''
  
  // Calculate time until scheduled start
  let hoursUntilStart = 0
  
  if (job.value.isImmediate) {
    // For immediate jobs, assume they should start within 1 hour
    hoursUntilStart = 1
  } else if (job.value.scheduledDate && job.value.scheduledTime) {
    const scheduledDateTime = new Date(job.value.scheduledDate + 'T' + job.value.scheduledTime)
    const now = new Date()
    hoursUntilStart = (scheduledDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
  }
  
  if (hoursUntilStart > 2) {
    return 'Keine Kosten, da mehr als 2h vor Termin'
  } else {
    return 'Stornierungsgebühr fällt an (weniger als 2h vor Termin)'
  }
}

const confirmCancelJob = async () => {
  try {
    // In real app: API call to cancel job
    console.log('Cancelling job:', {
      jobId: jobId,
      reason: cancelReason.value,
      helperName: job.value?.helper?.name
    })
    
    // US-8.4: Cancel payment authorization if job has a transaction
    if (job.value?.transactionId) {
      try {
        const { cancelPayment } = usePayments()
        const paymentResult = await cancelPayment(
          job.value.transactionId, 
          `Job storniert: ${cancelReason.value}`
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update job status
    job.value.status = 'cancelled_by_seeker'
    job.value.cancelledAt = new Date().toISOString()
    job.value.cancellationReason = cancelReason.value
    
    // Show success message
    const helperName = job.value?.helper?.name || 'Der Helfer'
    alert(`Job erfolgreich storniert. ${helperName} wurde benachrichtigt. Die Zahlung wurde storniert.`)
    
    // Reset state
    showCancelConfirmation.value = false
    cancelReason.value = ''
    
    // Navigate back to job list
    navigateTo('/pwa/jobs/my-jobs')
    
  } catch (error) {
    console.error('Error cancelling job:', error)
    alert('Fehler beim Stornieren des Jobs. Bitte versuchen Sie es erneut.')
  }
}

const getDeleteConfirmationText = () => {
  if (job.value?.status === 'applications_received' && job.value?.applications?.length > 0) {
    const count = job.value.applications.length
    return `Dieser Job hat bereits ${count} Bewerbung${count > 1 ? 'en' : ''}. Alle Bewerber werden über die Stornierung benachrichtigt.`
  }
  return 'Dieser Job wird permanent gelöscht und kann nicht wiederhergestellt werden.'
}

const confirmDeleteJob = async () => {
  try {
    // In real app: API call to cancel job
    console.log('Deleting job:', jobId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message based on applications
    const hasApplications = job.value?.status === 'applications_received' && job.value?.applications?.length > 0
    const message = hasApplications 
      ? `Job gelöscht. ${job.value.applications.length} Bewerber wurden benachrichtigt.`
      : 'Job erfolgreich gelöscht.'
    
    alert(message)
    
    showDeleteConfirmation.value = false
    navigateTo('/pwa/jobs/my-jobs')
    
  } catch (error) {
    console.error('Error deleting job:', error)
    alert('Fehler beim Löschen des Jobs. Bitte versuchen Sie es erneut.')
  }
}

const goBackToJobs = () => {
  navigateTo('/pwa/jobs/my-jobs')
}

// Footer navigation
const handleFooterNavigation = (tab) => {
  switch(tab) {
    case 'dashboard':
      navigateTo('/pwa')
      break
    case 'helper-tasks':
      navigateTo('/pwa/helper/tasks')
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
  job.value = mockJobs[jobId] || null
  
  if (!job.value) {
    alert('Job nicht gefunden')
    navigateTo('/pwa/jobs/my-jobs')
  }
  
  // Check if helper just completed the job (simulate push notification)
  if (job.value.completed_by_helper && !job.value.completed_by_seeker) {
    const timeSinceHelperCompletion = Date.now() - new Date(job.value.completed_at_by_helper).getTime()
    
    // If helper completed less than 30 seconds ago, show notification
    if (timeSinceHelperCompletion < 30000) {
      showPushNotification(
        `${job.value.helper.name} hat den Job "${job.value.title}" abgeschlossen`,
        'Bitte bestätigen Sie den Abschluss in der App.',
        () => {
          // Focus window when notification is clicked
          window.focus()
        }
      )
    }
  }
  
  // Setup timeout reminders
  setupTimeoutReminders()
})

// Cleanup timeouts on unmount
onUnmounted(() => {
  reminderTimeouts.value.forEach(timeout => clearTimeout(timeout))
  reminderTimeouts.value = []
})
</script>

<style scoped>
/* Mobile First Design for Job Detail */
.job-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

.job-detail-container::before {
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
}

.job-title {
  color: #474747;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.job-status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.job-status-badge.open {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.job-status-badge.applications_received {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.job-status-badge.accepted,
.job-status-badge.in_progress {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.job-status-badge.completed {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.job-status-badge.cancelled_by_seeker,
.job-status-badge.cancelled_by_helper {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Cards */
.job-details-card,
.applications-card,
.helper-card,
.completion-card {
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

/* Applications */
.applications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.application-item {
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 16px;
  padding: 1.25rem;
}

.application-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.applicant-avatar {
  width: 3rem;
  height: 3rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-img {
  width: 1.5rem;
  height: 1.5rem;
}

.applicant-info {
  flex: 1;
}

.applicant-name {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.applicant-rating {
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

.view-profile-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.view-profile-btn:hover {
  background: rgba(95, 111, 85, 0.2);
}

.application-message {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  padding: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 8px;
}

.application-actions {
  display: flex;
  gap: 0.75rem;
}

.accept-btn {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.accept-btn:hover {
  background: #16a34a;
}

.decline-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.decline-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Helper Info */
.helper-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.helper-avatar {
  width: 4rem;
  height: 4rem;
  background: #BECDA3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.helper-avatar-img {
  width: 2rem;
  height: 2rem;
}

.helper-details {
  flex: 1;
}

.helper-name {
  color: #474747;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.helper-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.helper-completion {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.helper-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.chat-btn,
.profile-btn {
  background: #5F6F55;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.profile-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
}

.chat-btn:hover {
  background: #4a5c44;
}

.profile-btn:hover {
  background: rgba(95, 111, 85, 0.2);
}

/* Job Progress */
.job-progress {
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.progress-status {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.progress-text {
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.complete-btn {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.complete-btn:hover {
  background: #16a34a;
}

/* Completion Card */
.completion-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.completion-icon {
  width: 2rem;
  height: 2rem;
  color: #22c55e;
}

.completion-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.completion-date {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
}

.rating-prompt {
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 1.5rem;
}

.rating-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.rating-subtitle {
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.rating-btn {
  background: #fbbf24;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.rating-btn:hover {
  background: #f59e0b;
}

.rating-completed {
  text-align: center;
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.rating-thanks {
  color: #22c55e;
  font-weight: 600;
}

/* Job Actions */
.job-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.job-edit-actions {
  display: flex;
  gap: 1rem;
}

.back-btn {
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  border: 1px solid rgba(95, 111, 85, 0.2);
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
}

.back-btn:hover {
  background: rgba(95, 111, 85, 0.2);
}

.cancel-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
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
}

.cancel-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Edit and Delete Buttons */
.edit-btn {
  background: #5F6F55;
  color: white;
  border: none;
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
  flex: 1;
}

.edit-btn:hover {
  background: #4a5c44;
  transform: translateY(-1px);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
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
  flex: 1;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

/* Confirmation Dialog */
.confirmation-overlay {
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

.confirmation-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.confirmation-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.confirmation-icon {
  width: 3rem;
  height: 3rem;
  color: #f59e0b;
  margin-bottom: 1rem;
}

.confirmation-title {
  color: #474747;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.confirmation-content {
  text-align: center;
}

.confirmation-text {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.confirm-delete-btn {
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

.confirm-delete-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.cancel-delete-btn {
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

.cancel-delete-btn:hover {
  background: rgba(107, 114, 128, 0.2);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* Cancel Job Button */
.job-cancel-actions {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.cancel-job-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex: 1;
}

.cancel-job-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

/* Cancel Dialog Styles */
.cancel-dialog {
  max-width: 500px;
}

.cancel-icon {
  color: #ef4444;
}

.cancel-info {
  margin-bottom: 1.5rem;
}

.helper-notification,
.cost-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.helper-notification {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.cost-notice {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.cost-notice.warning {
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
}

.info-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.helper-notification .info-icon {
  color: #3b82f6;
}

.cost-notice .info-icon {
  color: #22c55e;
}

.cost-notice.warning .info-icon {
  color: #f97316;
}

.info-text {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
}

.reason-section {
  margin-bottom: 1.5rem;
}

.job-action-section {
  margin-bottom: 1.5rem;
}

.section-label {
  display: block;
  color: #474747;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

.char-counter {
  color: #6b7280;
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.25rem;
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

.cancel-action-btn {
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

.cancel-action-btn:hover {
  background: rgba(107, 114, 128, 0.2);
}

/* Job Completion Dialog */
.completion-confirmation-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.confirmation-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
  line-height: 1.5;
}

/* Radio Options */
.radio-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.radio-option:hover {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.02);
}

.radio-option:has(input:checked) {
  border-color: #5F6F55;
  background: rgba(95, 111, 85, 0.05);
}

.radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  margin-top: 0.125rem;
  transition: all 0.3s ease;
}

.radio-input:checked ~ .radio-custom {
  border-color: #5F6F55;
  background: #5F6F55;
}

.radio-input:checked ~ .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.375rem;
  height: 0.375rem;
  background: white;
  border-radius: 50%;
}

.option-content {
  flex: 1;
}

.option-title {
  color: #474747;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.option-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
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
  width: 100%;
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

.problem-report-btn {
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

.problem-report-btn:hover {
  background: #ea580c;
  transform: translateY(-1px);
}

/* Problem Report Dialog */
.problem-report-dialog {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
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

.confirm-problem-btn {
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

.confirm-problem-btn:hover:not(:disabled) {
  background: #ea580c;
  transform: translateY(-1px);
}

.confirm-problem-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Waiting Helper Confirmation */
.waiting-helper-confirmation {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.waiting-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.waiting-spinner {
  width: 2.5rem;
  height: 2.5rem;
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
  
  .application-actions,
  .helper-actions,
  .job-actions {
    flex-direction: row;
  }
}

/* Desktop Optimizations */
@media (min-width: 1024px) {
  .mobile-container {
    max-width: 1024px;
  }
}
</style>