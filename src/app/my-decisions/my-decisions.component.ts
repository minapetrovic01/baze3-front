import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectMyDecisions } from '../store/decisions.selector';
import { Decision } from '../entities/decision';
import { loadMyDecisions } from '../store/decisions.actions';

@Component({
  selector: 'app-my-decisions',
  templateUrl: './my-decisions.component.html',
  styleUrls: ['./my-decisions.component.scss']
})
export class MyDecisionsComponent implements OnInit{

  myDecisions:Decision[]=[];

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectMyDecisions).subscribe((myDecisions)=>{
      this.myDecisions=myDecisions;
    });
    this.store.dispatch(loadMyDecisions());

  }

}
