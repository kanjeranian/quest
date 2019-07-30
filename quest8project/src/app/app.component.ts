import { Component, AfterContentChecked } from '@angular/core';
import { FormService } from './form.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  test = true;
  title = 'QUEST 8';
  loginStatus = false;
  key: string;

  constructor(private formService: FormService) {}

  ngAfterContentChecked() {
    this.loginStatus = this.formService.loginStatus;
  }

  addValue(loginStatus) {
    this.formService.setStatus(loginStatus);
  }
}
