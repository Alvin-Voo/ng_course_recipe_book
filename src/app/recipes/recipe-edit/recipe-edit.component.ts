import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['index'];
        this.editMode = params['index'] != null; //if link is /new, then there will be no id object, hence null
        this.initForm();
      }
    );
  }

  onSubmit(){
    // console.log(this.recipeForm);
    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipes({
        index: this.id,
        updatedRecipe:this.recipeForm.value}));
      this.router.navigate(['/recipes',this.id]);
    }
    else{
      this.store.dispatch(new RecipeActions.AddRecipes(this.recipeForm.value));
      //to get the length of current recipe state...
      this.store.select('recipes').take(1).subscribe(
        (recipeState: fromRecipe.State) =>{
          const recipeLen = recipeState.recipes.length;
          this.router.navigate(['/recipes',recipeLen-1]);
        }
      )
    }


  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
          'name' : new FormControl(null,Validators.required),
          'amount' : new FormControl(null,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
        }
      )
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(){
    console.log("init called "+this.id);
    let recipe: Recipe = new Recipe('','','',null);
    let ingredientArr = new FormArray([]);

    if(this.editMode){
      this.store.select('recipes').take(1).subscribe(
        (recipeState: fromRecipe.State) =>{
          recipe = recipeState.recipes[this.id]
          recipe.ingredients.forEach(
            (ingredient: Ingredient)=>{
              ingredientArr.push(
                new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          );
        }
      )
    }

    this.recipeForm = new FormGroup({
        'name': new FormControl(recipe.name,Validators.required),
        'imagePath': new FormControl(recipe.imagePath,Validators.required),
        'description': new FormControl(recipe.description,Validators.required),
        'ingredients': ingredientArr
    });
  }

}
