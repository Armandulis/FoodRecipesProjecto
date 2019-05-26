import { Component, OnInit } from '@angular/core';
import {Recipe} from '../shared/recipe';
import {RecipesService} from '../shared/recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {

  recipe: Recipe;
  constructor(private recipeService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipe();
  }

  private getRecipe() {
    const recipeID = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeWithID(recipeID).subscribe(
      recipeDB => {
        this.recipe = recipeDB;
      }
    );
  }

}
