import type { OpenWeatherType, WeatherType } from '~~/types/types'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { user } = await requireUserSession(event)
  const query = getQuery(event)

  if (Number(query.lon) === Infinity || Number(query.lat) === Infinity) {
    return createError('Invalid coordinates')
  }

  const openWeather = await $fetch<OpenWeatherType>('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lon: query.lon,
      lat: query.lat,
      appid: config.openWeather.apiKey,
      lang: user.language.split('-')[0] ?? 'en',
      units: config.openWeather.units,
    },
  })

  return {
    weather: {
      type: openWeather.weather[0].main,
      description: openWeather.weather[0].description,
    },
    city: openWeather.name,
    temp: {
      feels_like: openWeather.main.feels_like,
      min: openWeather.main.temp_min,
      max: openWeather.main.temp_max,
      humidity: openWeather.main.humidity,
    },
    wind: openWeather.wind.speed,
  } as WeatherType
}, {
  maxAge: 60 * 60 * 3,
  name: 'weather',
})
