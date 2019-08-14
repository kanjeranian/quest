import { Component, OnInit } from '@angular/core';
import { ItemManager } from '../item-manager.service';
import { Item } from '../item';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[];
  response;
  b;
  iitemss;
  userId: string;
  password: string;
  loginStatus = false;
  key: string;
  del = 3;
  constructor(private itemManager: ItemManager) {}

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.response = await this.itemManager.getItems();
    this.response.subscribe(e => (this.iitemss = e.data));
  }

  getItems(): void {
    this.itemManager
      .getItems()
      .subscribe(response => (this.response = response));
    // ที่ควรจะเป็นคือ .subscribe(items => (this.items = items));
    this.b = JSON.stringify(this.response);
    this.iitemss = this.response.iitemss;
    this.b = JSON.stringify(this.iitemss);
  }

  async delete(id: number) {
    this.del = id;
    this.response = await this.itemManager.deleteList(this.key, id);
    this.b = JSON.stringify(this.response);
  }
}
