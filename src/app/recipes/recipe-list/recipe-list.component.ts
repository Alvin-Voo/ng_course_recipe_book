import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // recipes: Recipe[]; //an array of custom Recipe models
  recipeState: Observable<fromRecipe.State>;
  constructor(private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
