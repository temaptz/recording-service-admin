import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SnotifyService } from 'ng-snotify';
import { ActivitiesService, RecordingsService } from '../../services';
import { Activity, Recording } from '../../model';
import {
  MESSAGE_RECORDING_ADD_SUCCESS,
  MESSAGE_RECORDING_ADD_ERROR,
  MESSAGE_RECORDING_EDIT_ERROR,
  MESSAGE_RECORDING_EDIT_SUCCESS,
  MESSAGE_ACTIVITY_GET_ERROR,
} from '../../const';

@Component({
  selector: 'app-add-recording',
  templateUrl: './add-recording.component.html',
  styleUrls: ['./add-recording.component.scss']
})

/*
* Добавление или редактирование записи
*/

export class AddRecordingComponent  implements OnInit {

  public form: FormGroup;
  public activities: Activity[] = [];
  public recording: Recording;
  public title = 'Добавление записи';

  constructor(
    private formBuilder: FormBuilder,
    private recordingsService: RecordingsService,
    private activitiesService: ActivitiesService,
    public activeModal: NgbActiveModal,
    private snotifyService: SnotifyService,
  ) { }

  ngOnInit() {
    if ( this.recording ) {
      this.title = 'Редактирование записи';
    }
    this.initForm();
    this.getActivities();
  }

  // Получить список видов деятельности
  private getActivities() {
    this.activitiesService
      .get()
      .subscribe((activities: Activity[]) => {
        this.activities = activities.filter((activity: Activity): boolean => {
          return (
            !activity.hidden
            || (
              this.recording
              && this.recording.activityId === activity.id
            )
          );
        });
      }, () => {
        this.snotifyService.error(MESSAGE_ACTIVITY_GET_ERROR);
      });
  }

  // Инициализация формы
  private initForm(): void {
    let activityId = null;
    let date = null;
    let description = '';
    if ( this.recording ) {
      activityId = this.recording.activityId;
      date = moment(this.recording.date).format('YYYY-MM-DDTHH:mm');
      description = this.recording.description;
    }

    this.form = this.formBuilder.group({
      activityId: [
        activityId,
        Validators.compose([
          Validators.required,
        ]),
      ],
      date: [
        date,
        Validators.compose([
          Validators.required,
        ]),
      ],
      description: [
        description,
        Validators.compose([
          Validators.maxLength(1024),
        ]),
      ],
    });
  }

  // Сохранение данных
  public onSubmit(): void {
    const recording = new Recording(
      parseInt(this.form.value.activityId, 10),
      moment(this.form.value.date).toDate(),
      this.form.value.description,
    );

    if ( this.recording && this.recording.id ) {
      this.recordingsService
        .update(this.recording.id, recording)
        .subscribe(() => {
          this.snotifyService.success(MESSAGE_RECORDING_EDIT_SUCCESS);
          this.activeModal.close();
        }, () => {
          this.snotifyService.error(MESSAGE_RECORDING_EDIT_ERROR);
        });
    } else {
      this.recordingsService
        .create(recording)
        .subscribe(() => {
          this.snotifyService.success(MESSAGE_RECORDING_ADD_SUCCESS);
          this.activeModal.close();
        }, () => {
          this.snotifyService.error(MESSAGE_RECORDING_ADD_ERROR);
        });
    }
  }

  // Закрыть окно
  public dismiss() {
    this.activeModal.dismiss();
  }

}
