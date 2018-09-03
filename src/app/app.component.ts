import { Component, OnInit } from '@angular/core';
import { LoginService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginService.init();
  }

}
