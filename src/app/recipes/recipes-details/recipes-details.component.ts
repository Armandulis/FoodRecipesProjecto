
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../shared/recipe';
import {RecipesService} from '../shared/recipes.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeID: string;
  searchSubscription: Subscription;
  
  constructor(private recipeService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.getRecipe();
      });
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

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
