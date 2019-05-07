import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesAddComponent } from './recipes-add/recipes-add.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [RecipesAddComponent, RecipesListComponent, RecipesDetailsComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ]
})
export class RecipesModule { }
