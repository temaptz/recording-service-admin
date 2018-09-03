import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { isDateSameOrBefore, isDateSameOrAfter } from '../lib';
import { Recording } from '../model';
import { RecordingsMock } from '../mock';

/*
*  Записи в графике
*/

@Injectable()
export class RecordingsService {

  private recordings: Recording[] = RecordingsMock;

  constructor() { }

  // Добавление записи
  public create(recording: Recording): Observable<Recording> {
    this.recordings.push(recording);
    return of(recording);
  }

  // Получение списка записей
  public get(from?: Date, to?: Date): Observable<Recording[]> {
    return of(this.recordings.filter((recording: Recording) => {
      if ( from && !isDateSameOrAfter(recording.date, from) ) {
        return false;
      }
      if ( to && !isDateSameOrBefore(recording.date, to) ) {
        return false;
      }
      return true;
    }));
  }

  // Обновление записи
  public update(id: number, recording: Recording): Observable<Recording> {
    let i;
    this.recordings.forEach((rec: Recording, index: number) => {
      if ( rec.id === id ) {
        i = index;
      }
    });
    if ( typeof i !== 'undefined' ) {
      this.recordings[i] = recording;
    }
    return of(recording);
  }

  // Удаление записи
  public delete(id: number): Observable<Recording[]> {
    let i;
    let recording;
    this.recordings.forEach((rec: Recording, index: number) => {
      if ( rec.id === id ) {
        i = index;
      }
    });
    if ( typeof i !== 'undefined' ) {
      recording = this.recordings[i];
      this.recordings.splice(i, 1);
    }
    return of(recording);
  }

}
