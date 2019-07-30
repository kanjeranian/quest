import { Component, AfterContentChecked } from '@angular/core';
import { FormService } from '../form.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterContentChecked {
  userId: string;
  password: string;
  loginStatus: boolean;
  response;

  constructor(private formService: FormService) {}

  ngAfterContentChecked() {
    this.loginStatus = this.formService.getLoginStatus();
  }

  async onSubmit() {
    this.response = await this.formService.login(this.userId, this.password);
    this.loginStatus = this.formService.getLoginStatus();
  }

  async logout() {
    this.response = await this.formService.login('', '');
    this.loginStatus = this.formService.getLoginStatus();
  }
}
