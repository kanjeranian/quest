import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = 'https://api.todo.mrsunboy.com/todo';
  private response;
  constructor(private http: HttpClient) {}

  async getList() {
    this.http.get(this.url).subscribe(data => {
      this.response = data;
    });
    return this.response;
  }

  async addList(key: string, todo: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + key
      })
    };

    this.http.post(this.url, { text: todo }, httpOptions).subscribe(data => {
      this.response = data;
    });
    return this.response;
  }

  async deleteList(key: string, id: number) {
    this.http
      .delete('https://api.todo.mrsunboy.com/todo?id=7', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + key })
      })
      .subscribe(data => {
        this.response = data;
      });
    return this.response;
  }
}
