import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  faChevronLeft,
  faChevronRight,
  faCircleNotch,
  faSignInAlt,
  faSignOutAlt,
  faPlus,
  faSave,
  faTimes,
  faPencilAlt,
  faEyeSlash,
} from '@fortawesome/fontawesome-free-solid';
import fontawesome from '@fortawesome/fontawesome';
import { SnotifyModule, SnotifyService } from 'ng-snotify';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleMainModule } from './schedule-main/schedule-main.module';
import { ActivitiesModule } from './activities/activities.module';
import { RecordingsModule } from './recordings/recordings.module';
import { LoadingModule } from './loading/loading.module';
import { LoginModule } from './login/login.module';
import { CustomersModule } from './customers/customers.module';
import {
  ScheduleMainService,
  ActivitiesService,
  RecordingsService,
  LoginService,
  LoadingService,
  CustomersService,
} from './services';
import { SnotifyToastCustomConfig } from './config';

registerLocaleData(localeRu);

fontawesome.library.add(
  faChevronLeft,
  faChevronRight,
  faCircleNotch,
  faSignInAlt,
  faSignOutAlt,
  faPlus,
  faSave,
  faTimes,
  faPencilAlt,
  faEyeSlash,
  );

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ScheduleMainModule,
    ActivitiesModule,
    RecordingsModule,
    LoadingModule,
    LoginModule,
    SnotifyModule,
    CustomersModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: 'SnotifyToastConfig', useValue: SnotifyToastCustomConfig },
    SnotifyService,
    ScheduleMainService,
    ActivitiesService,
    RecordingsService,
    LoginService,
    LoadingService,
    CustomersService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
