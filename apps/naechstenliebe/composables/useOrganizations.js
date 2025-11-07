import { ref, computed, readonly } from 'vue'

// Global state for organizations
const organizations = ref([])
const currentUserOrganization = ref(null)
const isLoading = ref(false)
const error = ref(null)

export const useOrganizations = () => {
  
  // US-9.1: Create organization
  const createOrganization = async (organizationData) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate required fields
      if (!organizationData.name || !organizationData.type || !organizationData.email || !organizationData.address) {
        throw new Error('Bitte füllen Sie alle Pflichtfelder aus.')
      }

      // Check if name is unique
      const existingOrg = await checkOrganizationNameExists(organizationData.name)
      if (existingOrg) {
        throw new Error('Eine Organisation mit diesem Namen existiert bereits.')
      }

      // Create organization
      const newOrganization = {
        id: `org_${Date.now()}`,
        name: organizationData.name,
        type: organizationData.type,
        description: organizationData.description || '',
        logo_url: organizationData.logoUrl || null,
        website: organizationData.website || null,
        contact_email: organizationData.email,
        contact_phone: organizationData.phone || null,
        address: organizationData.address,
        admin_user_id: 'current_user_id', // In real app: get from auth
        is_verified: false,
        verification_document_url: null,
        verification_status: 'pending',
        total_members: 1, // Admin is first member
        total_jobs_posted: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Save to database (simulated)
      await saveOrganization(newOrganization)
      
      // Update current user's organization
      currentUserOrganization.value = newOrganization
      
      // Add to organizations list
      organizations.value.push(newOrganization)

      return {
        success: true,
        organization: newOrganization,
        message: 'Organisation wurde erfolgreich erstellt!'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to create organization:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // US-9.1: Upload verification document
  const uploadVerificationDocument = async (organizationId, file) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate file
      if (!file) {
        throw new Error('Bitte wählen Sie eine Datei aus.')
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('Die Datei ist zu groß. Maximum 10MB.')
      }

      if (!['application/pdf'].includes(file.type)) {
        throw new Error('Nur PDF-Dateien sind erlaubt.')
      }

      // Simulate file upload
      const fileUrl = await uploadFile(file)
      
      // Update organization
      const organization = organizations.value.find(org => org.id === organizationId)
      if (organization) {
        organization.verification_document_url = fileUrl
        organization.verification_status = 'submitted'
        organization.updated_at = new Date().toISOString()
        
        // Update in database
        await updateOrganization(organization)
        
        // Update current user org if it's the same
        if (currentUserOrganization.value?.id === organizationId) {
          currentUserOrganization.value = { ...organization }
        }
      }

      return {
        success: true,
        message: 'Verifizierungsdokument wurde hochgeladen. Die Prüfung dauert 1-3 Tage.'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to upload verification document:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // US-9.2: Search organizations
  const searchOrganizations = async (query) => {
    if (!query || query.length < 2) {
      return []
    }

    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const results = organizations.value.filter(org => 
        org.name.toLowerCase().includes(query.toLowerCase()) ||
        org.type.toLowerCase().includes(query.toLowerCase())
      )
      
      return results
    } catch (err) {
      console.error('Search failed:', err)
      return []
    }
  }

  // US-9.2: Request to join organization
  const requestToJoinOrganization = async (organizationId) => {
    isLoading.value = true
    error.value = null
    
    try {
      const organization = organizations.value.find(org => org.id === organizationId)
      if (!organization) {
        throw new Error('Organisation nicht gefunden.')
      }

      // Create membership request
      const membershipRequest = {
        id: `req_${Date.now()}`,
        user_id: 'current_user_id', // In real app: get from auth
        organization_id: organizationId,
        status: 'pending',
        requested_at: new Date().toISOString(),
        user_name: 'Max Mustermann', // In real app: get from user profile
        user_age: 25,
        user_rating: 4.8,
        user_avatar: null
      }

      // Save request
      await saveMembershipRequest(membershipRequest)
      
      // Send notification to admin (simulated)
      await sendNotificationToAdmin(organization.admin_user_id, {
        title: 'Neue Beitritts-Anfrage',
        body: `${membershipRequest.user_name} möchte deiner Organisation beitreten.`,
        data: { type: 'membership_request', organizationId, requestId: membershipRequest.id }
      })

      return {
        success: true,
        message: 'Beitritts-Anfrage wurde gesendet. Du erhältst eine Benachrichtigung, wenn sie bearbeitet wurde.'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to request membership:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // US-9.3: Get membership requests for admin
  const getMembershipRequests = async (organizationId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return await fetchMembershipRequests(organizationId)
    } catch (err) {
      console.error('Failed to fetch membership requests:', err)
      return []
    }
  }

  // US-9.3: Accept membership request
  const acceptMembershipRequest = async (requestId) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Get request details
      const request = await getMembershipRequest(requestId)
      if (!request) {
        throw new Error('Anfrage nicht gefunden.')
      }

      // Update user's organization
      await updateUserOrganization(request.user_id, request.organization_id)
      
      // Update request status
      await updateMembershipRequestStatus(requestId, 'accepted')
      
      // Update organization member count
      const organization = organizations.value.find(org => org.id === request.organization_id)
      if (organization) {
        organization.total_members += 1
        await updateOrganization(organization)
      }
      
      // Send notification to user
      await sendNotificationToUser(request.user_id, {
        title: 'Beitritt bestätigt!',
        body: `Du bist jetzt Mitglied von ${organization?.name}!`,
        data: { type: 'membership_accepted', organizationId: request.organization_id }
      })

      return {
        success: true,
        message: 'Mitgliedschaft wurde bestätigt.'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to accept membership:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // US-9.3: Reject membership request
  const rejectMembershipRequest = async (requestId) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Update request status
      await updateMembershipRequestStatus(requestId, 'rejected')

      return {
        success: true,
        message: 'Anfrage wurde abgelehnt.'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to reject membership:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // US-9.4: Get organization by ID
  const getOrganizationById = async (organizationId) => {
    try {
      const organization = organizations.value.find(org => org.id === organizationId)
      if (organization) {
        return organization
      }
      
      // If not in cache, fetch from API
      return await fetchOrganization(organizationId)
    } catch (err) {
      console.error('Failed to get organization:', err)
      return null
    }
  }

  // Load user's organization
  const loadUserOrganization = async (userId) => {
    try {
      const userOrg = await fetchUserOrganization(userId)
      currentUserOrganization.value = userOrg
      return userOrg
    } catch (err) {
      console.error('Failed to load user organization:', err)
      return null
    }
  }

  // Check if user is organization admin
  const isOrganizationAdmin = computed(() => {
    return currentUserOrganization.value?.admin_user_id === 'current_user_id'
  })

  // Check if user has organization
  const hasOrganization = computed(() => {
    return currentUserOrganization.value !== null
  })

  return {
    // State
    organizations: readonly(organizations),
    currentUserOrganization: readonly(currentUserOrganization),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    isOrganizationAdmin,
    hasOrganization,
    
    // Methods
    createOrganization,
    uploadVerificationDocument,
    searchOrganizations,
    requestToJoinOrganization,
    getMembershipRequests,
    acceptMembershipRequest,
    rejectMembershipRequest,
    getOrganizationById,
    loadUserOrganization
  }
}

// Mock API functions - In real app, these would call actual backend APIs
async function checkOrganizationNameExists(name) {
  await new Promise(resolve => setTimeout(resolve, 300))
  // Simulate checking if name exists
  return false // For demo, names are always available
}

async function saveOrganization(organization) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('Organization saved:', organization)
}

async function updateOrganization(organization) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Organization updated:', organization)
}

async function uploadFile(file) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  // Simulate file upload and return URL
  return `https://storage.example.com/documents/${file.name}_${Date.now()}`
}

async function saveMembershipRequest(request) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('Membership request saved:', request)
}

async function sendNotificationToAdmin(adminUserId, notification) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Notification sent to admin:', adminUserId, notification)
}

async function sendNotificationToUser(userId, notification) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Notification sent to user:', userId, notification)
}

