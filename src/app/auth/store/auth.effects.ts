import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects'

import * as AuthActions from './auth.action';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
  .ofType(AuthActions.TRY_SIGNUP) //<-- ofType is from Actions class, returning Action ofType ...
  .map((action: AuthActions.TrySignup) =>{
    return action.payload;
    //return Observable<payload:{username: string, password: string}>
  })
  .switchMap((authData: {username: string, password: string}) =>{
    return fromPromise(firebase.auth().
    createUserWithEmailAndPassword(authData.username, authData.password)
    .then( user => {this.router.navigate(['/'])} )
    .catch( err => console.log("sign up error "+ err.message)))
    ;
    //return the Observable<user object/ response>
  })
  .switchMap(()=>{
    return fromPromise(firebase.auth().currentUser.getIdToken()
  .catch( err => console.log("signup - getting ID token error "+ err.message)));
    //return Observable<token>
  })
  .mergeMap((token: string)=>{
    return [
      {
        type: AuthActions.SIGNUP //<--dispatch to change state to authorized
      },
      {
        type:AuthActions.SET_TOKEN,//<-dispatch to set token
        payload: token
      }
    ] //<--2 observableS are returned here by 'MergeMap', effectively dispatching 2 'effects'
    //<-- @Effect will take care of these and dispatch the 2 actions accordingly
    //The last step of dispatching observable<action> via map alone or observable<action>s via mergeMap
    //is required by @Effect()
    //unless @Effect({dispatch:false})
  });

  @Effect()
  authSignin = this.actions$
  .ofType(AuthActions.TRY_SIGNIN)
  .map((action: AuthActions.TrySignin) =>{
    return action.payload;
  })
  .switchMap((authData: {username: string, password: string}) =>{
    return fromPromise(firebase.auth().
    signInWithEmailAndPassword(authData.username,authData.password)
    .then( user => {this.router.navigate(['/']); console.log("using effects")} )
    .catch( err => console.log("sign in error "+ err.message)))
    ;
  })
  .switchMap(() =>{
    return fromPromise(firebase.auth().currentUser.getIdToken()
  .catch( err => console.log("signin - getting ID token error "+ err.message)));
  })
  .mergeMap((token: string)=>{
    return [
      {
        type: AuthActions.SIGNIN //<--dispatch to change state to authorized
      },
      {
        type:AuthActions.SET_TOKEN,//<-dispatch to set token
        payload: token
      }
    ]
  });

  @Effect({dispatch: false})//<-- dont dispatch an action at the end
  authLogout = this.actions$
  .ofType(AuthActions.LOGOUT)
  .map(()=>{
    console.log("logout from effects");
    return fromPromise(firebase.auth().signOut())
  })
  .do(
    ()=>{
      this.router.navigate(['/signin']);
    }
  )

  constructor(private actions$: Actions, private router: Router){}
}
