import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule',
  },
  {
    path: '', component: HomeComponent
  }

  /*
  Examples:
  {  path: 'cereals',
    loadChildren: './cereals/cereals.module#CerealsModule',
    data: {animation: 'isRight'}
  },
  {path: '', component: HomeComponent},
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
