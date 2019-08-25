import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { Response } from './response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoManagerService {
  private url = 'https://api.todo.mrsunboy.com/todo';

  constructor(private http: HttpClient, private form: AuthService) { }

  getItems(): Observable<Response<Todo[]>> {
    return this.http.get<Response<Todo[]>>(this.url);
  }

  /**
   * @method addTodo(todo) Call HTTP request to add todo API
   * @param todo Todo text
   *
   * Call POST request to todo API, including todo text and authorization header
   * @returns `Observable<Response<Todo>>`
   */
  addTodo(todo: string): Observable<Response<Todo>> {
    // TODO fill code
  }

  deleteList(id: number): Observable<Response> {
    return this.http.delete<Response>(this.url + '?id=' + id, {
      headers: { Authorization: 'Bearer ' + this.form.key }
    });
  }
}
