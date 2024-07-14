import {Component, OnInit, Output} from '@angular/core';
import {TimePeriod} from "../utils/interfaces/timeperiod";
import {DateRangePicker} from "flowbite-datepicker";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  @Output() periodOfTime: TimePeriod = {start: new Date(), end: new Date()};

  ngOnInit(): void {
    this.initDatePicker()
  }

  initDatePicker() {
    const dateRangePickerEl = document.getElementById('date-range-picker') as HTMLInputElement;
    new DateRangePicker(dateRangePickerEl, {
      rangePicker: true,
      format: "dd.mm.yyyy"
    });
  }
}
