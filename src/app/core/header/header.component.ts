import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.action';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromApp.AppState['auth']>
  isCollapsed = false;

  constructor(private store: Store<fromRecipe.FeatureState>) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave(){
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetch(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onSignOut(){
    this.store.dispatch(new AuthActions.Logout());
  }
}
