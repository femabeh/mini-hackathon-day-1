import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  async requestPeriod() {
    const params = {
      "latitude": 52.52,
      "longitude": 13.41,
      "hourly": "temperature_2m",
      "timezone": "Europe/Berlin"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  }
}
