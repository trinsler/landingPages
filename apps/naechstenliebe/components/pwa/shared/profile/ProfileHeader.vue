<template>
  <div class="profile-header-container">
    <!-- Modern Profile Card -->
    <div class="section-card profile-hero">
      
      <!-- Section Header with Earnings, Edit Profile and Settings -->
      <div class="section-header">
        <div class="header-buttons">
          <button @click="$emit('goToEarnings')" class="earnings-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span>Verdienst</span>
          </button>
          <button @click="$emit('editProfile')" class="edit-profile-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <span>Bearbeiten</span>
          </button>
          <button @click="$emit('editProfile')" class="settings-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.50 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Profile Main Section -->
      <div class="profile-main-info">
        <!-- Avatar -->
        <div class="avatar-section">
          <div class="avatar-container">
            <div class="profile-avatar">
              <img v-if="userProfile.profilePicture" :src="userProfile.profilePicture" alt="Profilbild" class="avatar-image">
              <div v-else class="avatar-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
            
            <!-- Verification Badge -->
            <div class="verification-status" :class="userProfile.verificationStatus">
              <svg v-if="userProfile.verificationStatus === 'verified'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else-if="userProfile.verificationStatus === 'pending'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Profile Details -->
        <div class="profile-details">
          <div class="name-rating-row">
            <h1 class="profile-name">{{ userProfile.name }}, {{ userProfile.age }}</h1>
            <div class="rating-compact">
              <span class="stars" :style="{ '--rating': userProfile.rating }">★★★★★</span>
              <span class="rating-value">{{ userProfile.rating.toFixed(1) }}</span>
              <span class="rating-count">({{ userProfile.totalRatings }})</span>
            </div>
          </div>
          
          <div class="profile-meta">
            <div class="profile-location">
              <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ userProfile.city }}</span>
            </div>
            
            <div class="member-since">
              <svg class="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Seit {{ userProfile.memberSince }}</span>
            </div>
          </div>
          
          <!-- Organization Badge moved here -->
          <div v-if="userProfile.organization" class="organization-badge">
            <svg class="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span class="badge-text">{{ userProfile.organization }}</span>
          </div>
        </div>
      </div>


      <!-- Bio Section -->
      <div v-if="userProfile.bio" class="bio-section">
        <div class="bio-header">
          <svg class="bio-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="bio-title">Über mich</h3>
        </div>
        <p class="bio-text">{{ userProfile.bio }}</p>
      </div>

      <!-- Verification Success -->
      <div v-if="userProfile.verificationStatus === 'verified'" class="verification-success">
        <div class="success-indicator">
          <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="success-text">Verifiziert seit {{ userProfile.verificationDetails.verifiedDate }}</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userProfile: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['editProfile', 'retryVerification', 'goToEarnings'])
</script>

<style scoped>
/* Global SVG Fix */
svg {
  display: block;
  flex-shrink: 0;
}

/* Dashboard Style Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Profile Main Info */
.profile-main-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Avatar Section */
.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.avatar-container {
  position: relative;
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  background: #5F6F55;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px rgba(95, 111, 85, 0.2);
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  outline: none;
}

