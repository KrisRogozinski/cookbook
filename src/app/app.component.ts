import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBKzKnqdzzqHEpwaCldQSlRGF3Nt2Ej6oA',
      authDomain: 'cookbook-81e90.firebaseapp.com'
    });
  }
}
