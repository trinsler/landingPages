// News utility functions

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Heute'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Gestern'
  } else {
    return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  }
}

export const shareArticle = (article) => {
  const shareText = `${article.title}\n\n${article.summary}\n\nMehr erfahren: ${window.location.origin}/pwa/helper/news`
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: shareText,
      url: `${window.location.origin}/pwa/helper/news`
    }).catch(err => console.log('Error sharing:', err))
  } else {
    // Fallback: Create WhatsApp share link
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(whatsappUrl, '_blank')
  }
}