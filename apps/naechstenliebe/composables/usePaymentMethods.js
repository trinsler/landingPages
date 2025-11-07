import { ref, computed } from 'vue'

// Global state for payment methods
const paymentMethods = ref([])
const isLoading = ref(false)
const error = ref(null)

export const usePaymentMethods = () => {
  
  // Load user's payment methods
  const loadPaymentMethods = async (userId) => {
    isLoading.value = true
    error.value = null
    
    try {
      const methods = await fetchPaymentMethods(userId)
      paymentMethods.value = methods
    } catch (err) {
      error.value = err.message
      console.error('Failed to load payment methods:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Add Stripe payment method
  const addStripeMethod = async (userId, cardData) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Validate card data
      if (!cardData.cardHolder || !cardData.cardNumber || !cardData.expiry || !cardData.cvv) {
        throw new Error('Bitte füllen Sie alle Kartenfelder aus')
      }

      // Create Stripe customer if needed
      let customerId = await getOrCreateStripeCustomer(userId)
      
      // Create payment method in Stripe
      const stripePaymentMethod = await createStripePaymentMethod({
        type: 'card',
        card: {
          number: cardData.cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(cardData.expiry.split('/')[0]),
          exp_year: parseInt('20' + cardData.expiry.split('/')[1]),
          cvc: cardData.cvv
        },
        billing_details: {
          name: cardData.cardHolder
        }
      })

      // Attach payment method to customer
      await attachPaymentMethodToCustomer(stripePaymentMethod.id, customerId)

      // Save to our database
      const newMethod = {
        id: `pm_${Date.now()}`,
        user_id: userId,
        provider: 'stripe',
        stripe_payment_method_id: stripePaymentMethod.id,
        stripe_customer_id: customerId,
        type: 'stripe',
        display_name: `${stripePaymentMethod.card.brand.charAt(0).toUpperCase() + stripePaymentMethod.card.brand.slice(1)} •••• ${stripePaymentMethod.card.last4}`,
        card_brand: stripePaymentMethod.card.brand,
        card_last4: stripePaymentMethod.card.last4,
        is_default: cardData.setAsDefault || paymentMethods.value.length === 0,
        created_at: new Date().toISOString()
      }

      // Set others as non-default if this is default
      if (newMethod.is_default) {
        paymentMethods.value.forEach(method => {
          method.is_default = false
        })
      }

      // Save to database
      await savePaymentMethod(newMethod)
      
      // Add to local state
      paymentMethods.value.push({
        id: newMethod.id,
        type: 'stripe',
        displayName: newMethod.display_name,
        isDefault: newMethod.is_default,
        cardType: newMethod.card_brand,
        last4: newMethod.card_last4
      })

      return {
        success: true,
        method: newMethod,
        message: 'Kreditkarte wurde erfolgreich gespeichert'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to add Stripe method:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // Add PayPal method
  const addPayPalMethod = async (userId) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate PayPal OAuth flow
      const paypalAuth = await initiatePayPalOAuth()
      
      // Get user info from PayPal
      const paypalUser = await getPayPalUserInfo(paypalAuth.access_token)
      
      const newMethod = {
        id: `pm_${Date.now()}`,
        user_id: userId,
        provider: 'paypal',
        paypal_account_id: paypalAuth.account_id,
        paypal_email: paypalUser.email,
        type: 'paypal',
        display_name: `PayPal (${paypalUser.email})`,
        is_default: paymentMethods.value.length === 0,
        created_at: new Date().toISOString()
      }

      // Save to database
      await savePaymentMethod(newMethod)
      
      // Add to local state
      paymentMethods.value.push({
        id: newMethod.id,
        type: 'paypal',
        displayName: newMethod.display_name,
        isDefault: newMethod.is_default,
        email: newMethod.paypal_email
      })

      return {
        success: true,
        method: newMethod,
        message: 'PayPal wurde erfolgreich verbunden'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to add PayPal method:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // Add Apple Pay method
  const addApplePayMethod = async (userId) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Check Apple Pay availability
      if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
        throw new Error('Apple Pay ist auf diesem Gerät nicht verfügbar')
      }

      // Create Apple Pay session for setup
      const applePaySession = new ApplePaySession(3, {
        countryCode: 'DE',
        currencyCode: 'EUR',
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS']
      })

      // Setup Apple Pay - this is simplified
      await new Promise((resolve, reject) => {
        applePaySession.onvalidatemerchant = (event) => {
          // In real implementation, validate with Apple
          resolve()
        }
        
        applePaySession.onerror = (error) => {
          reject(new Error('Apple Pay Setup fehlgeschlagen'))
        }
        
        applePaySession.begin()
      })

      const newMethod = {
        id: `pm_${Date.now()}`,
        user_id: userId,
        provider: 'apple_pay',
        type: 'apple_pay',
        display_name: 'Apple Pay',
        is_default: paymentMethods.value.length === 0,
        created_at: new Date().toISOString()
      }

      // Save to database
      await savePaymentMethod(newMethod)
      
      // Add to local state
      paymentMethods.value.push({
        id: newMethod.id,
        type: 'apple_pay',
        displayName: newMethod.display_name,
        isDefault: newMethod.is_default
      })

      return {
        success: true,
        method: newMethod,
        message: 'Apple Pay wurde erfolgreich aktiviert'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to add Apple Pay method:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // Remove payment method
  const removePaymentMethod = async (methodId) => {
    isLoading.value = true
    error.value = null
    
    try {
      const method = paymentMethods.value.find(m => m.id === methodId)
      if (!method) {
        throw new Error('Zahlungsmethode nicht gefunden')
      }

      // Remove from Stripe if needed
      if (method.type === 'stripe') {
        await detachStripePaymentMethod(method.stripe_payment_method_id)
      }

      // Remove from database
      await deletePaymentMethod(methodId)
      
      // Remove from local state
      const index = paymentMethods.value.findIndex(m => m.id === methodId)
      if (index > -1) {
        paymentMethods.value.splice(index, 1)
      }

      // Set first method as default if deleted method was default
      if (method.isDefault && paymentMethods.value.length > 0) {
        paymentMethods.value[0].isDefault = true
        await setDefaultPaymentMethod(paymentMethods.value[0].id)
      }

      return {
        success: true,
        message: 'Zahlungsmethode wurde entfernt'
      }

    } catch (err) {
      error.value = err.message
      console.error('Failed to remove payment method:', err)
      
      return {
        success: false,
        error: err.message
      }
    } finally {
      isLoading.value = false
    }
  }

  // Set default payment method
  const setDefaultMethod = async (methodId) => {
    try {
      // Update all methods
      paymentMethods.value.forEach(method => {
        method.isDefault = method.id === methodId
      })

      // Update in database
      await setDefaultPaymentMethod(methodId)

      return {
        success: true,
        message: 'Standard-Zahlungsmethode wurde geändert'
      }

    } catch (err) {
      error.value = err.message
      return {
        success: false,
        error: err.message
      }
    }
  }

  // Computed properties
  const defaultMethod = computed(() => {
    return paymentMethods.value.find(method => method.isDefault)
  })

  const hasPaymentMethods = computed(() => {
    return paymentMethods.value.length > 0
  })

  return {
    // State
    paymentMethods: readonly(paymentMethods),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    defaultMethod,
    hasPaymentMethods,
    
    // Methods
    loadPaymentMethods,
    addStripeMethod,
    addPayPalMethod,
    addApplePayMethod,
    removePaymentMethod,
    setDefaultMethod
  }
}

// Mock API functions - In real app, these would call actual backend/Stripe/PayPal APIs
async function fetchPaymentMethods(userId) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return [
    {
      id: 'pm_1',
      type: 'stripe',
      displayName: 'Visa •••• 4242',
      isDefault: true,
      cardType: 'visa',
      last4: '4242'
    },
    {
      id: 'pm_2',
      type: 'paypal',
      displayName: 'PayPal (max@example.com)',
      isDefault: false,
      email: 'max@example.com'
    }
  ]
}

async function getOrCreateStripeCustomer(userId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  return `cus_${userId}`
}

async function createStripePaymentMethod(data) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: `pm_${Date.now()}`,
    card: {
      brand: 'visa',
      last4: data.card.number.slice(-4)
    }
  }
}

async function attachPaymentMethodToCustomer(paymentMethodId, customerId) {
  await new Promise(resolve => setTimeout(resolve, 300))
}

async function detachStripePaymentMethod(paymentMethodId) {
  await new Promise(resolve => setTimeout(resolve, 300))
}

async function savePaymentMethod(method) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Payment method saved:', method)
}

async function deletePaymentMethod(methodId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Payment method deleted:', methodId)
}

async function setDefaultPaymentMethod(methodId) {
  await new Promise(resolve => setTimeout(resolve, 200))
  console.log('Default payment method set:', methodId)
}

async function initiatePayPalOAuth() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return {
    access_token: 'paypal_token_123',
    account_id: 'paypal_account_123'
  }
}

async function getPayPalUserInfo(accessToken) {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    email: 'user@example.com',
    name: 'Max Mustermann'
  }
}