import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Response<string>> {
    return this.http.post<Response<string>>('https://api.todo.mrsunboy.com/login', { username, password });
  }

  logout(): void {
    this.key = '';
  }

  get isLoggedIn(): boolean {
    return this.key !== '';
  }

  setKey(key: string) {
    this.key = key;
  }
}