async function fetchMembershipRequests(organizationId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock membership requests
  return [
    {
      id: 'req_1',
      user_id: 'user_123',
      user_name: 'Anna Weber',
      user_age: 28,
      user_rating: 4.9,
      user_avatar: null,
      status: 'pending',
      requested_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'req_2',
      user_id: 'user_456',
      user_name: 'Tom Fischer',
      user_age: 35,
      user_rating: 4.7,
      user_avatar: null,
      status: 'pending',
      requested_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}

async function getMembershipRequest(requestId) {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return {
    id: requestId,
    user_id: 'user_123',
    organization_id: 'org_456',
    status: 'pending'
  }
}

async function updateUserOrganization(userId, organizationId) {
  await new Promise(resolve => setTimeout(resolve, 400))
  console.log('User organization updated:', userId, organizationId)
}

async function updateMembershipRequestStatus(requestId, status) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Membership request status updated:', requestId, status)
}

async function fetchOrganization(organizationId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock organization data
  return {
    id: organizationId,
    name: 'Kirchengemeinde St. Maria',
    type: 'Kirche',
    description: 'Wir sind eine lebendige Gemeinde, die sich um das Wohl aller Mitglieder kümmert.',
    logo_url: null,
    website: 'https://st-maria.de',
    is_verified: true,
    total_members: 127,
    total_jobs_posted: 450
  }
}

async function fetchUserOrganization(userId) {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  // Mock: return null for users without organization
  return null
}