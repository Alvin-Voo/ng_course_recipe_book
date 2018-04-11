import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes=[
  {path:'', component: HomeComponent},
  {path:'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})//preload all modules as fast as possible, .. lazy modules will be loaded 'afterwards during idle time'
  ],
  exports:[RouterModule]//exports the *already configured* routermodule above
})

export class AppRoutingModule{}
