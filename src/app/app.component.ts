import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavigationComponent } from './navigation/navigation.component';
import { TimePeriod } from './utils/interfaces/timeperiod';
import { DataService } from './utils/services/data.service';
import { WeatherParams } from './utils/interfaces/weather-params';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'schoenes-wetter';
  periodOfTime!: TimePeriod;

  city: string = '';
  latitude: number | undefined;
  longitude: number | undefined;
  weatherData: any;
  dataService = inject(DataService);

  ngOnInit(): void {
    initFlowbite();
    this.searchCity();
  }

  changePeriod(period: TimePeriod): void {}

  async searchCity() {
    const cityData = await this.dataService.fetchCityData('München');
    console.log('cityData', cityData);
    this.latitude = cityData.results[0].latitude;
    this.longitude = cityData.results[0].longitude;

    if (this.latitude && this.longitude) {
      this.getWeather();
    }
  }

  async getWeather() {
    if (this.latitude && this.longitude) {
      const params: WeatherParams = {
        latitude: this.latitude,
        longitude: this.longitude,
        models: 'icon_seamless',
      };
      const locationWeatherData =
        await this.dataService.fetchLocationWeatherData(params);

      console.log('data: ', locationWeatherData);
    }
  }
}
