import { Component } from '@angular/core';
import { TodoManagerService } from '../todo-manager.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  todo: string;

  constructor(private auth: AuthService, private itemManager: TodoManagerService, private router: Router) { }

  /**
   * @method addTodo() Add new todo item to the list
   *
   * Call HTTP request to add todo API and navigate to `/items` page if the request succeeds
   */
  addTodo(): void {
    // TODO fill code
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }
}
