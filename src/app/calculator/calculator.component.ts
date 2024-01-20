import { Component, OnInit } from '@angular/core';
import { Decision } from '../entities/decision';
import { DecisionDto } from '../entities/decision.dto';
import { AlternativeDto } from '../entities/alternative.dto';
import { CriteriaDto } from '../entities/criteria.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOPSIS } from './methods';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { createDecision, discardDraft, loadCachedDecisions, loadDraft, saveDraft } from '../store/decisions.actions';
import { Chart, ChartOptions, LabelItem } from 'chart.js';
import { Router } from '@angular/router';
import { selectIsAuth, selectUserData } from '../store/user.selectors';
import { selectUnfinishedDecision } from '../store/decisions.selector';
import { TagDto } from '../entities/tag.dto';
import { User } from '../entities/user';
import { Tag } from '../entities/tag';
import { Criteria } from '../entities/criteria';
import { Alternative } from '../entities/alternative';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  public chart: any = null;

  

  decision: DecisionDto = new DecisionDto("", "");
  alternativeNumber: number = 0;
  criterionNumber: number = 0;
  alternatives: AlternativeDto[] = [];
  criterias: CriteriaDto[] = [];
  matrix: number[][] = [];
  weights: number[] = [];
  tags:TagDto[]=[];
  draft: Decision|null=null;
  tag1:string="";
  tag2:string="";
  tag3:string="";
  owner:User|null=null;

  altcritFormGroup!: FormGroup;
  isGuest:boolean=false;

  constructor(private _formBuilder: FormBuilder,
     private store: Store<AppState>,
     private router : Router) {

  }

  ngOnInit() {
    this.altcritFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tag1: ['', Validators.required],  
      tag2: ['', Validators.required],
      tag3: ['', Validators.required],
      alternativeNumber: ['', Validators.required],
      criteriaNumber: ['', Validators.required],
    });
    this.store.select(selectIsAuth).subscribe(isAuth => {
      if(!isAuth){
        this.isGuest=true;
      }
    });
    this.store.select(selectUserData).subscribe(user => {
      if(user){
        this.owner=user;
      }
    });
    this.store.select(selectUnfinishedDecision).subscribe(decision => {
      if(decision!==null && decision!==undefined){
        this.draft=decision;
        console.log(this.draft)
        if(this.draft!==null){
          this.setParametersFromDraft();
        }
      }
    });

    if(this.owner!==null){
      this.store.dispatch(loadDraft({email:this.owner!.email}));
    }

  }

  setParametersFromDraft(){

    this.altcritFormGroup.patchValue({
      name: this.draft?.name,
      description: this.draft?.description,
      alternativeNumber: this.draft?.alternatives.length,
      criteriaNumber: this.draft?.criterias.length,
      tag1: this.draft?.tags[0]?.name,
      tag2: this.draft?.tags[1]?.name,
      tag3: this.draft?.tags[2]?.name,
    });
    this.decision = new DecisionDto(this.altcritFormGroup.value.name, this.altcritFormGroup.value.description);
    this.resetAlternativesAndCriterias();
    
    // if(this.draft?.alternatives){
    //   this.draft.alternatives.forEach(element => {
    //     this.alternatives.push(new AlternativeDto(element.name, element.percentage));
    //   });
    // }
    // if(this.draft?.criterias){
    //   this.draft.criterias.forEach(element => {
    //     this.criterias.push(new CriteriaDto(element.name, element.weight));
    //   });
    // }
    this. alternativeNumber = this.altcritFormGroup.value.alternativeNumber;
    this.criterionNumber = this.altcritFormGroup.value.criteriaNumber;
   // this.matrix = Array.from({ length: this.alternativeNumber }, () => Array.from({ length: this.criterionNumber }, () => 0));

  }

  saveDecision() {
    this.decision = new DecisionDto(this.altcritFormGroup.value.name, this.altcritFormGroup.value.description);
    this.alternativeNumber = this.altcritFormGroup.value.alternativeNumber;
    this.criterionNumber = this.altcritFormGroup.value.criteriaNumber;
    this.resetAlternativesAndCriterias();

    for (let i = 0; i < this.alternativeNumber; i++) {
      if(this.draft!==null&& this.draft.alternatives.length>i){
        this.alternatives.push(new AlternativeDto(this.draft.alternatives[i].name, this.draft.alternatives[i].percentage));
      }else
        this.alternatives.push(new AlternativeDto("Alternative " + (i + 1), 0));
    }
    for (let i = 0; i < this.criterionNumber; i++) {
      if(this.draft!==null&& this.draft.criterias.length>i){
        this.criterias.push(new CriteriaDto(this.draft.criterias[i].name, this.draft.criterias[i].weight));
      }else
        this.criterias.push(new CriteriaDto("Criteria " + (i + 1), 0));
    }
    this.tags.push(new TagDto(this.altcritFormGroup.value.tag1));
    this.tags.push(new TagDto(this.altcritFormGroup.value.tag2));
    this.tags.push(new TagDto(this.altcritFormGroup.value.tag3));

    this.matrix = Array.from({ length: this.alternativeNumber }, () => Array.from({ length: this.criterionNumber }, () => 0));
  }
  resetAlternativesAndCriterias() {
    this.alternatives = [];
    this.criterias = [];
    this.tags=[];
  }
  doCalculations() {
    this.weights = this.criterias.map(c => c.weight);
    const result: number[] = TOPSIS(this.matrix, this.weights, this.criterionNumber, this.alternativeNumber);
    for (let i = 0; i < this.alternativeNumber; i++) {
      this.alternatives[i].percentage = Math.floor(result[i]);
    }
    this.plotPie();
  }
  plotPie() {
    this.chart = new Chart("MyChart", {
      type: 'doughnut',

      data: {
        labels: this.alternatives.map(a => a.name),
        datasets: [
          {
            label: "Decision",
            data: this.alternatives.map(a => a.percentage),
            backgroundColor: this.generateRandomColors(this.alternativeNumber),
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });

  }
  saveDecisionAndDoCalculations() {
    this.store.dispatch(createDecision({ decision: this.decision, alternatives: this.alternatives, criterias: this.criterias,tags:this.tags }));
    this.router.navigate(['/my-decisions']);
  }
  generateRandomColors(n: number) {
    const colors = [];

    for (let i = 0; i < n; i++) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }

    return colors;
  }

  discardDecision(){
    this.store.dispatch(discardDraft({email:this.owner!.email}));
    this.router.navigate(['/my-decisions']);
    
  }

  saveAsDraft(){
    let tags:Tag[]=[new Tag(this.altcritFormGroup.value.tag1),new Tag(this.altcritFormGroup.value.tag2),new Tag(this.altcritFormGroup.value.tag3)];
    let criterias1:Criteria[]=[];
    for(let i=0;i<this.criterias.length;i++){
      criterias1.push(new Criteria(0,this.criterias[i].name,this.criterias[i].weight,new Decision(0,"","",new Date(),[],[],[],this.owner!)));
    }
    let alternatives1:Alternative[]=[];
    for(let i=0;i<this.alternatives.length;i++){
      alternatives1.push(new Alternative(0,this.alternatives[i].name,this.alternatives[i].percentage,new Decision(0,"","",new Date(),[],[],[],this.owner!)));
    }

    let dft =new Decision(0,this.altcritFormGroup.value.name,this.altcritFormGroup.value.description,new Date(),alternatives1,criterias1,tags,this.owner!);
    this.store.dispatch(saveDraft({decision:dft}));
  }

  destroyCanvas(){
    this.chart.destroy();
  }

}
