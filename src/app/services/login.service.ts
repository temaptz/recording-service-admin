import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../model';
import { Store } from '../lib';
import { STORE_AUTH_DATA } from '../const';

/*
*  Авторизация
*/

@Injectable()
export class LoginService {

  public user: User;

  constructor(
    private router: Router,
  ) { }

  // Инициализация и проверка авторизации
  public init(): void {
    const storeAuthData = Store.get(STORE_AUTH_DATA);
    if (
      storeAuthData
      && typeof storeAuthData.isLoggedIn !== 'undefined'
      && typeof storeAuthData.login !== 'undefined'
      && typeof storeAuthData.name !== 'undefined'
      && typeof storeAuthData.token !== 'undefined'
    ) {
      this.user = new User(
        storeAuthData.isLoggedIn,
        storeAuthData.login,
        storeAuthData.name,
        storeAuthData.token
      );
    } else {
      this.user = new User(
        false,
        null,
        null,
        null
      );
    }
  }

  // Вход
  public login(login: string, password: string): Observable<User> {
    this.user = new User(
      true,
      login,
      login,
      '12345'
    );
    return of(this.user);
  }

  // Переход к логину
  public loginPage(): void {
    this.navigateToLoginPage();
  }

  // Выход
  public logout(): void {
    this.user.logout();
    Store.remove(STORE_AUTH_DATA);
    this.navigateToLoginPage();
  }

  // Перейти на страницу приложения
  public navigateToApp(): Promise<boolean> {
    return this.router.navigateByUrl('/');
  }

  // Перейти на страницу лонина
  private navigateToLoginPage(): Promise<boolean> {
    return this.router.navigateByUrl('/login');
  }

}
