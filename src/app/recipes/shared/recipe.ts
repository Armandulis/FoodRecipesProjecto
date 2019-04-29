import {Ingredient} from '../../shared/models/ingredient';

export interface Recipe {
  id?: string;
  type: string;
  picture: string;
  portion: number;
  howTo: string;
  score: number;
  ingredients: Ingredient[];
}
