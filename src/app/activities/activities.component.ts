import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { Activity } from '../model';
import { ActivitiesService } from '../services';
import { AddActivityComponent } from './add-activity-modal/add-activity.component';
import {
  MESSAGE_ACTIVITY_EDIT_ERROR,
  MESSAGE_ACTIVITY_EDIT_SUCCESS,
  MESSAGE_ACTIVITY_GET_ERROR
} from '../const';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

/*
* Виды деятельности
*/

export class ActivitiesComponent  implements OnInit {

  public activities: Activity[] = [];
  public activitiesHidden: Activity[] = [];
  public hiddenCollapsed = true;

  constructor(
    private activitiesService: ActivitiesService,
    private modalService: NgbModal,
    private snotifyService: SnotifyService,
  ) { }

  ngOnInit() {
    this.getActivities();
  }

  // Получить список видов деятельности
  private getActivities(): void {
    this.activitiesService
      .get()
      .subscribe((activities: Activity[]) => {
        this.activities = activities.filter((activity: Activity): boolean => {
          return !activity.hidden;
        });
        this.activitiesHidden = activities.filter((activity: Activity): boolean => {
          return activity.hidden;
        });
      }, () => {
        this.snotifyService.error(MESSAGE_ACTIVITY_GET_ERROR);
      });
  }

  // Добавить вид деятельности
  public addActivity(): void {
    this.modalService
      .open(AddActivityComponent)
      .result
      .then(() => {
        this.getActivities();
      }, () => {});
  }

  // Изменить вид деятельности
  public editActivity(activity: Activity): void {
    const modalRef = this.modalService
      .open(AddActivityComponent);

    modalRef.componentInstance.activity = activity;

    modalRef.result
      .then(() => {
        this.getActivities();
      }, () => {});
  }

  // Сменить статус скрытия на противоположный
  public toggleHideActivity(activity: Activity): void {
    activity.hidden = !activity.hidden;
    this.activitiesService
      .update(activity.id, activity)
      .subscribe(() => {
        this.snotifyService.success(MESSAGE_ACTIVITY_EDIT_SUCCESS);
        this.getActivities();
      }, () => {
        this.snotifyService.error(MESSAGE_ACTIVITY_EDIT_ERROR);
      });
  }
}
