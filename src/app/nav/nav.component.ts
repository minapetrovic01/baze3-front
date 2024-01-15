import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { logout } from '../store/user.actions';
import { emptySearch } from '../store/decisions.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router:Router,private store:Store<AppState>) { }

  addNewDecision() {
    this.router.navigate(['/calculator']);
  }

  myDecisions() {
    this.router.navigate(['/my-decisions']);
  }
  searchForOthers() {
    this.router.navigate(['/feed']);
  }
  goToProfile() {
    this.router.navigate(['/my-profile']);
  }

  signOut() {
   
    // this.mainPageGuard.setGuardStatus(false);
    // this.profileGuard.setGuardStatus(false);
    this.store.dispatch(logout());
    this.store.dispatch(emptySearch());

    this.router.navigate(['/sign-in']);
  }

 

}
