import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';

@NgModule({
  declarations: [RecipesAddComponent, RecipesListComponent, RecipesDetailsComponent],
  imports: [
    CommonModule,
    FilesModule,
    ReactiveFormsModule,
    ImageCropperModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
