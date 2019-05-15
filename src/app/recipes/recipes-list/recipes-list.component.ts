import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../../files/shared/file.service';
import {tap} from 'rxjs/operators';
import {RecipesService} from '../shared/recipes.service';
import {Recipe} from '../shared/recipe';

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
    private rs: RecipesService,) {
  }

  ngOnInit() {
    this.recipes = this.rs.getRecipes();
  }
  deleteRecipe(recipe: Recipe) {
    const obs = this.rs.deleteRecipe(recipe.id);
    obs.subscribe(() => {
      window.alert('balanced as all things should be');
    });
  }

}
