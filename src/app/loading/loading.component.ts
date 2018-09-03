import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

/*
* Форма логина
*/

export class LoadingComponent  implements OnInit {

  constructor(
    public loadingService: LoadingService,
  ) { }

  ngOnInit() { }

}
