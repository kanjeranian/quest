import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { RequestService } from '../request.service';

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
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.key = this.formService.getKey();
  }

  async addList() {
    this.response = await this.requestService.addList(this.key, this.todo);
    this.b = JSON.stringify(this.response);
  }
}