.avatar-placeholder {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* Verification Status Badge */
.verification-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.verification-status.verified {
  background: #5F6F55;
  color: white;
}

.verification-status.pending {
  background: #f59e0b;
  color: white;
}

.verification-status.rejected {
  background: #ef4444;
  color: white;
}

.verification-status svg {
  width: 0.75rem;
  height: 0.75rem;
}

/* Profile Details */
.profile-details {
  flex: 1;
  min-width: 0;
}

.profile-name {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.profile-location,
.member-since {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.location-icon,
.calendar-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

/* Rating Section */
.rating-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stars {
  font-size: 1.25rem;
  background: linear-gradient(90deg, #fbbf24 calc(var(--rating) * 20%), #e5e7eb calc(var(--rating) * 20%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.125rem;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-value {
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 700;
}

.rating-count {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Badges */
.badges-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.org-badge {
  background: #5F6F55;
  color: white;
}

.badge-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Bio Section */
.bio-section {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(95, 111, 85, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(95, 111, 85, 0.1);
}

.bio-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.bio-icon {
  width: 1rem;
  height: 1rem;
  color: #5F6F55;
}

.bio-title {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.bio-text {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

/* Verification Success */
.verification-success {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(95, 111, 85, 0.1);
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  color: #5F6F55;
  font-size: 0.875rem;
  font-weight: 500;
}

.success-icon {
  width: 0.875rem;
  height: 0.875rem;
}


/* Section Header */
.section-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(95, 111, 85, 0.1);
}

/* Header Buttons Container */
.header-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Earnings Button */
.earnings-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.earnings-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.earnings-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.earnings-btn span {
  white-space: nowrap;
}

/* Edit Profile Button */
.edit-profile-btn {
  background: linear-gradient(135deg, #5F6F55, #4a5c44);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(95, 111, 85, 0.2);
}

.edit-profile-btn:hover {
  background: linear-gradient(135deg, #4a5c44, #3d4d38);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.3);
}

.edit-profile-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.edit-profile-btn span {
  white-space: nowrap;
}

.settings-btn {
  background: rgba(95, 111, 85, 0.1);
  border: 1px solid rgba(95, 111, 85, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  color: #5F6F55;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-btn:hover {
  background: rgba(95, 111, 85, 0.15);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(95, 111, 85, 0.2);
}

.settings-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Name and Rating Row */
.name-rating-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.rating-compact {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.rating-compact .stars {
  font-size: 1rem;
  background: linear-gradient(90deg, #fbbf24 calc(var(--rating) * 20%), #e5e7eb calc(var(--rating) * 20%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.1rem;
}

.rating-compact .rating-value {
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 600;
}

.rating-compact .rating-count {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Organization Badge */
.organization-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(95, 111, 85, 0.1);
  color: #5F6F55;
  padding: 0.5rem 0.875rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(95, 111, 85, 0.2);
  margin-top: 0.5rem;
  transition: all 0.2s ease;
}

.organization-badge:hover {
  background: rgba(95, 111, 85, 0.15);
  transform: translateY(-1px);
}

.organization-badge .badge-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.organization-badge .badge-text {
  white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 479px) {
  .section-card {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  .profile-main-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .profile-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
  
  .avatar-placeholder svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .verification-status {
    width: 1rem;
    height: 1rem;
  }
  
  .verification-status svg {
    width: 0.625rem;
    height: 0.625rem;
  }
  
  .profile-name {
    font-size: 1.25rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .settings-btn {
    padding: 0.625rem;
  }
  
  .settings-btn svg {
    width: 1rem;
    height: 1rem;
  }
  
  .name-rating-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .rating-compact .stars {
    font-size: 0.875rem;
  }
  
  .rating-compact .rating-value {
    font-size: 0.75rem;
  }
  
  .rating-compact .rating-count {
    font-size: 0.7rem;
  }
  
  .organization-badge {
    font-size: 0.7rem;
    padding: 0.375rem 0.625rem;
  }
  
  .organization-badge .badge-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .header-buttons {
    gap: 0.5rem;
  }
  
  .edit-profile-btn {
    padding: 0.625rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .edit-profile-btn svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .earnings-btn {
    padding: 0.625rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .earnings-btn svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .profile-meta {
    justify-content: center;
    flex-direction: row;
    gap: 1rem;
  }
  
  .stars {
    font-size: 1.125rem;
  }
  
  .rating-value {
    font-size: 1rem;
  }
  
  .bio-section {
    padding: 1rem;
  }
}

@media (max-width: 767px) and (min-width: 480px) {
  .section-card {
    padding: 1.75rem;
  }
  
  .profile-main-info {
    gap: 1.25rem;
  }
}

@media (min-width: 768px) {
  .section-card {
    padding: 2.5rem;
  }
  
  .profile-avatar {
    width: 5rem;
    height: 5rem;
    border: 4px solid rgba(255, 255, 255, 0.8);
  }
  
  .avatar-placeholder svg {
    width: 2rem;
    height: 2rem;
  }
  
  .verification-status {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .verification-status svg {
    width: 1rem;
    height: 1rem;
  }
  
  .profile-name {
    font-size: 1.75rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .settings-btn {
    padding: 1rem;
  }
  
  .settings-btn svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .rating-compact .stars {
    font-size: 1.125rem;
  }
  
  .rating-compact .rating-value {
    font-size: 1rem;
  }
  
  .rating-compact .rating-count {
    font-size: 0.875rem;
  }
  
  .organization-badge {
    font-size: 0.875rem;
    padding: 0.625rem 1rem;
  }
  
  .organization-badge .badge-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .earnings-btn {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
  
  .earnings-btn svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  
  .profile-meta {
    flex-direction: row;
    gap: 1.5rem;
  }
}
</style>