import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';

import { Ingredient } from '../../shared/ingredient.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  index : number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) {

  }

  ngOnInit() {
    console.log("detail called");
    this.route.params.subscribe(
      (params: Params) => {
        this.index = Number(params['index']);
        this.recipeState = this.store.select('recipes');
      }
    )
  }

  toShoppingList(){

    this.store.select('recipes').take(1)
    .subscribe((recipeState: fromRecipe.State)=>{
        console.log("shopping list caled");
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.index].ingredients));
    })

  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
    this.router.navigate(['/recipes']);
  }

}
