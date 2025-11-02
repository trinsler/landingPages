// Dashboard utility functions

// Calculate visible radius based on zoom level
export const calculateVisibleRadius = (zoom) => {
  // Approximate: zoom 10 = 50km, zoom 15 = 1km
  return Math.round(Math.pow(2, 15 - zoom) * 1.5)
}

// Calculate distance between two coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Check if device is mobile
export const checkMobileSize = () => {
  return window.innerWidth < 768
}