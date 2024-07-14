import { WeatherParams } from "../utils/interfaces/weather-params";

export const defaultWeatherParams: WeatherParams = {
  latitude: 0, // Placeholder value, replace as needed
  longitude: 0, // Placeholder value, replace as needed
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'is_day',
    'precipitation',
    'weather_code',
    'cloud_cover',
    'pressure_msl',
    'surface_pressure',
    'wind_speed_10m',
    'wind_direction_10m',
    'wind_gusts_10m',
  ],
  hourly: ['temperature_2m', 'precipitation', 'weather_code'],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'precipitation_sum',
    'precipitation_probability_max',
    'wind_speed_10m_max',
    'wind_gusts_10m_max',
    'wind_direction_10m_dominant',
  ],
  timezone: 'GMT',
  models: 'icon_seamless',
};
