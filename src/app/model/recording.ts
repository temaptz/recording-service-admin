import { generateId } from '../lib';
import { Activity } from './activity';

/*
* Сущность записи в расписании
*/

export class Recording {

  constructor (
    public activityId: number,
    public date: Date,
    public description?: string
  ) {
    this.activityId = activityId;
    this.date = date;
    this.description = description;
  }

  public id?: number = generateId();
  public activity?: Activity;
  public offsetTopPx?: number;
  public heightPx?: number;

  // Выбрать вид деятельности этой записи
  public placeActivity(activities: Activity[]): void {
    this.activity = activities.find((activity: Activity) => {
      return (activity.id === this.activityId);
    });
  }

}
