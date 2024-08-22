import type { OpenWeatherType } from '~~/types/types'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  console.log(config.openWeather)

  const openWeather = await $fetch<OpenWeatherType>('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: config.openWeather.lat,
      lon: config.openWeather.lon,
      appid: config.openWeather.apiKey,
      lang: config.openWeather.lang,
      units: config.openWeather.units,
    },
  })
  console.log(openWeather)
  return {
    weather: openWeather.weather[0].description,
    city: openWeather.name,
    temp: openWeather.main.feels_like,
  }
}, {
  maxAge: 60 * 60, // 1 hour
  name: 'weather',
})
