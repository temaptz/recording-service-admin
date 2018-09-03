import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleMainComponent } from './schedule-main/schedule-main.component';
import { ActivitiesComponent } from './activities/activities.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: '/recordings', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: ScheduleMainComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'recordings', component: RecordingsComponent },
  { path: 'customers', component: CustomersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
