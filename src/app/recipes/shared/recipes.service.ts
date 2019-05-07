import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {FileService} from '../../files/files/shared/file.service';
import {ImageMetadata} from '../../files/shared/image-metadata';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private db: AngularFirestore, private fs: FileService) { }

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
              portion: data.portion,
              howTo: data.howTo,
              score: data.score,
              ingredients: data.ingredients,
              name: data.name,
              cookTime: data.cookTime
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
}
