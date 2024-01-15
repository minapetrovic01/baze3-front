import { Component, OnInit } from '@angular/core';
import { AppState } from './app.state';
import { Store, on } from '@ngrx/store';
import { selectIsAuth } from './store/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'platform';
 
}
