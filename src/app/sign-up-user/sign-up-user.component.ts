import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../entities/user.dto';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { signUp } from '../store/user.actions';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit, OnDestroy{
 
  hidePassword: boolean = true;

  user:UserDto = new UserDto('','','','','','');

  constructor(private store: Store<AppState>,private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSignIn(): void {
    this.router.navigate(['sign-in']);
  }

  onSignUp(): void {
    this.store.dispatch(signUp({user:this.user}));
  }


}
