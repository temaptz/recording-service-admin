import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { Activity } from '../model';
import { ActivitiesMock } from '../mock';

/*
*  Виды деятельности
*/

@Injectable()
export class ActivitiesService {

  private activities: Activity[] = ActivitiesMock;

  constructor() { }

  // Добавление вида деятельности
  public create(activity: Activity): Observable<Activity> {
    this.activities.push(activity);
    return of(activity);
  }

  // Получение списка видов деятельности
  public get(): Observable<Activity[]> {
    return of(this.activities);
  }

  // Обновление вида деятельности
  public update(id: number, activity: Activity): Observable<Activity> {
    let i;
    this.activities.forEach((act: Activity, index: number) => {
      if ( act.id === id ) {
        i = index;
      }
    });
    if ( typeof i !== 'undefined' ) {
      this.activities[i] = activity;
    }
    return of(activity);
  }

}
