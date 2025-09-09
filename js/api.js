async function apiCall(city) {
  try {
    const response = await fetch(`${BASE_URL}${city}&appid=${API_KEY}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('CITY_NOT_FOUND')
      } else if (response.status === 401) {
        throw new Error('INVALID_API_KEY')
      } else if (response.status === 429) {
        throw new Error('API_LIMIT_EXCEEDED')
      } else {
        throw new Error('API_ERROR')
      }
    }
    return await response.json()
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('NETWORK_ERROR')
    }
    throw error
  }
}

export default apiCall
