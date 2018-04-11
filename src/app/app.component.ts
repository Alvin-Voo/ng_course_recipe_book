import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  headerClicked = "Recipes";

  constructor(){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBKsXzwX0NuD8Okoq8irtNEstMfi9NxZFQ",
      authDomain: "ng-recipe-book-ca30c.firebaseapp.com"
    });
  }

  onHeaderClicked(event){//object key here must be same as the one sent by event emitter
    this.headerClicked = event;
  }


}
