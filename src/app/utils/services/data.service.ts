import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherParams } from '../interfaces/weather-params';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  async fetchWeatherData(
    params: WeatherParams,
    forecastType: 'hourly' | 'daily',
    temperatureAtElevation: string
  ) {
    if (forecastType === 'hourly') {
      params['hourly'] = temperatureAtElevation;
    } else if (forecastType === 'daily') {
      params['daily'] = temperatureAtElevation;
    }

    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    let weatherData;

    if (forecastType === 'hourly') {
      const hourly = response.hourly()!;
      weatherData = {
        hourly: {
          time: range(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          temperature2m: hourly.variables(0)!.valuesArray()!,
        },
      };
    } else if (forecastType === 'daily') {
      const daily = response.daily()!;
      weatherData = {
        daily: {
          time: range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          [this.determineTemperaturePropertyName(temperatureAtElevation)]: daily
            .variables(0)!
            .valuesArray()!,
        },
      };
    }

    return weatherData;
  }

  async fetchLocationWeatherData(params: WeatherParams) {
    const hourlyData = await this.fetchWeatherData(
      params,
      'hourly',
      'temperature_2m'
    );

    const dailyMinData = await this.fetchWeatherData(
      params,
      'daily',
      'temperature_2m_min'
    );

    const dailyMaxData = await this.fetchWeatherData(
      params,
      'daily',
      'temperature_2m_max'
    );

    return {
      hourly: hourlyData?.hourly,
      dailyMin: dailyMinData?.daily,
      dailyMax: dailyMaxData?.daily,
    };
  }

  private determineTemperaturePropertyName(
    temperatureAtElevation: string
  ): string {
    return temperatureAtElevation.includes('min')
      ? 'minTemperature2m'
      : 'maxTemperature2m';
  }

  async fetchCityData(cityName: string) {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Geodaten');
    }

    const data = await response.json();
    return data;
  }
}
