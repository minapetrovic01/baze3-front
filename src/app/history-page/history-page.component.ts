import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectMyDecisions } from '../store/decisions.selector';
import { Decision } from '../entities/decision';
import { deleteCachedDecisions, loadCachedDecisions } from '../store/decisions.actions';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {


  constructor(private store:Store<AppState>) { }

  cachedDecisions:Decision[]=[];

  ngOnInit(): void {
    this.store.select(selectMyDecisions).subscribe((cachedDecisions)=>{
      this.cachedDecisions=cachedDecisions;
    });
    this.store.dispatch(loadCachedDecisions());
  }

  clearHistory() {
    this.store.dispatch(deleteCachedDecisions());
  }

}
