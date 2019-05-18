import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<User>;
  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
  }

  login(email: string, password: string){
  }

  createUser(email: string, password: string) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password);

  }
}
