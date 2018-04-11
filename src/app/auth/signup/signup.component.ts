import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = '';
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp(myForm: NgForm){
    const email = myForm.value.email;
    const password = myForm.value.password;
    this.errorMessage = '';
    // this.authService.signupUser(email, password)
    // .catch(
    //   (error)=>{
    //     this.errorMessage = error.message;
    //   }
    // );
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));

  }

}
