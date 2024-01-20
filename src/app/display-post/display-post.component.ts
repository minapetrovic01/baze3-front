import { Component, Input, OnInit } from '@angular/core';
import { Decision } from '../entities/decision';
import { Store } from '@ngrx/store';
import { AuthState, UsersState } from '../store/user.reducer';
import {  supportUser, unSupportUser } from '../store/user.actions';
import { AppState } from '../app.state';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.scss']
})
export class DisplayPostComponent implements OnInit {



  @Input() decision:Decision|null=null;
  criteriaString:string="";
  alternativesString:string="";
  supportEnabled:boolean=true;
  isMine:boolean=false;
  supportNumber:number=0;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    if(this.decision){
      this.criteriaString=this.makeCriteriaString();
      this.alternativesString=this.makeAlternativesString();
    }
    this.store.select((state)=>state.auth).subscribe((authState:AuthState)=>{
      if(authState.user){
        if(this.decision?.owner?.email===authState.user.email){
          this.isMine=true;
        }
      }
    });
    this.supportNumber=this.decision?.owner?.supportNumber||0;
  }

  makeAlternativesString():string{
    let alternativesString:string="Alternatives: ";
    if(this.decision){
      for(let i=0;i<this.decision.alternatives.length;i++){
        alternativesString+=this.decision.alternatives[i].name+` (${this.decision.alternatives[i].percentage})`;
        if(i<this.decision.alternatives.length-1){
          alternativesString+=", ";
        }
      }
    }
    return alternativesString;
  }

  makeCriteriaString():string{
    let criteriaString:string="Criteria: ";
    if(this.decision){
      for(let i=0;i<this.decision.criterias.length;i++){
        criteriaString+=this.decision.criterias[i].name+` (${this.decision.criterias[i].weight})`;
        if(i<this.decision.criterias.length-1){
          criteriaString+=", ";
        }
      }
    }
    return criteriaString;
  }

  unSupport() {
    if(this.decision?.owner?.email){
      this.supportEnabled=!this.supportEnabled;
      this.store.dispatch(unSupportUser({email:this.decision?.owner.email}));
    }
   this.supportNumber--;
  }

  support() { 
    if(this.decision?.owner?.email){
      this.supportEnabled=!this.supportEnabled;
      this.store.dispatch(supportUser({email:this.decision?.owner.email}));
    }
    this.supportNumber++;
  }

}
