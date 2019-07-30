import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loginStatus: boolean;
  loginStatusBS = new BehaviorSubject<boolean>(false);
  key: string;
  keyBS = new BehaviorSubject<string>('');

  constructor() {}

  setStatus(val) {
    this.loginStatus = val;
    this.loginStatusBS.next(val);
  }

  setKey(val) {
    this.loginStatus = val;
    this.loginStatusBS.next(val);
  }
}
