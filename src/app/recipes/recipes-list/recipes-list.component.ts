import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../../files/files/shared/file.service';
import {tap} from 'rxjs/operators';
import {RecipesService} from '../shared/recipes.service';
import {Recipe} from '../shared/recipe';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {


  recipes: Observable<Recipe[]>;




  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private rs: RecipesService,
    private fs: FileService) {
    this.recipes = this.store.select(state => state.recipes.recipes);
  }

  ngOnInit() {
  }
}
