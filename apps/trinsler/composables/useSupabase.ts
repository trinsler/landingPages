// Contact form functions using Nuxt Supabase module
export const useContactForm = () => {
  const submitContactForm = async (formData: {
    name: string
    email: string
    company?: string
    message: string
  }) => {
    try {
      const supabase = useSupabaseClient()

      // Send email notification via Edge Function (which also saves to DB)
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
        }
      })

      if (error) {
        console.error('Supabase Edge Function error:', error)
        throw new Error('Failed to submit contact form')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Contact form submission error:', error)
      throw error
    }
  }

  return {
    submitContactForm
  }
}