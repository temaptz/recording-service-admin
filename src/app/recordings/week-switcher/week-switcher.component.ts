import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-week-switcher',
  templateUrl: './week-switcher.component.html',
  styleUrls: ['./week-switcher.component.scss']
})

/*
* Переключалка недель
*/

export class WeekSwitcherComponent  implements OnInit {

  @Output() onSetWeek = new EventEmitter<[Date, Date]>();

  public weekStartDate: Date;
  public weekEndDate: Date;

  constructor() { }

  ngOnInit() {
    this.setDefaultWeek();
    moment.locale('ru');
  }

  // Установить текущую неделю
  private setDefaultWeek(): void {
    this.weekStartDate = moment()
      .startOf('week')
      .toDate();

    this.weekEndDate = moment()
      .endOf('week')
      .toDate();

    this.outputCurrentWeek();
  }

  // Переключить предыдущую неделю
  public goToPreviousWeek(): void {
    this.weekStartDate = moment(this.weekStartDate)
      .subtract(7, 'days')
      .toDate();

    this.weekEndDate = moment(this.weekEndDate)
      .subtract(7, 'days')
      .toDate();

    this.outputCurrentWeek();
  }

  // Переключить следующую неделю
  public goToNextWeek(): void {
    this.weekStartDate = moment(this.weekStartDate)
      .add(7, 'days')
      .toDate();

    this.weekEndDate = moment(this.weekEndDate)
      .add(7, 'days')
      .toDate();

    this.outputCurrentWeek();
  }

  // Отдать на вывод текущую неделю
  private outputCurrentWeek(): void {
    this.onSetWeek.emit([this.weekStartDate, this.weekEndDate]);
  }

}
