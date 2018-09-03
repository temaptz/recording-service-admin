import {
  Component,
  AfterViewInit,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { zip } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import {
  ActivitiesService,
  RecordingsService,
  ScheduleMainService,
} from '../services';
import {
  Activity,
  Recording,
  ScheduleMain,
} from '../model';
import { AddRecordingComponent } from './add-recording-modal/add-recording.component';
import {
  MESSAGE_RECORDING_DELETE_ERROR,
  MESSAGE_RECORDING_DELETE_SUCCESS,
} from '../const';

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})

/*
* График записи
*/

export class RecordingsComponent  implements AfterViewInit {

  public schedule: ScheduleMain;
  public weekStart: Date;
  public weekEnd: Date;
  public weekContainerWidthPx = 0;

  @ViewChild('weekContainer')
  private weekContainer: ElementRef;

  @HostListener('window:resize')
  private onHostResize() {
    this.weekContainerWidthPx = this.weekContainer.nativeElement.offsetWidth;
  }

  constructor(
    private recordingsService: RecordingsService,
    private scheduleMainService: ScheduleMainService,
    private activitiesService: ActivitiesService,
    private modalService: NgbModal,
    private snotifyService: SnotifyService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onHostResize();
    });
  }

  // Обновление расписания и данных
  private updateScheduleRecordings(): void {
    zip(
        this.recordingsService.get(this.weekStart, this.weekEnd),
        this.scheduleMainService.get(this.weekStart),
        this.activitiesService.get(),
      )
      .subscribe(([recordings, schedule, activities]: [Recording[], ScheduleMain, Activity[]]) => {
        recordings.map((recording: Recording) => {
          recording.placeActivity(activities);
        });
        schedule.placeRecordings(recordings);
        schedule.prepareRender(this.weekStart);
        this.schedule = schedule;
        console.log(this.schedule);
      });
  }

  // Выбор недели
  public onSetWeek(week: [Date, Date]): void {
    this.weekStart = week[0];
    this.weekEnd = week[1];
    this.updateScheduleRecordings();
  }

  // Добавить запись
  public addRecording(): void {
    this.modalService
      .open(AddRecordingComponent)
      .result
      .then(() => {
        this.updateScheduleRecordings();
      }, () => {});
  }

  // Редактировать запись
  public editRecording(recording: Recording): void {
    const modalRef = this.modalService
      .open(AddRecordingComponent);

    modalRef.componentInstance.recording = recording;

    modalRef.result
      .then(() => {
        this.updateScheduleRecordings();
      }, () => {});
  }

  // Удалить запись
  public removeRecording(recording: Recording): void {
    if ( confirm('Вы уверенны что хотите удалить эту запись?') ) {
      this.recordingsService
        .delete(recording.id)
        .subscribe(() => {
          this.snotifyService.success(MESSAGE_RECORDING_DELETE_SUCCESS);
          this.updateScheduleRecordings();
        }, () => {
          this.snotifyService.error(MESSAGE_RECORDING_DELETE_ERROR);
        });
    }
  }

}
