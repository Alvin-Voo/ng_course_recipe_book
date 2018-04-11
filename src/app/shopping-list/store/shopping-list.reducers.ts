import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface AppState{
  shoppingList: State
}

export interface State{
  ingredients: Ingredient[];
  editedIngredient : Ingredient;
  editedIngredientIndex : number;
}

const initialState : State = {
  'ingredients': [
    new Ingredient('garlic',14),
    new Ingredient('basil leaves',5)
  ],
  'editedIngredient': null,
  'editedIngredientIndex': -1
};

export function shoppingListReducer(state=initialState, action: ShoppingListActions.ShoppingListActions){
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      return{
        ...state,//<--- old state
          'ingredients' : [...state.ingredients, action.payload]//<--- new state overwrite old state immutably
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return{
        ...state,
          'ingredients' : [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, //<--- old state
        ...action.payload.ingredient//<-- overwrite by new state
      }
      const ingredients = [...state.ingredients];//<-- cannot directly assign, must provide a copy?
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return{
        ...state,
        'ingredients': ingredients,
        'editedIngredient': null,
        'editedIngredientIndex': -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return{
          ...state,
          ingredients: oldIngredients,
          'editedIngredient': null,
          'editedIngredientIndex': -1
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return{
        ...state,
        editedIngredient : editedIngredient,
        editedIngredientIndex : action.payload
      }
    default:
      return state;
  }
}
