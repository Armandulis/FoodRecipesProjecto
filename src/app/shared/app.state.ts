import {Selector, State, StateContext} from '@ngxs/store';
import {Action} from 'rxjs/internal/scheduler/Action';
import {Recipe} from '../recipes/shared/recipe';
import {assertNumber} from '@angular/core/src/render3/assert';
import {AddRecipe} from './app.actions';

export interface AppStateModel {
  recipes: Recipe[];
  name: string;
  type: string;
  howTo: string;
  portion: any;
  picture: any;
}

  @State<AppStateModel>({
    name: 'recipes',
    defaults: {
      recipes: [],
      name: '',
      type: '',
      howTo: '',
      portion: '',
      picture: ''
    }
  })
  export class AppState {

    @Selector()
    static getRecipes(state: AppStateModel) {
      return state.recipes;
    }

    @Action(AddRecipe)
    add({getState, patchState }: StateContext<AppStateModel>, { payload }: AddRecipe) {
      const state = getState();
      patchState({
        recipes: [...state.recipes, payload]
      });
    }
  }
