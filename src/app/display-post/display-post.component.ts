import { Component, Input, OnInit } from '@angular/core';
import { Decision } from '../entities/decision';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.scss']
})
export class DisplayPostComponent implements OnInit {


  @Input() decision:Decision|null=null;
  criteriaString:string="";
  alternativesString:string="";

  constructor() { }

  ngOnInit(): void {
    if(this.decision){
      this.criteriaString=this.makeCriteriaString();
      this.alternativesString=this.makeAlternativesString();
    }
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

}
