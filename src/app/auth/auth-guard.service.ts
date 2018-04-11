import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store:Store<fromApp.AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{

    return this.store.select('auth').take(1).map((authState: fromApp.AppState['auth']) =>{
      console.log("can activate auth invoked "+ authState.authenticated);
      if(!authState.authenticated) this.router.navigate(['/signin']);

      return authState.authenticated;
    });
    // if(!this.authService.isAuthenticated()){
    //   this.router.navigate(['/signin']);
    // }
    // return this.authService.isAuthenticated();
  }

}
