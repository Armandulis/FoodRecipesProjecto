import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipesAddComponent} from './recipes-add/recipes-add.component';

const routes: Routes = [
  {
    path: '', component: RecipesListComponent
  },
  { path: 'add', component: RecipesAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
