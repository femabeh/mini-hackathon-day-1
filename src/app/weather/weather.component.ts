import { AfterViewInit, Component, inject } from '@angular/core';
import {
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
} from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCloud,
  faCloudRain,
  faCloudSun,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../utils/services/data.service';
import { WeatherParams } from '../utils/interfaces/weather-params';
import { defaultWeatherParams } from '../config/weather-params';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgSwitchCase,
    NgSwitch,
    FaIconComponent,
    NgIf,
    JsonPipe,
    NgForOf,
    KeyValuePipe,
    NavigationComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements AfterViewInit {
  dataService = inject(DataService);

  protected readonly faCloud = faCloud;
  protected readonly faCloudSun = faCloudSun;
  protected readonly faCloudRain = faCloudRain;
  protected readonly faSun = faSun;

  lat: number = 0;
  lng: number = 0;
  data: any;
  city_name: string = 'City';
  deg: any = 12;


  ngAfterViewInit(): void {
    this.getData();
  }

  load_data() {
    alert("test");

  }

  async searchCity(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const city = (target.elements.namedItem('city') as HTMLInputElement).value;
    const cityData = await this.dataService.fetchCityData(city);
    const latitude = cityData.results[0].latitude;
    const longitude = cityData.results[0].longitude;

    if (latitude && longitude) {
      const locationWeatherData = await this.dataService.getWeather(
        latitude,
        longitude
      );
      console.log('location :', locationWeatherData);
      this.city_name = city;
      this.lat = latitude.toFixed(2);
      this.lng = longitude.toFixed(2);
      if(locationWeatherData !== null) {
        this.deg = locationWeatherData.current.temperature2m.toFixed(2);

      }
    
    }
  }

  async getData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (position) {
            const params: WeatherParams = {
              ...defaultWeatherParams,
              latitude: this.lat,
              longitude: this.lng,
            };
            this.data = await this.dataService.fetchLocationWeatherData(params);
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
