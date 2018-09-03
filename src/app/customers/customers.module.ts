import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from './customers.component';

/*
* Клиенты
*/

@NgModule({
  declarations: [
    CustomersComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    CustomersComponent,
  ],
})
export class CustomersModule { }
