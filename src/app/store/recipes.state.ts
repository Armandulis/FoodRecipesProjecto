// recipes.actions.ts

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Recipe} from '../recipes/shared/recipe';
import {RecipesService} from '../recipes/shared/recipes.service';
import {LoadRecipes, LoadRecipesFail, LoadRecipesSuccess, recipesActions, SelectRecipe} from './recipes.actions';

// recipes model
export interface RecipesStateModel {
  recipes: Recipe[];
  loaded: boolean;
  loading: boolean;
  selectedRecipeId: any;
}
// recipes initial state
@State<RecipesStateModel>({
  name: 'recipesState',
  defaults: {
    recipes: [],
    loaded: false,
    loading: false,
    selectedRecipeId: null
  }
})
export class RecipesState {
  constructor(private recipeService: RecipesService) {}
  @Selector()
  static recipes(state: RecipesStateModel) {
    return state.recipes;
  }
  @Selector()
  static loaded(state: RecipesStateModel) {
    return state.loaded;
  }

  @Selector()
  static SelectedRecipe(state: RecipesStateModel): Recipe {
    return state.recipes.find(
      (recipe: Recipe) => recipe.id === state.selectedRecipeId
    );
  }
  // load recipe xd
  @Action(LoadRecipes)
  loadRecipes({ patchState, dispatch }: StateContext<RecipesStateModel>) {
    patchState({ loading: true });
    return this.recipeService
      .getRecipes()
      .pipe(
        map((recipes: Recipe[]) =>
          asapScheduler.schedule(() =>
            dispatch(new LoadRecipesSuccess(recipes))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new LoadRecipesFail(error))
            )
          )
        )
      );
  }

  @Action(LoadRecipesSuccess)
  loadRecipesSuccess(
    { patchState }: StateContext<RecipesStateModel>,
    { payload }: LoadRecipesSuccess
  ) {
    patchState({ recipes: payload, loaded: true, loading: false });
  }

  @Action(LoadRecipesFail)
  loadRecipesFail(
    { dispatch }: StateContext<RecipesStateModel>,
    { payload }: LoadRecipesFail
  ) {
    dispatch({ loaded: false, loading: false });
  }

  // ---- selected Pizza ----
  @Action(SelectRecipe)
  selectedRecipe(
    { patchState }: StateContext<RecipesStateModel>,
    { payload }: SelectRecipe
  ) {
    patchState({ selectedRecipeId: payload });
  }
}
