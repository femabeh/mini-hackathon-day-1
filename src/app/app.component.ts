import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from "flowbite";
import {NavigationComponent} from "./navigation/navigation.component";
import {TimePeriod} from "./utils/interfaces/timeperiod";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'schoenes-wetter';
  periodOfTime!: TimePeriod;

  ngOnInit(): void {
    initFlowbite()
  }

  changePeriod(period: TimePeriod): void {

  }
}
