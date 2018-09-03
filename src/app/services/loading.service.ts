import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

/*
*  Прогресс загрузки
*/

@Injectable()
export class LoadingService {

  public isLoading: Subject<boolean> = new BehaviorSubject(false);

  constructor() { }

  // Начало загрузки
  public start(): void {
    this.isLoading.next(true);
  }

  // Окончание загрузки
  public stop(): void {
    this.isLoading.next(false);
  }

}
