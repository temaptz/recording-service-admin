import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { Customer } from '../model';
import { CustomersMock } from '../mock';

/*
*  Клиенты
*/

@Injectable()
export class CustomersService {

  private customers: Customer[] = CustomersMock;

  constructor() { }

  // Создание клиента
  public create(customer: Customer): Observable<Customer> {
    this.customers.push(customer);
    return of(customer);
  }

  // Получение списка клиентов
  public get(): Observable<Customer[]> {
    return of(this.customers);
  }

  // Обновление клиента
  public update(id: number, customer: Customer): Observable<Customer> {
    let i;
    this.customers.forEach((cust: Customer, index: number) => {
      if ( cust.id === id ) {
        i = index;
      }
    });
    if ( typeof i !== 'undefined' ) {
      this.customers[i] = customer;
    }
    return of(customer);
  }

  // Удаление клиента
  public delete(id: number): Observable<Customer> {
    let i;
    let customer;
    this.customers.forEach((cust: Customer, index: number) => {
      if ( cust.id === id ) {
        i = index;
      }
    });
    if ( typeof i !== 'undefined' ) {
      customer = this.customers[i];
      this.customers.splice(i, 1);
    }
    return of(customer);
  }

}
