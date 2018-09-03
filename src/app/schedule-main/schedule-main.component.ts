import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScheduleMain, ScheduleMainDay } from '../model';
import { ScheduleMainService } from '../services';

@Component({
  selector: 'app-schedule-main',
  templateUrl: './schedule-main.component.html',
  styleUrls: ['./schedule-main.component.scss']
})
export class ScheduleMainComponent  implements OnInit {

  public form: FormGroup;
  public minutesStep = 10;
  public hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  public minutes: number[] = [];
  private schedule: ScheduleMain;

  constructor(
    private formBuilder: FormBuilder,
    private scheduleMainService: ScheduleMainService,
  ) { }

  ngOnInit() {
    this.initMinutes();
    this.initForm();
  }

  // Инициализация массива минут
  private initMinutes(): void {
    const result = [];
    for ( let i = 0; i < 60; i++ ) {
      if ( i === 0 || i % this.minutesStep === 0 ) {
        result.push(i);
      }
    }
    this.minutes = result;
  }

  // Инициализация формы
  private initForm(): void {
    this.scheduleMainService
      .get()
      .subscribe((schedule: ScheduleMain) => {
        this.schedule = schedule;
        this.form = this.formBuilder.group({
          days: this.formBuilder.array(this.scheduleDaysToFormGroupArr()),
        });
      });
  }

  // Создать массив для формбилдера
  private scheduleDaysToFormGroupArr(): FormGroup[] {
    const result = [];

    this.schedule.days.forEach((day: ScheduleMainDay) => {
      const formGroupData = {
        index          : day.index,
        name           : day.name,
        fullName       : day.fullName,
        aroundTheClock : day.aroundTheClock,
        startHour      : day.startHour,
        startMinute    : day.startMinute,
        endHour        : day.endHour,
        endMinute      : day.endMinute,
      };
      result.push(this.formBuilder.group(formGroupData));
    });

    return result;
  }

  // Сохранение данных
  public onSubmit(): void {
    console.log(this.schedule, this.form.value);
    const scheduleMainDays = this.form.value.days.map((day: any): ScheduleMainDay => {
      return new ScheduleMainDay(
        day.index,
        day.name,
        day.fullName,
        day.aroundTheClock,
        day.startHour,
        day.startMinute,
        day.endHour,
        day.endMinute,
      );
    });
    this.schedule.days = scheduleMainDays;
    this.scheduleMainService
      .update(this.schedule)
      .subscribe((resp: ScheduleMain) => {
        this.initForm();
      });
  }

  // Очистка формы
  public revert() {
    this.rebuildForm();
    this.initForm();
  }

  // Перестроение формы
  rebuildForm() {
    this.form.reset();
  }
}
