import {Recipe} from '../recipes/shared/recipe';

export class AddRecipe {
  static readonly type = '[Recipe] Add';

  constructor(public payload: Recipe) {}
}
