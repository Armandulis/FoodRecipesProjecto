import {Ingredient} from '../../shared/models/ingredient';

export interface Recipe {
  id?: string;
  type: string;
  name: string;
  picture?: string;
  portion: number;
  howTo: string;
  score?: number;
  cookTime: string;
  ingredients?: Ingredient[];
}
