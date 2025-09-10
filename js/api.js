// js/api.js - Nueva versión SIN config.js
async function apiCall(city) {
  try {
    // ✅ Ahora llama a TU backend, no directo a OpenWeatherMap
    const response = await fetch(
      `../api/weather?city=${encodeURIComponent(city)}`
    )

    const data = await response.json()

    if (!response.ok) {
      // Manejar errores específicos que devuelve tu backend
      if (response.status === 404) {
        throw new Error('CITY_NOT_FOUND')
      } else if (response.status === 400) {
        throw new Error('INVALID_INPUT')
      } else if (response.status === 500) {
        throw new Error('API_ERROR')
      } else {
        throw new Error('NETWORK_ERROR')
      }
    }

    return data
  } catch (error) {
    // Error de red (sin internet, etc.)
    if (error.name === 'TypeError') {
      throw new Error('NETWORK_ERROR')
    }

    // Re-lanzar otros errores para que main.js los maneje
    throw error
  }
}

export default apiCall
