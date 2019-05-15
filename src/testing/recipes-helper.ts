import {Recipe} from '../app/recipes/shared/recipe';

export class Helper {
  recipesList: Recipe[] = [];

  createRecipes(amount: number): Recipe[] {
    for (let i = 0; i < amount; i++) {
      this.recipesList.push({
        id: 'recipesID',
        name: 'recipe' + i,
        type: 'fish',
        howTo: 'cook',
        picture: 'wdas',
        url: 'picsulr',
        cookTime: 'time: ' + i,
        portion: i + ' people',
        ingredients: [
          { name: ' cabbage',
            amount: '1'},
          { name: ' salt',
            amount: '20 g'}
        ]
      });
    }
    return this.recipesList;
  }
}
