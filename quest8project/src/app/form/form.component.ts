import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  username: string;
  password: string;

  constructor(private auth: AuthService) { }

  /**
   * @method login() Log user in
   *
   * Call HTTP request to login API using `username` and `password` property.
   * Set key in `AuthService` if login success, otherwise alert error message
   */
  login(): void {
    // TODO fill code
  }

  logout(): void {
    this.auth.logout();
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }
}
