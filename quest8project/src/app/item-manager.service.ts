import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IItem } from './IItem';

@Injectable({
  providedIn: 'root'
})
export class ItemManager {
  private url = 'https://api.todo.mrsunboy.com/todo';
  private response;
  private items: Item[];

  constructor(private http: HttpClient) {}

  async getList() {
    this.http.get(this.url).subscribe(data => {
      this.response = data;
    });
    return this.response;
  }

  getItems(): Observable<any> {
    return this.http.get(this.url);
  }

  handleError<T>(
    arg0: string
  ): (
    err: any,
    caught: Observable<Item[]>
  ) => import('rxjs').ObservableInput<any> {
    throw new Error('Method not implemented.');
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
