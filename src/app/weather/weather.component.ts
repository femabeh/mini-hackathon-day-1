import {AfterViewInit, Component, inject} from '@angular/core';
import {JsonPipe, KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloud, faCloudRain, faCloudSun, faSun} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../utils/services/data.service";
import {WeatherParams} from "../utils/interfaces/weather-params";
import { defaultWeatherParams } from '../config/weather-params';

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

  ngAfterViewInit(): void {
    this.getData();
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
