import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivitiesComponent } from './activities.component';
import { AddActivityComponent } from './add-activity-modal/add-activity.component';

/*
* Виды деятельности
*/

@NgModule({
  declarations: [
    ActivitiesComponent,
    AddActivityComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    ActivitiesComponent,
    AddActivityComponent,
  ],
})
export class ActivitiesModule { }
