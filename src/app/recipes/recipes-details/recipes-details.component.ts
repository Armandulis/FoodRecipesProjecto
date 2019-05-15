import { Component, OnInit } from '@angular/core';
import {Recipe} from '../shared/recipe';
import {RecipesService} from '../shared/recipes.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {

  recipe: Recipe;
  recipeID: string;
  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeID = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeWithID(this.recipeID).subscribe(
      recipeDB => {
        this.recipe = recipeDB;
        this.recipe.id = this.recipeID;
      }
    );
  }

}
