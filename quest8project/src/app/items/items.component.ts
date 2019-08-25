import { Component, OnInit } from '@angular/core';
import { TodoManagerService } from '../todo-manager.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemComponent implements OnInit {
  todos: Todo[];

  constructor(private todoManager: TodoManagerService) { }

  ngOnInit() {
    this.getList();
  }

  /**
   * @method getList() Update `todos` property from API
   *
   * Call HTTP request to get all todo API and update `todos` property using the retrieved data
   */
  getList(): void {
    // TODO fill code
  }

  /**
   * @method delete(id) Delete todo item with the specified ID
   * @param id ID of todo item
   *
   * Call HTTP request to delete todo API and reload todo list
   */
  delete(id: number): void {
    // TODO fill code
  }
}
