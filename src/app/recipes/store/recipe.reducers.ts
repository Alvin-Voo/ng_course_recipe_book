import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{//appstate now becomes the BASE interface, featurestate will have all states of appstate
  recipes : State;
}

export interface State{
  recipes: Recipe[];
}

const initialState: State ={
  recipes: [
    new Recipe('recipe 1',
    'something mushy',
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Pieminister_beef_steak_ale_pie_%282%29.jpg/607px-Pieminister_beef_steak_ale_pie_%282%29.jpg",
  [
    new Ingredient('steak',1),
    new Ingredient('pie',2)
  ]),
    new Recipe('recipe 2',
    'something fishy',
    "https://images.pexels.com/photos/8758/food-dinner-lemon-rice.jpg?w=940&h=650&auto=compress&cs=tinysrgb",
  [
    new Ingredient('fish',1),
    new Ingredient('lemon',12)
  ])
  ]
}

export function recipeReducer(state=initialState, action : RecipeActions.RecipeActions){
  switch(action.type){
    case(RecipeActions.SET_RECIPES):
      return{
        ...state,
        recipes: [...action.payload]
      };
    case(RecipeActions.ADD_RECIPE):
      return{
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case(RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe ={
        ...recipe,
        ...action.payload.updatedRecipe//why must spread here?-- this kind of object assign syntax is expecting a key: string syntax.
        //spreading it will fullfill this requirement
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe
      return{
        ...state,
        recipes: recipes
      };
    case(RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload,1);
      return{
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
