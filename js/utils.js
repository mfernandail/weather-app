export function kelvinToCelsius(kelvin) {
  return kelvin - 273.15
}

export function kelvinToFahrenheit(kelvin) {
  console.log(kelvin)
  return (kelvin - 273.15) * 1.8 + 32
}

export function formatTemperature(temp, unit = 'C') {
  return `${temp.toFixed(1)}°${unit}`
}
