import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../../files/shared/file.service';
import {tap} from 'rxjs/operators';
import {RecipesService} from '../shared/recipes.service';
import {Recipe} from '../shared/recipe';
import {Select, Store} from '@ngxs/store';
import {LoadRecipes, RecipesState, RemoveRecipe} from '../../store';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  @Select(RecipesState.recipes)
  recipes: Observable<Recipe[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rs: RecipesService,
    private store: Store) {

  }

  ngOnInit() {
   // this.recipes = this.store.select(state => state.recipes.recipes);
    this.store.dispatch(new LoadRecipes());
  }

  deleteRecipe(recipe: Recipe) {
    this.store.dispatch(new RemoveRecipe(recipe));
  }

}
