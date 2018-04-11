import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action' ;
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm:NgForm;
  editItemSubs: Subscription;
  editMode = false;
  editItemIngredient: Ingredient;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.editItemSubs = this.store.select('shoppingList')
    .subscribe(
      data=>{
          if (data.editedIngredientIndex>-1){
            console.log('data edit ingredient '+ data.editedIngredientIndex);
            this.editItemIngredient = data.editedIngredient;
            this.editMode = true;
            this.myForm.setValue({
              'name' : this.editItemIngredient.name,
              'amount' : this.editItemIngredient.amount
            });
          }else
            this.editMode = false
      }
    );
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(){
    this.myForm.reset();
    this.editMode = false;
  }

  onSubmitForm(){
    // console.log(myForm);
    const newIngredient = new Ingredient(this.myForm.value.name,this.myForm.value.amount);
    if(!this.editMode)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    else
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));

    this.myForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editItemSubs.unsubscribe();
  }
}
