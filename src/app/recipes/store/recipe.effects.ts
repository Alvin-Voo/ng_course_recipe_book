import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from './recipe.actions';
import { fromPromise } from "rxjs/observable/fromPromise";
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { Store } from "@ngrx/store";
import * as fromRecipe from './recipe.reducers';


@Injectable()
export class RecipeEffects{
  @Effect()
  recipeFetch = this.actions$
  .ofType(RecipeActions.FETCH_RECIPES)
  .switchMap(()=>{
    return this.httpClient
    .get<Recipe[]>('https://ng-recipe-book-ca30c.firebaseio.com/recipes.json',
    {observe:'body', responseType:'json'})

  })
  .map(
    (recipes: Recipe[])=>{
      console.log('fetched from effects!' + recipes);//seems like in observables n promise the console log data is a bit tricky
      recipes.forEach(
        (recipe: Recipe)=>{
          //create empty ingredients array for those which doesnt have any
          if (!recipe.ingredients) recipe.ingredients = new Array<Ingredient>();
        }
      )
      return{
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      }
    },
    ( err ) => console.log(err)
  )

  @Effect({dispatch: false})
  recipeStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .switchMap(
    ()=>{
      return this.store.select('recipes').take(1); //if using this way need to ensure that only one emission is taken..
      //else store action will be fired again as long as SET RECIPES or state is changed
    }
  )
  // .withLatestFrom(this.store.select('recipes'))
  .switchMap(
    (recipeState)=>{
      const httpRequest = new HttpRequest('PUT','https://ng-recipe-book-ca30c.firebaseio.com/recipes.json',
      recipeState.recipes,{reportProgress: true});

      return this.httpClient.request(httpRequest);
    }
  )
  .do(
      (response)=>{console.log('stored from effects '+ response)},
      (error)=>{console.log(error)}
    )


  constructor(private actions$: Actions,private httpClient: HttpClient,private store: Store<fromRecipe.FeatureState>){}

}
