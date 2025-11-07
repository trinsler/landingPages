import { ref, computed } from 'vue'

// Global state for payment operations
const isProcessingPayment = ref(false)
const currentTransaction = ref(null)
const paymentError = ref(null)

export const usePayments = () => {
  
  // US-8.2: Pre-Authorization bei Job-Annahme
  const createPreAuthorization = async (jobId, seekerId, amount) => {
    isProcessingPayment.value = true
    paymentError.value = null
    
    try {
      // Get seeker's default payment method
      const paymentMethod = await getDefaultPaymentMethod(seekerId)
      if (!paymentMethod) {
        throw new Error('Keine Zahlungsmethode hinterlegt. Bitte fügen Sie eine Zahlungsmethode hinzu.')
      }

      // Create transaction record
      const transaction = {
        id: `txn_${Date.now()}`,
        job_id: jobId,
        seeker_id: seekerId,
        gross_amount: amount,
        platform_fee_amount: Math.round(amount * 0.125 * 100) / 100, // 12.5% platform fee
        net_amount: Math.round(amount * 0.875 * 100) / 100,
        status: 'pending',
        payment_provider: paymentMethod.provider,
        created_at: new Date().toISOString()
      }

      // Create Stripe Payment Intent (or simulate)
      const paymentIntent = await createStripePaymentIntent({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'eur',
        customer_id: paymentMethod.stripe_customer_id,
        payment_method_id: paymentMethod.stripe_payment_method_id,
        capture_method: 'manual', // Pre-authorization
        metadata: {
          job_id: jobId,
          transaction_id: transaction.id
        }
      })

      if (paymentIntent.status === 'requires_confirmation') {
        // Confirm payment intent for pre-auth
        const confirmed = await confirmPaymentIntent(paymentIntent.id)
        if (confirmed.status === 'requires_capture') {
          transaction.status = 'authorized'
          transaction.payment_provider_transaction_id = paymentIntent.id
        } else {
          throw new Error('Zahlung konnte nicht autorisiert werden')
        }
      } else {
        throw new Error('Payment Intent konnte nicht erstellt werden')
      }

      currentTransaction.value = transaction
      
      // Save transaction to database (simulated)
      await saveTransaction(transaction)
      
      return {
        success: true,
        transaction,
        message: 'Zahlung wurde erfolgreich autorisiert'
      }

    } catch (error) {
      paymentError.value = error.message
      console.error('Pre-authorization failed:', error)
      
      return {
        success: false,
        error: error.message
      }
    } finally {
      isProcessingPayment.value = false
    }
  }

  // US-8.3: Zahlung abschließen (Capture)
  const capturePayment = async (transactionId) => {
    isProcessingPayment.value = true
    paymentError.value = null
    
    try {
      // Get transaction
      const transaction = await getTransaction(transactionId)
      if (!transaction || transaction.status !== 'authorized') {
        throw new Error('Transaktion nicht gefunden oder nicht autorisiert')
      }

      // Capture the payment intent
      const captured = await captureStripePaymentIntent(
        transaction.payment_provider_transaction_id,
        Math.round(transaction.gross_amount * 100)
      )

      if (captured.status === 'succeeded') {
        // Update transaction status
        transaction.status = 'captured'
        transaction.captured_at = new Date().toISOString()
        
        // Create transfer to helper
        const transfer = await createHelperTransfer({
          amount: Math.round(transaction.net_amount * 100),
          destination: transaction.helper_stripe_account_id,
          metadata: {
            transaction_id: transactionId,
            job_id: transaction.job_id
          }
        })

        transaction.helper_transfer_id = transfer.id
        
        // Save updated transaction
        await updateTransaction(transaction)
        
        // Generate invoice for seeker
        await generateInvoice(transaction)
        
        return {
          success: true,
          transaction,
          message: 'Zahlung wurde erfolgreich abgeschlossen'
        }
      } else {
        throw new Error('Zahlung konnte nicht erfasst werden')
      }

    } catch (error) {
      paymentError.value = error.message
      console.error('Payment capture failed:', error)
      
      return {
        success: false,
        error: error.message
      }
    } finally {
      isProcessingPayment.value = false
    }
  }

  // US-8.4: Zahlung stornieren
  const cancelPayment = async (transactionId, reason = 'Job cancelled') => {
    isProcessingPayment.value = true
    paymentError.value = null
    
    try {
      // Get transaction
      const transaction = await getTransaction(transactionId)
      if (!transaction || transaction.status !== 'authorized') {
        throw new Error('Transaktion nicht gefunden oder bereits verarbeitet')
      }

      // Cancel the payment intent
      const cancelled = await cancelStripePaymentIntent(
        transaction.payment_provider_transaction_id
      )

      if (cancelled.status === 'canceled') {
        // Update transaction status
        transaction.status = 'cancelled'
        transaction.cancelled_at = new Date().toISOString()
        transaction.cancellation_reason = reason
        
        // Save updated transaction
        await updateTransaction(transaction)
        
        return {
          success: true,
          transaction,
          message: 'Zahlung wurde erfolgreich storniert'
        }
      } else {
        throw new Error('Zahlung konnte nicht storniert werden')
      }

    } catch (error) {
      paymentError.value = error.message
      console.error('Payment cancellation failed:', error)
      
      return {
        success: false,
        error: error.message
      }
    } finally {
      isProcessingPayment.value = false
    }
  }

  // Helper function to get user's transactions
  const getUserTransactions = async (userId, role = 'helper') => {
    try {
      // Simulate API call
      const transactions = await fetchUserTransactions(userId, role)
      return transactions.filter(t => t.status === 'captured')
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
      return []
    }
  }

  // Helper function to calculate earnings
  const calculateEarnings = (transactions) => {
    const total = transactions.reduce((sum, tx) => sum + tx.net_amount, 0)
    const thisMonth = transactions
      .filter(tx => {
        const txDate = new Date(tx.captured_at)
        const now = new Date()
        return txDate.getMonth() === now.getMonth() && 
               txDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, tx) => sum + tx.net_amount, 0)
    
    return {
      total: Math.round(total * 100) / 100,
      thisMonth: Math.round(thisMonth * 100) / 100,
      count: transactions.length
    }
  }

  return {
    // State
    isProcessingPayment: readonly(isProcessingPayment),
    currentTransaction: readonly(currentTransaction),
    paymentError: readonly(paymentError),
    
    // Methods
    createPreAuthorization,
    capturePayment,
    cancelPayment,
    getUserTransactions,
    calculateEarnings
  }
}

