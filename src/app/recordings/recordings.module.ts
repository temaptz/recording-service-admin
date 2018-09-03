import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecordingsComponent } from './recordings.component';
import { WeekSwitcherComponent } from './week-switcher/week-switcher.component';
import { AddRecordingComponent } from './add-recording-modal/add-recording.component';

/*
* График записи
*/

@NgModule({
  declarations: [
    RecordingsComponent,
    WeekSwitcherComponent,
    AddRecordingComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    RecordingsComponent,
    AddRecordingComponent,
  ],
})
export class RecordingsModule { }
