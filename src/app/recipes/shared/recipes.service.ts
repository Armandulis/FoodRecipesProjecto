import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {FileService} from '../../files/files/shared/file.service';
import {ImageMetadata} from '../../files/shared/image-metadata';
import {Action} from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private db: AngularFirestore, private fs: FileService) { }

  getRecipes(): Observable<Recipe[]> {
    return this.db
      .collection<Recipe>('recipes')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Recipe;
            return {
              id: action.payload.doc.id,
              type: data.type,
              picture: data.picture,
              name: data.name,
              portion: data.portion,
              howTo: data.howTo,
              score: data.score,
              cookTime: data.cookTime,
              ingredients: data.ingredients
            };
          });
        })
      );
  }


  deleteRecipe(id: string): Observable<void> {
    return Observable.create(obs => {
      this.db.doc<Recipe>('recipes/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(obs.finally());
    });
  }

  addRecipeWithImage(recipe: Recipe, imageMeta: ImageMetadata)
    : Observable<Recipe> {
    return this.fs.uploadImage(imageMeta)
      .pipe(
        switchMap(metadata => {
          recipe.pictureId = metadata.id;
          return this.addRecipe(recipe);
        })
      );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return from(
      this.db.collection('recipes')
        .add(
          {
            type: recipe.type,
            picture: recipe.picture,
            portion: recipe.portion,
            howTo: recipe.howTo,
            score: recipe.score,
            name: recipe.name,
            cookTime: recipe.cookTime,
            ingredients: recipe.ingredients
          })
    ).pipe(
      map(recipeRef => {
        recipe.id = recipeRef.id;
        return recipe;
      })
    );
  }
}