// Mock API functions - In real app, these would call actual backend/Stripe APIs
async function getDefaultPaymentMethod(userId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Return mock payment method
  return {
    id: 'pm_12345',
    provider: 'stripe',
    stripe_customer_id: 'cus_12345',
    stripe_payment_method_id: 'pm_12345',
    card_last4: '4242',
    card_brand: 'visa'
  }
}

async function createStripePaymentIntent(data) {
  // Simulate Stripe API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: `pi_${Date.now()}`,
    status: 'requires_confirmation',
    amount: data.amount,
    currency: data.currency,
    metadata: data.metadata
  }
}

async function confirmPaymentIntent(paymentIntentId) {
  // Simulate Stripe confirm
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    id: paymentIntentId,
    status: 'requires_capture' // Pre-authorized
  }
}

async function captureStripePaymentIntent(paymentIntentId, amount) {
  // Simulate Stripe capture
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: paymentIntentId,
    status: 'succeeded',
    amount_captured: amount
  }
}

async function cancelStripePaymentIntent(paymentIntentId) {
  // Simulate Stripe cancel
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    id: paymentIntentId,
    status: 'canceled'
  }
}

async function createHelperTransfer(data) {
  // Simulate Stripe transfer to helper
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    id: `tr_${Date.now()}`,
    amount: data.amount,
    destination: data.destination
  }
}

async function saveTransaction(transaction) {
  // Simulate database save
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Transaction saved:', transaction)
}

async function updateTransaction(transaction) {
  // Simulate database update
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Transaction updated:', transaction)
}

async function getTransaction(transactionId) {
  // Simulate database get
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Return mock transaction
  return {
    id: transactionId,
    status: 'authorized',
    gross_amount: 20,
    net_amount: 17.50,
    platform_fee_amount: 2.50,
    payment_provider_transaction_id: 'pi_mock123',
    helper_stripe_account_id: 'acct_helper123'
  }
}

async function fetchUserTransactions(userId, role) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Return mock transactions
  return [
    {
      id: 'txn_1',
      job_id: 'job_1',
      gross_amount: 20,
      net_amount: 17.50,
      platform_fee_amount: 2.50,
      status: 'captured',
      captured_at: new Date().toISOString(),
      job_title: 'Einkaufen bei REWE'
    },
    {
      id: 'txn_2',
      job_id: 'job_2',
      gross_amount: 40,
      net_amount: 35.00,
      platform_fee_amount: 5.00,
      status: 'captured',
      captured_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      job_title: 'Rasen mähen'
    }
  ]
}

async function generateInvoice(transaction) {
  // Simulate invoice generation
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('Invoice generated for transaction:', transaction.id)
}