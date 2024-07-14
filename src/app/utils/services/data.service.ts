import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherParams } from '../interfaces/weather-params';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  async fetchLocationWeatherData(params: WeatherParams) {
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

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    let weatherData;
    weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        isDay: current.variables(2)!.value(),
        precipitation: current.variables(3)!.value(),
        weatherCode: current.variables(4)!.value(),
        cloudCover: current.variables(5)!.value(),
        pressureMsl: current.variables(6)!.value(),
        surfacePressure: current.variables(7)!.value(),
        windSpeed10m: current.variables(8)!.value(),
        windDirection10m: current.variables(9)!.value(),
        windGusts10m: current.variables(10)!.value(),
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        precipitation: hourly.variables(1)!.valuesArray()!,
        weatherCode: hourly.variables(2)!.valuesArray()!,
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        sunrise: daily.variables(3)!.valuesArray()!,
        sunset: daily.variables(4)!.valuesArray()!,
        precipitationSum: daily.variables(5)!.valuesArray()!,
        precipitationProbabilityMax: daily.variables(6)!.valuesArray()!,
        windSpeed10mMax: daily.variables(7)!.valuesArray()!,
        windGusts10mMax: daily.variables(8)!.valuesArray()!,
        windDirection10mDominant: daily.variables(9)!.valuesArray()!,
      },
    };

    return weatherData;
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
