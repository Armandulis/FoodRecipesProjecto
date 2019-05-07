import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileService} from '../../files/files/shared/file.service';
import {RecipeModel} from '../shared/recipe.model';
import {map, switchMap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {ImageMetadata} from '../../files/shared/image-metadata';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private db: AngularFirestore, private fs: FileService) {
  }

  getRecipes(): Observable<RecipeModel[]> {
    return this.db
      .collection<RecipeModel>('recipes')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as RecipeModel;
            return {
              id: action.payload.doc.id,
              type: data.type,
              picture: data.picture,
              portion: data.portion,
              howTo: data.howTo,
              score: data.score,
              ingredients: data.ingredients
            };
          });
        })
      );
  }


  deleteRecipe(id: string): Observable<void> {
    return Observable.create(obs => {
      this.db.doc<RecipeModel>('recipes/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(obs.finally());
    });
  }

  addRecipeWithImage(recipe: RecipeModel, imageMeta: ImageMetadata)
    : Observable<RecipeModel> {
    return this.fs.uploadImage(imageMeta)
      .pipe(
        switchMap(metadata => {
          recipe.pictureId = metadata.id;
          return this.addRecipe(recipe);
        })
      );
  }

  addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return from(
      this.db.collection('recipes')
        .add(
          {
            type: recipe.type,
            picture: recipe.picture,
            portion: recipe.portion,
            howTo: recipe.howTo,
            score: recipe.score,
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
