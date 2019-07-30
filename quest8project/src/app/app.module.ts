import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddListComponent } from './add-list/add-list.component';
import { FormService } from './form.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemComponent } from './item/item.component';
@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    FormComponent,
    TodoListComponent,
    AddListComponent,
    ItemComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
