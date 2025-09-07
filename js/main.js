import apiCall from './api.js'

const $searchBtn = document.getElementById('search-btn')
const $searchInput = document.getElementById('search-input')
const $msgErrorSection = document.getElementById('error')
const $msgError = document.getElementById('errorMessage')
const $msgLoadingSection = document.getElementById('loading')

$searchBtn.addEventListener('click', searchWeather)

async function searchWeather() {
  const city = $searchInput.value.trim()

  if (!city) {
    $msgErrorSection.classList.add('showMsg')
    $msgError.textContent = 'Type a city'

    setTimeout(() => {
      $msgErrorSection.classList.remove('showMsg')
    }, 2000)
    $searchInput.focus()
    return
  }

  $msgLoadingSection.classList.add('showMsg')

  try {
    const data = await searchCityWeatherCall(city)
    console.log(data)
  } catch (error) {
    $msgErrorSection.classList.add('showMsg')

    showError(error.message)

    setTimeout(() => {
      $msgErrorSection.classList.remove('showMsg')
    }, 3000)
  }

  $msgLoadingSection.classList.remove('showMsg')
}

async function searchCityWeatherCall(city) {
  const result = await apiCall(city)
  return result
}

function showError(errorType) {
  $msgError.classList.add('showMsg')

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
    : errorMessages['DEFAULT']
}
