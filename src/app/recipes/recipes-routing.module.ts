import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeDummyComponent } from "./recipe-dummy/recipe-dummy.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoutes: Routes=[
  {path:'',
  component: RecipesComponent,
  children:[
    {path:'',component:RecipeDummyComponent},
    {path:'new',component:RecipeEditComponent, canActivate:[AuthGuard]},
    {path:':index',component: RecipeDetailComponent},
    {path:':index/edit',component: RecipeEditComponent, canActivate:[AuthGuard]}

  ]}
];

@NgModule({
  imports:[
    RouterModule.forChild(recipesRoutes)//for child here, as this is a child module
  ],
  exports:[RouterModule],//exports the *already configured* routermodule above
  providers:[AuthGuard]
})


export class RecipesRoutingModule{}
