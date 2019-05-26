// load Recipe actions
import {Recipe} from '../recipes/shared/recipe';

export class LoadRecipes {
  static readonly type = '[Recipes] Load Recipes';
}
export class LoadRecipesSuccess {
  static readonly type = '[Recipes] Load Recipes Success';
  constructor(public readonly payload: Recipe[]) {}
}
export class LoadRecipesFail {
  static readonly type = '[Recipes] Load Recipes Fail';
  constructor(public readonly payload?: any) {}
}

// create Recipe actions
export class CreateRecipe {
  static readonly type = '[Recipes] Create Recipe';
  constructor(public readonly payload: Recipe) {}
}
export class CreateRecipeSuccess {
  static readonly type = '[Recipes] Create Recipe Success';
  constructor(public readonly payload: Recipe) {}
}
export class CreateRecipeFail {
  static readonly type = '[Recipes] Create Recipe Fail';
  constructor(public readonly payload?: Recipe) {}
}

// update Recipe actions
export class UpdateRecipe {
  static readonly type = '[Recipes] Update Recipe';
  constructor(public readonly payload: Recipe) {}
}
export class UpdateRecipeaSuccess {
  static readonly type = '[Recipes] Update Recipe Success';
  constructor(public readonly payload: Recipe) {}
}
export class UpdateRecipeFail {
  static readonly type = '[Recipes] Update Recipe Fail';
  constructor(public readonly payload?: Recipe) {}
}

// remove Recipe action
export class RemoveRecipe {
  static readonly type = '[Recipes] Remove Recipe';
  constructor(public readonly payload: Recipe) {}
}
export class RemoveRecipeSuccess {
  static readonly type = '[Recipes] Remove Recipe Success';
  constructor(public readonly payload: Recipe) {}
}
export class RemoveRecipeFail {
  static readonly type = '[Recipes] Remove Recipe Fail';
  constructor(public readonly payload?: Recipe) {}
}

// selected Pizza action
export class SelectRecipe {
  static readonly type = '[Recipes] Select Recipe';
  constructor(public readonly payload: number) {}
}

export type recipesActions =
  | LoadRecipes
  | LoadRecipesSuccess
  | LoadRecipesFail
  | CreateRecipe
  | CreateRecipeSuccess
  | CreateRecipeFail
  | UpdateRecipe
  | UpdateRecipeaSuccess
  | UpdateRecipeFail
  | RemoveRecipe
  | RemoveRecipeSuccess
  | RemoveRecipeFail;
