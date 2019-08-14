import { Component, OnInit, DoCheck } from '@angular/core';
import { FormService } from '../form.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, DoCheck {
  userId: string;
  password: string;
  loginStatus: boolean;
  count = 0;

  constructor(private formService: FormService) {}

  ngOnInit() {
    // this.updateStatus();
    // console.log('change');
  }

  ngDoCheck() {
    this.updateStatus();
    // console.log('Dochange');
    // console.log(this.loginStatus);
    // console.log('count : ' + this.count++);
  }

  login() {
    this.formService.login(this.userId, this.password);
  }

  logout() {
    this.formService.login('', '');
  }

  updateStatus() {
    this.formService
      .getLoginStatus()
      .subscribe(status => (this.loginStatus = status));
  }
}
