import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  response;
  b;
  data;
  userId: string;
  password: string;
  loginStatus = false;
  key: string;
  del = 3;
  constructor(private requestService: RequestService) {}

  async ngOnInit() {
    this.getList();
  }

  async getList() {
    this.response = await this.requestService.getList();
    this.b = JSON.stringify(this.response);
    this.data = this.response.data;
    this.b = JSON.stringify(this.data);
  }

  async delete(id: number) {
    this.del = id;
    this.response = await this.requestService.deleteList(this.key, id);
    this.b = JSON.stringify(this.response);
  }
}
