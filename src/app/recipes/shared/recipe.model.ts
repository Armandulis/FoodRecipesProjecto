import {Ingredient} from '../../shared/models/ingredient';

export interface RecipeModel {
  id?: string;
  type: string;
  picture: string;
  pictureId?: string;
  portion: number;
  howTo: string;
  score: number;
  ingredients: Ingredient[];
  url?: string;
}
