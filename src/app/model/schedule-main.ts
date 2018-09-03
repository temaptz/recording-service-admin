import * as moment from 'moment';
import { ScheduleMainDay } from './schedule-main-day';
import { Recording } from './recording';
import { isDateBefore, isDateSameOrBefore } from '../lib/datetime';

/*
* Сущность основного расписания
*/

export class ScheduleMain {

  constructor (
    public days: [
      ScheduleMainDay,
      ScheduleMainDay,
      ScheduleMainDay,
      ScheduleMainDay,
      ScheduleMainDay,
      ScheduleMainDay,
      ScheduleMainDay
      ]
  ) {
    this.days = days;
  }

  public weekStartDate?: Date;
  public timelineHours?: Date[];
  public timelineLabelHeightPx = 30;
  public timelineOffsetTopPx?: number;
  public timelineHeightPx?: number;
  public heightPx = 400;

  private emptyMillisecondsBefore?: number;
  private emptyMillisecondsAfter?: number;


  // Распределить записи по дням
  public placeRecordings(recordings: Recording[]): void {
    this.days.forEach((day: ScheduleMainDay) => {
      day.placeMatchRecordings(recordings);
    });
  }

  // Задать даты для дней расписания в соответствии с выбранной неделей
  public setScheduleDatesByWeekStart(weekStart: Date): void {
    this.weekStartDate = weekStart;

    this.days.map((day: ScheduleMainDay) => {
      day.workingStartDate = moment(weekStart)
        .add(day.index, 'days')
        .startOf('day')
        .toDate();

      day.workingEndDate = moment(weekStart)
        .add(day.index, 'days')
        .endOf('day')
        .toDate();

      if ( !day.aroundTheClock ) {
        day.workingStartDate = moment(day.workingStartDate)
          .add(day.startHour, 'hours')
          .add(day.startMinute, 'minutes')
          .toDate();

        day.workingEndDate = moment(day.workingEndDate)
          .startOf('day')
          .add(day.endHour, 'hours')
          .add(day.endMinute, 'minutes')
          .toDate();
      }

      day.calendarStartDate = moment(day.workingStartDate)
        .startOf('day')
        .toDate();

      return day;
    });
  }

  // Посчитать все параметры расписания с записями для отрисовки
  public prepareRender(weekStartDate: Date): void {
    this.weekStartDate = weekStartDate;
    this.calculateEmptyTimeOffsets();
    this.calculateDaysSizePx();
    this.calculareRecordingsLocation();
    this.calculateTimelineHours();
    this.calculateTimelineHoursSizePx();
  }

  // Посчитать количество миллисекунд которые можно обрезать вначале и в конце каждого дня
  private calculateEmptyTimeOffsets(): void {
    let minimalBeforeStartLength;
    let minimalAfterEndLength;

    this.days.forEach((day: ScheduleMainDay) => {
      const calendarDayStart = moment(day.calendarStartDate).valueOf();
      const calendarDayEnd = moment(day.getCalendarEndDate()).valueOf();
      const workingDayStart = moment(day.workingStartDate).valueOf();
      const workingDayEnd = moment(day.workingEndDate).valueOf();

      const beforeWorkingLength = workingDayStart - calendarDayStart;
      const afterWorkingLength = calendarDayEnd - workingDayEnd;

      if (
        typeof minimalBeforeStartLength === 'undefined'
        || beforeWorkingLength < minimalBeforeStartLength
      ) {
        minimalBeforeStartLength = beforeWorkingLength;
      }

      if (
        typeof minimalAfterEndLength === 'undefined'
        || afterWorkingLength < minimalAfterEndLength
      ) {
        minimalAfterEndLength = afterWorkingLength;
      }
    });

    if ( typeof minimalBeforeStartLength === 'undefined' ) {
      minimalBeforeStartLength = 0;
    }

    if ( typeof minimalAfterEndLength === 'undefined' ) {
      minimalAfterEndLength = 0;
    }

    this.emptyMillisecondsBefore = minimalBeforeStartLength;
    this.emptyMillisecondsAfter = minimalAfterEndLength;
  }

  // Посчитать размеры дней в пикселях для отрисовки
  private calculateDaysSizePx(): void {
    this.days.map((day: ScheduleMainDay) => {
      const calendarDayStart = moment(day.calendarStartDate).valueOf();
      const calendarDayEnd = moment(day.getCalendarEndDate()).valueOf();
      const workingDayStart = moment(day.workingStartDate).valueOf();
      const workingDayEnd = moment(day.workingEndDate).valueOf();

      const calendarDayLength = calendarDayEnd - calendarDayStart;
      const beforeWorkingLength = workingDayStart - calendarDayStart;
      const workingLength = workingDayEnd - workingDayStart;

      const pxMillisecondRatio = this.heightPx / ( calendarDayLength - ( this.emptyMillisecondsBefore + this.emptyMillisecondsAfter ) );

      day.offsetTopPx = ( beforeWorkingLength - this.emptyMillisecondsBefore ) * pxMillisecondRatio;
      day.heightPx = workingLength * pxMillisecondRatio;

      return day;
    });
  }

  // Посчитать часы для шкалы времени
  private calculateTimelineHours(): void {
    const hours = [];

    const startOfWorkDate = moment(this.weekStartDate)
      .add(this.emptyMillisecondsBefore, 'milliseconds')
      .toDate();

    const endOfWorkDate = moment(this.weekStartDate)
      .endOf('day')
      .subtract(this.emptyMillisecondsAfter, 'milliseconds')
      .toDate();

    let firstHourDate = moment(startOfWorkDate)
      .startOf('hour')
      .toDate();

    if ( isDateBefore(firstHourDate, startOfWorkDate) ) {
      firstHourDate = moment(firstHourDate)
        .add(1, 'hours')
        .toDate();
    }

    const momentHour = moment(firstHourDate);

    while ( isDateSameOrBefore(momentHour.clone().toDate(), endOfWorkDate) ) {
      hours.push(momentHour.clone().toDate());
      momentHour.add(1, 'hours');
    }

    this.timelineHours = hours;
  }

  // Посчитать отступы для шкалы времени
  private calculateTimelineHoursSizePx(): void {
    const millisecondsPxRatio = this.heightPx / ( ( 1000 * 60 * 60 * 24 ) - this.emptyMillisecondsBefore - this.emptyMillisecondsAfter );

    this.timelineOffsetTopPx = (
      moment(this.timelineHours[0]).valueOf()
      - ( moment(this.weekStartDate).valueOf() + this.emptyMillisecondsBefore )
    ) * millisecondsPxRatio;

    this.timelineHeightPx = (
      moment(this.timelineHours[this.timelineHours.length - 1]).valueOf()
      - moment(this.timelineHours[0]).valueOf()
    ) * millisecondsPxRatio;

    console.log(this.timelineOffsetTopPx, this.timelineHeightPx);

  }

  // Посчитать отступы и высоту записей
  private calculareRecordingsLocation(): void {
    this.days.forEach((day: ScheduleMainDay) => {
      day.calculateRecordingsLocation();
    });
  }

}
