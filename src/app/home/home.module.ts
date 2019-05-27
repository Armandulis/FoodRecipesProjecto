import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CarouselModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    CarouselModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
