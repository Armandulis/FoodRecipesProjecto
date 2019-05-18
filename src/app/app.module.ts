import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {environment} from '../environments/environment';


import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {RouterState} from '@angular/router';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {RecipesState} from './store/recipes.state';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    CarouselModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgxsModule.forRoot([
      RecipesState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
