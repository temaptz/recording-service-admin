import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services';
import { Store } from '../lib';
import { STORE_AUTH_DATA } from '../const';
import { User } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/*
* Форма логина
*/

export class LoginComponent  implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // Инициализация формы
  private initForm(): void {
    this.form = this.formBuilder.group({
      login: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(128),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(128),
        ]),
      ],
    });
  }

  // Сохранение данных
  public onSubmit(): void {
    this
      .loginService
      .login(this.form.value.login, this.form.value.password)
      .subscribe((user: User) => {

        Store.set(STORE_AUTH_DATA, user);

        setTimeout(() => {
          this.loginService.navigateToApp();
        }, 1000);
      });
  }

}
