import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { ScheduleMain, ScheduleMainDay } from '../model';
import { ScheduleMainMock } from '../mock';

/*
*  Основное расписание
*/

@Injectable()
export class ScheduleMainService {

  private schedule: ScheduleMain = ScheduleMainMock;

  constructor() { }

  // Получение основного расписания
  public get(weekStart?: Date): Observable<ScheduleMain> {
    const schedule = this.schedule;
    if ( weekStart ) {
      schedule.setScheduleDatesByWeekStart(weekStart);
    }
    return of(schedule);
  }

  // Обновление основного расписания
  public update(schedule: ScheduleMain): Observable<ScheduleMain> {
    this.schedule = schedule;
    return of(this.schedule);
  }

}
