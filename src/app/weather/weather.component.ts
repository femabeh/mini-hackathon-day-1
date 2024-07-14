import { Component } from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloud, faCloudRain, faCloudSun, faSun} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgSwitchCase,
    NgSwitch,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  protected readonly faCloud = faCloud;
  protected readonly faCloudSun = faCloudSun;
  protected readonly faCloudRain = faCloudRain;
  protected readonly faSun = faSun;
}
