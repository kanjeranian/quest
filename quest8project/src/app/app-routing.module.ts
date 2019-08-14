import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AddListComponent } from './add-list/add-list.component';
import { ItemComponent } from './items/items.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'login', component: FormComponent },
  { path: 'addList', component: AddListComponent },
  { path: 'items', component: ItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
