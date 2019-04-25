import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
