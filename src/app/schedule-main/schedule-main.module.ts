import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleMainComponent } from './schedule-main.component';


@NgModule({
  declarations: [
    ScheduleMainComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    ScheduleMainComponent,
  ],
})
export class ScheduleMainModule { }
