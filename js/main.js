import apiCall from './api.js'

const $searchBtn = document.getElementById('search-btn')
const $searchInput = document.getElementById('search-input')
const $msgError = document.getElementById('errorMessage')

$searchBtn.addEventListener('click', searchWeather)

async function searchWeather() {
  const city = $searchInput.value

  if (!city) {
    $msgError.textContent = 'Ingresa una ciudad'

    setTimeout(() => {
      $msgError.textContent = ''
    }, 2000)
    $searchInput.focus()
    return
  }

  console.log(city)
  const data = await searchCityWeatherCall(city)

  console.log(data)
}

async function searchCityWeatherCall(city) {
  try {
    const result = await apiCall(city)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

function error(errorType) {
  const errorMessages = {
    CITY_NOT_FOUND: 'City not found.',
    INVALID_API_KEY: 'API configuration error.',
    API_LIMIT_EXCEEDED: 'Too many requests.',
    NETWORK_ERROR: 'No internet connection.',
    API_ERROR: 'Weather service temporarily unavailable.',
    DEFAULT: 'Something went wrong.',
  }

  $msgError.textContent = errorMessages[errorType]
    ? errorMessages[errorType]
    : errorMessages[DEFAULT]
}
