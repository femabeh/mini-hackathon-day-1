import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavigationComponent } from './navigation/navigation.component';
import { DataService } from './utils/services/data.service';
import { WeatherParams } from './utils/interfaces/weather-params';
import { defaultWeatherParams } from './config/weather-params';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'schoenes-wetter';

  city: string = '';
  latitude: number | undefined;
  longitude: number | undefined;
  weatherData: any;
  dataService = inject(DataService);

  ngOnInit(): void {
    initFlowbite();
    this.searchCity();
  }

  async searchCity() {
    const cityData = await this.dataService.fetchCityData('München');
    //console.log('cityData', cityData);
    this.latitude = cityData.results[0].latitude;
    this.longitude = cityData.results[0].longitude;

    if (this.latitude && this.longitude) {
      this.getWeather();
    }
  }

  async getWeather() {
    if (this.latitude && this.longitude) {
      const params: WeatherParams = {
        ...defaultWeatherParams,
        latitude: this.latitude,
        longitude: this.longitude,
      };
      const locationWeatherData =
        await this.dataService.fetchLocationWeatherData(params);

      //console.log('data: ', locationWeatherData);
    }
  }
}
