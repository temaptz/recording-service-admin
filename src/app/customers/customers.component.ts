import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnotifyService } from 'ng-snotify';
import { Customer } from '../model';
import { CustomersService } from '../services';
import { MESSAGE_CUSTOMERS_GET_ERROR } from '../const';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/*
* Клиенты
*/

export class CustomersComponent  implements OnInit {

  public customers: Customer[] = [];

  constructor(
    private customersService: CustomersService,
    private modalService: NgbModal,
    private snotifyService: SnotifyService,
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  // Получить список клиентов
  private getCustomers(): void {
    this.customersService
      .get()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      }, () => {
        this.snotifyService.error(MESSAGE_CUSTOMERS_GET_ERROR);
      });
  }
}
