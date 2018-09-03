import { Recording } from './recording';
import { isDateSameOrBefore, isDateSameOrAfter } from '../lib';
import * as moment from 'moment';

/*
* Сущность дня в основном расписании
*/

export class ScheduleMainDay {

  constructor (
    public index: 0 | 1 | 2 | 3 | 4 | 5 | 6 ,
    public name: 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su',
    public fullName: string,
    public aroundTheClock: boolean,
    public startHour: number,
    public startMinute: number,
    public endHour: number,
    public endMinute: number,
  ) {
    this.index = index;
    this.name = name;
    this.fullName = fullName;
    this.aroundTheClock = aroundTheClock;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
  }

  public workingStartDate?: Date; // Дата начала рабочего дня
  public workingEndDate?: Date; // Дата конца рабочего дня

  public calendarStartDate?: Date; // Дата начала календарного дня

  public offsetTopPx?: number; // Отступ сверху в пикселях
  public heightPx?: number; // Высота в пикселях

  public recordings?: Recording[];

  // Выбрать записи подходящие для этого дня
  public placeMatchRecordings(recordings: Recording[]): Recording[] {
    const newRecordings: Recording[] = [];
    const calendarEndDate = this.getCalendarEndDate();

    recordings.forEach((recording: Recording) => {
      if (
        this.calendarStartDate
        && calendarEndDate
        && isDateSameOrAfter(recording.date, this.calendarStartDate)
        && isDateSameOrBefore(recording.date, calendarEndDate)
      ) {
        newRecordings.push(recording);
      }
    });

    this.recordings = newRecordings;
    return this.recordings;
  }

  // Посчитать расположение блоков записи внутри блока дня
  public calculateRecordingsLocation() {
    this.recordings.map((recording: Recording): Recording => {
      const dayLength = moment(this.workingEndDate).valueOf() - moment(this.workingStartDate).valueOf();
      const beforeRecordingLength = moment(recording.date).valueOf() - moment(this.workingStartDate).valueOf();
      const recordingLength = recording.activity.duration * 60 * 1000;

      recording.offsetTopPx = beforeRecordingLength * this.heightPx / dayLength;
      recording.heightPx = recordingLength * this.heightPx / dayLength;

      return recording;
    });
  }

  // Получить дату окончания календарного дня
  public getCalendarEndDate(): Date {
    return moment(this.calendarStartDate)
      .endOf('day')
      .toDate();
  }

}
