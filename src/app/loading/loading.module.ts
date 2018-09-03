import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading.component';
import { LoadingService } from '../services';

/*
* Индикация загрузки
*/

@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoadingService,
  ],
  bootstrap: [
    LoadingComponent,
  ],
  exports: [
    LoadingComponent,
  ],
})
export class LoadingModule { }
