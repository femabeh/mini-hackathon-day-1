import { Component, inject, OnInit, Output } from '@angular/core';
import { LocationData, TimePeriod } from '../utils/interfaces/timeperiod';
import { DateRangePicker } from 'flowbite-datepicker';
import { DataService } from '../utils/services/data.service';
import { NgTemplateOutlet, CommonModule } from '@angular/common';
import { MarkedCitysService } from '../utils/services/marked-citys.service';
import { LocationWeatherService } from '../utils/services/location-weather.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  dataService = inject(DataService);
  markedCitys = inject(MarkedCitysService);
  locationWeatherService = inject(LocationWeatherService);

  citys: string[] = this.markedCitys.marked_citys;

  periodOfTime: TimePeriod = { start: new Date(), end: new Date() };

  ngOnInit(): void {
    //this.initDatePicker()
  }

  showLocationWeather(data: LocationData) {
    this.locationWeatherService.setLocationData(data);
  }

  initDatePicker() {
    const dateRangePickerEl = document.getElementById(
      'date-range-picker'
    ) as HTMLInputElement;
    new DateRangePicker(dateRangePickerEl, {
      rangePicker: true,
      format: 'dd.mm.yyyy',
    });
  }
}
