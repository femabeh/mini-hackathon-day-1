import { Component } from '@angular/core';
import {NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCloud} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgSwitchCase,
    NgSwitch,
    FaIconComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  protected readonly faCloud = faCloud;
}
