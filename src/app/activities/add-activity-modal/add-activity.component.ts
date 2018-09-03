import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { ActivitiesService } from '../../services';
import { Activity } from '../../model';
import {
  DEFAULT_ACTIVITY_BG_COLOR,
  DEFAULT_ACTIVITY_COLOR,
  MESSAGE_ACTIVITY_ADD_ERROR,
  MESSAGE_ACTIVITY_ADD_SUCCESS,
  MESSAGE_ACTIVITY_EDIT_ERROR,
  MESSAGE_ACTIVITY_EDIT_SUCCESS,
} from '../../const';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})

/*
* Форма добавления или редактирования вида деятельности
*/

export class AddActivityComponent  implements OnInit {

  public form: FormGroup;
  public activity: Activity;
  public title = 'Добавление вида деятельности';

  constructor(
    private formBuilder: FormBuilder,
    private activitiesServise: ActivitiesService,
    public activeModal: NgbActiveModal,
    private snotifyService: SnotifyService,
  ) { }

  ngOnInit() {
    if ( this.activity ) {
      this.title = 'Редактирование вида деятельности';
    }
    this.initForm();
  }

  // Инициализация формы
  private initForm(): void {
    let name = '';
    let description = '';
    let duration = 0;
    let bgColor = DEFAULT_ACTIVITY_BG_COLOR;
    let color = DEFAULT_ACTIVITY_COLOR;
    if ( this.activity ) {
      name = this.activity.name;
      description = this.activity.description;
      duration = this.activity.duration;
      bgColor = this.activity.bgColor;
      color = this.activity.color;
    }

    this.form = this.formBuilder.group({
      name: [
        name,
        Validators.compose([
          Validators.required,
          Validators.maxLength(128),
        ]),
      ],
      description: [
        description,
        Validators.compose([
          Validators.maxLength(512),
        ]),
      ],
      duration: [
        duration,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(3600),
        ]),
      ],
      bgColor: [
        bgColor,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
        ]),
      ],
      color: [
        color,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
        ]),
      ],
    });
  }

  // Сохранение данных
  public onSubmit(): void {
    const id = (this.activity) ? this.activity.id : undefined;
    const activity = new Activity(
      id,
      this.form.value.name,
      this.form.value.description,
      this.form.value.duration,
      this.form.value.bgColor,
      this.form.value.color
    );

    if ( this.activity && this.activity.id ) {
      this.activitiesServise
        .update(this.activity.id, activity)
        .subscribe(() => {
          this.snotifyService.success(MESSAGE_ACTIVITY_EDIT_SUCCESS);
          this.activeModal.close();
        }, () => {
          this.snotifyService.error(MESSAGE_ACTIVITY_EDIT_ERROR);
        });
    } else {
      this.activitiesServise
        .create(activity)
        .subscribe(() => {
          this.snotifyService.success(MESSAGE_ACTIVITY_ADD_SUCCESS);
          this.activeModal.close();
        }, () => {
          this.snotifyService.error(MESSAGE_ACTIVITY_ADD_ERROR);
        });
    }
  }

  // Закрыть окно
  public dismiss() {
    this.activeModal.dismiss();
  }
}
