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
import { NavigationComponent } from '../navigation/navigation.component';

import { LocationWeatherService } from '../utils/services/location-weather.service';
import { LocationData } from '../utils/interfaces/timeperiod';

import { MarkedCitysService } from '../utils/services/marked-citys.service'


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

  locationWeatherService = inject(LocationWeatherService);
  locationWeatherData!: any;

  markedCitys = inject(MarkedCitysService);


  protected readonly faCloud = faCloud;
  protected readonly faCloudSun = faCloudSun;
  protected readonly faCloudRain = faCloudRain;
  protected readonly faSun = faSun;

  lat: number = 0;
  lng: number = 0;
  data: any;
  city_name: string = 'City';
  deg: any = 12;
  dataTest: any[] = [];

  ngAfterViewInit(): void {
    this.locationWeatherService.locationData$.subscribe(
      async (locationData: LocationData) => {
        await this.updateWeatherData(locationData);
      }
    );
    this.getData();
  }

  private async updateWeatherData(locationData: LocationData): Promise<void> {
    const latitude = locationData.lat;
    const longitude = locationData.lng;
    const city = locationData.city;

    if (latitude && longitude) {
      try {
        const weatherData = await this.dataService.getWeather(
          latitude,
          longitude
        );
        this.locationWeatherData = {
          ...weatherData,
          city: city,
        };
        console.log('Updated weather data:', this.locationWeatherData);
      } catch (error) {
        console.error('Error updating weather data:', error);
      }
    }
  }

  async searchCity(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const city = (target.elements.namedItem('city') as HTMLInputElement).value;
    const cityData = await this.dataService.fetchCityData(city);
    const data: LocationData = {
      lat: cityData.results[0].latitude,
      lng: cityData.results[0].latitude,
      city: cityData.results[0].admin4,
    };
    this.locationWeatherService.setLocationData(data);
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

        this.markedCitys.marked_citys.push(city);
        this.markedCitys.temp.push(locationWeatherData.current.temperature2m.toFixed(2));
        this.markedCitys.lat = latitude.toFixed(2);
        this.markedCitys.lng = longitude.toFixed(2)
      }
    
    }
  }

  async getData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const cityData = await this.locationWeatherService.getCityApi(
            position.coords.latitude,
            position.coords.longitude
          );
          const data: LocationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: cityData.city,
          };
          this.locationWeatherService.setLocationData(data);
        },
        (err) => {
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
