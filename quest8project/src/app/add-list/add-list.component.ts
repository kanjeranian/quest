import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { ItemManager } from '../item-manager.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  key: string;
  todo: string;
  b;
  data;
  response;
  constructor(
    private formService: FormService,
    private itemManager: ItemManager
  ) {}

  ngOnInit() {
    this.key = this.formService.getKey();
  }

  async addList() {
    this.response = await this.itemManager.addList(this.key, this.todo);
    this.b = JSON.stringify(this.response);
  }
}
