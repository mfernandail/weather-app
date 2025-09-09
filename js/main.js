import apiCall from './api.js'

const $searchBtn = document.getElementById('search-btn')
const $searchInput = document.getElementById('search-input')
const $msgErrorSection = document.getElementById('error')
const $msgError = document.getElementById('errorMessage')
const $msgLoadingSection = document.getElementById('loading')
const $result = document.getElementById('result')
const $celsius = document.getElementById('celsius')
const $fahrenheit = document.getElementById('fahrenheit')

$celsius.disabled = true
$fahrenheit.disabled = true

$searchBtn.addEventListener('click', searchWeather)
$fahrenheit.addEventListener('click', toFahrenheit)
$celsius.addEventListener('click', toCelsius)

let DATA

let KELVIN
let MIN_WEATHER_K
let MAX_WEATHER_K

let CONV_KELVIN = 273.15

let CURRENT_WEATHER
let MIN_WEATHER_CONV
let MAX_WEATHER_CONV

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
    DATA = await searchCityWeatherCall(city)
    $celsius.disabled = false
    $fahrenheit.disabled = false
    KELVIN = DATA.main.temp
    MIN_WEATHER_K = DATA.main.temp_min
    MAX_WEATHER_K = DATA.main.temp_max
    renderResult()
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

function renderResult() {
  const { main } = DATA

  $result.textContent = ''

  $result.classList.add('showMsg')

  const subTitle = document.createElement('h2')
  subTitle.classList.add('mb-5')

  subTitle.textContent = `Weather in ${DATA.name}`

  const weatherResultTemp = document.createElement('p')
  const weatherResultTempMin = document.createElement('p')
  const weatherResultTempMax = document.createElement('p')

  const temp = CURRENT_WEATHER ? CURRENT_WEATHER : main.temp - CONV_KELVIN
  const tempMin = MIN_WEATHER_CONV
    ? MIN_WEATHER_CONV
    : main.temp_min - CONV_KELVIN
  const tempMax = MAX_WEATHER_CONV
    ? MAX_WEATHER_CONV
    : main.temp_max - CONV_KELVIN

  weatherResultTemp.textContent = `Current ${temp.toFixed(2)} °C`
  weatherResultTempMin.textContent = `Minimum ${tempMin.toFixed(2)} °C`
  weatherResultTempMax.textContent = `Maximum ${tempMax.toFixed(2)} °C`

  $result.append(subTitle)
  $result.appendChild(weatherResultTemp)
  $result.appendChild(weatherResultTempMin)
  $result.appendChild(weatherResultTempMax)
}

function toFahrenheit() {
  //°F = (K − 273,15) × 1,8 + 32.
  CURRENT_WEATHER = (KELVIN - CONV_KELVIN) * 1.8 + 32
  MAX_WEATHER_CONV = (MAX_WEATHER_K - CONV_KELVIN) * 1.8 + 32
  MIN_WEATHER_CONV = (MIN_WEATHER_K - CONV_KELVIN) * 1.8 + 32
  renderResult()
}

function toCelsius() {
  CURRENT_WEATHER = KELVIN - CONV_KELVIN
  MAX_WEATHER_CONV = MAX_WEATHER_K - CONV_KELVIN
  MIN_WEATHER_CONV = MIN_WEATHER_K - CONV_KELVIN
  renderResult()
}