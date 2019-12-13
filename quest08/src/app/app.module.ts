import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AddListComponent } from './add-list/add-list.component';
import { ItemComponent } from './items/items.component';
import { AuthService } from './auth.service';
import { TodoManagerService } from './todo-manager.service';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, FormComponent, AddListComponent, ItemComponent],
  providers: [
    // TODO add AuthService and TodoManagerService
    AuthService,
    TodoManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
