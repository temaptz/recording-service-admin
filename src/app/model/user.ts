/*
* Сущность пользователя
*/

export class User {

  constructor (
    public isLoggedIn: boolean,
    public login: string,
    public name: string,
    public token: string
  ) {
    this.isLoggedIn = isLoggedIn;
    this.login = login;
    this.name = name;
    this.token = token;
  }

  // Разлогин пользователя
  public logout(): void {
    this.isLoggedIn = false;
    this.login = null;
    this.name = null;
    this.token = null;
  }

}
