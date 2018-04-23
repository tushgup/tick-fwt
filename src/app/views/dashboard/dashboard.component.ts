import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal = '';
  dbURL = '';

  constructor(public authService: AuthService, public af: AngularFireDatabase) {
    this.dbURL = '/users/' + authService.userDetails.uid + '/tasks/';
    this.items = af.list(this.dbURL, {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.authService.authState;

   }

   Send(desc: string) {
    this.items.push({ message: desc });
    this.msgVal = '';
}

  ngOnInit() {
  }

}
