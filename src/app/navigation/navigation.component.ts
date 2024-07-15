import {Component, inject, OnInit, Output} from '@angular/core';
import {TimePeriod} from "../utils/interfaces/timeperiod";
import {DateRangePicker} from "flowbite-datepicker";
import {DataService} from "../utils/services/data.service";
import {NgTemplateOutlet, CommonModule} from "@angular/common";
import { MarkedCitysService } from "../utils/services/marked-citys.service"

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CommonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  dataService = inject(DataService);
  markedCitys = inject(MarkedCitysService);

  citys: string[] = this.markedCitys.marked_citys;

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
