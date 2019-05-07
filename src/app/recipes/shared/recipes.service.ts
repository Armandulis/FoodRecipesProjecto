import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private db: AngularFirestore) { }

  addRecipe(recipeData: Recipe): Observable<Recipe> {
    return from(this.db.collection<Recipe>('recipes').add(
        {
          name: recipeData.name,
          type: recipeData.type,
          portion: recipeData.portion,
          howTo: recipeData.howTo,
          ingredients: recipeData.ingredients,
          cookTime: recipeData.cookTime
        }
      )
    ).pipe(
        map( recipeReference => {
            recipeData.id = recipeReference.id;
          return recipeData;
        })
      );
  }
}
