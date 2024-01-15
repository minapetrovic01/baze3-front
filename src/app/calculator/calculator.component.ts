import { Component, OnInit } from '@angular/core';
import { Decision } from '../entities/decision';
import { DecisionDto } from '../entities/decision.dto';
import { AlternativeDto } from '../entities/alternative.dto';
import { CriteriaDto } from '../entities/criteria.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOPSIS } from './methods';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { createDecision } from '../store/decisions.actions';
import { Chart, ChartOptions, LabelItem } from 'chart.js';
import { Router } from '@angular/router';
import { selectIsAuth } from '../store/user.selectors';

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
      alternativeNumber: ['', Validators.required],
      criteriaNumber: ['', Validators.required],
    });
    this.store.select(selectIsAuth).subscribe(isAuth => {
      if(!isAuth){
        this.isGuest=true;
      }
    }
    );

  }

  saveDecision() {
    this.decision = new DecisionDto(this.altcritFormGroup.value.name, this.altcritFormGroup.value.description);
    this.alternativeNumber = this.altcritFormGroup.value.alternativeNumber;
    this.criterionNumber = this.altcritFormGroup.value.criteriaNumber;
    this.resetAlternativesAndCriterias();
    for (let i = 0; i < this.alternativeNumber; i++) {
      this.alternatives.push(new AlternativeDto("Alternative " + (i + 1), 0));
    }
    for (let i = 0; i < this.criterionNumber; i++) {
      this.criterias.push(new CriteriaDto("Criteria " + (i + 1), 0));
    }
    this.matrix = Array.from({ length: this.alternativeNumber }, () => Array.from({ length: this.criterionNumber }, () => 0));
  }
  resetAlternativesAndCriterias() {
    this.alternatives = [];
    this.criterias = [];
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
    this.store.dispatch(createDecision({ decision: this.decision, alternatives: this.alternatives, criterias: this.criterias }));
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

}
