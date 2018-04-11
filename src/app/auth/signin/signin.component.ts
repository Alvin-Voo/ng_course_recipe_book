import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage = "";

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn(myForm: NgForm){
    const email = myForm.value.email;
    const password = myForm.value.password;
    this.errorMessage='';
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
    // this.authService.signinUser(email, password)
    // .catch(
    //   (error)=>{
    //     this.errorMessage = error.message;
    //   }
    // );
  }
}
