import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  loginStatus = false;
  loginStatusBS = new BehaviorSubject<boolean>(false);
  key: string;
  keyBS = new BehaviorSubject<string>('');
  private url = 'https://api.todo.mrsunboy.com/login';
  private response;
  constructor(private http: HttpClient) {}

  async login(userId: string, pass: string) {
    this.http
      .post(this.url, { username: userId, password: pass })
      .subscribe(data => {
        this.response = data;
      });
    if (this.response.status) {
      this.setStatus(true);
      this.setKey(this.response.data);
    } else {
      this.setStatus(false);
      this.setKey('');
    }
    return this.response;
  }

  getLoginStatus() {
    return this.loginStatus;
  }

  getKey() {
    return this.key;
  }
  setStatus(val: boolean) {
    this.loginStatus = val;
    this.loginStatusBS.next(val);
  }

  setKey(val: string) {
    this.key = val;
    this.keyBS.next(val);
  }
}
