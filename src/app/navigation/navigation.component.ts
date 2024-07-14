import {Component, inject, OnInit, Output} from '@angular/core';
import {TimePeriod} from "../utils/interfaces/timeperiod";
import {DateRangePicker} from "flowbite-datepicker";
import {DataService} from "../utils/services/data.service";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  dataService = inject(DataService)

  periodOfTime: TimePeriod = {start: new Date(), end: new Date()};

  ngOnInit(): void {
    //this.initDatePicker()
  }

  initDatePicker() {
    const dateRangePickerEl = document.getElementById('date-range-picker') as HTMLInputElement;
    new DateRangePicker(dateRangePickerEl, {
      rangePicker: true,
      format: "dd.mm.yyyy"
    });
  }
}
