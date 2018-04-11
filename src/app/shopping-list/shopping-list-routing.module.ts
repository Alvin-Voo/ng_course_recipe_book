import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingRoutes: Routes=[
  {path:'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports:[
    RouterModule.forChild(shoppingRoutes)//for child here, as this is a child module
  ],
  exports:[RouterModule]//exports the *already configured* routermodule above
})


export class ShoppingListRoutingModule{}
