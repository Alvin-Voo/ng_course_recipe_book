import { Component, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {
  shoppingListState:Observable<fromApp.AppState['shoppingList']>;

  // ingredients: Ingredient[];
  shoppingListSubs : Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
