import { Component, OnInit } from '@angular/core';
import { Decision } from '../entities/decision';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectSearchedDecisions } from '../store/decisions.selector';
import { loadSearchedDecisions } from '../store/decisions.actions';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  searchedDecisions:Decision[]=[];
  searchAlternativeName:string="";

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectSearchedDecisions).subscribe((searchedDecisions)=>{
      this.searchedDecisions=searchedDecisions;
    });
  }

  search(){
    this.store.dispatch(loadSearchedDecisions({search:this.searchAlternativeName}));
  }
  
}
