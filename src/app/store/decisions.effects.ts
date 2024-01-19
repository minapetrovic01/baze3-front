import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DecisionService } from "../decision/decision.service";
import { AlternativeService } from "../alternative/alternative.service";
import { CriteriaService } from "../criteria/criteria.service";
import { createDecision, discardDraft, discardDraftSuccess, loadMyDecisions, loadMyDecisionsSuccess, loadSearchedDecisions, loadSearchedDecisionsSuccess, saveDraft, saveDraftSucess } from "./decisions.actions";
import { EMPTY, exhaustMap, forkJoin, map, mergeMap, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class DecisionsEffects {

    constructor(private readonly actions$: Actions,
        private decisionService: DecisionService,
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService,
        private readonly router: Router,
        ) { }

//load cachedDecisions treba da se uradi

    // loadMyDecisions$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(loadMyDecisions),
    //         exhaustMap((action) => {
    //             return this.decisionService.getMyDecisions().pipe(
    //                 map((myDecisions) => {console.log(myDecisions.body);
    //                     return loadMyDecisionsSuccess({ myDecisions: myDecisions.body })})
    //             );
    //         })
    //     )
    // }
    // );
    loadMyDecisions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadMyDecisions),
            switchMap((action) => {
                return this.decisionService.getMyDecisions().pipe(
                    map((myDecisions) => {
                        console.log(myDecisions.body);
                        return loadMyDecisionsSuccess({ myDecisions: myDecisions.body });
                    })
                );
            })
        );
    });

    loadSearchedDecisions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSearchedDecisions),
            exhaustMap((action) => {
                return this.decisionService.getSearchedDecisions(action.search).pipe(
                    map((searchedDecisions) => {console.log(searchedDecisions.body);return loadSearchedDecisionsSuccess({ searchedDecisions: searchedDecisions.body })}),
                );
            })
        )
    }
    );

    createDecision$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDecision),
            exhaustMap((action) => {
                return this.decisionService.createDecision(action.decision,action.tags).pipe(
                    mergeMap((decision) => {
                        const alternatives$ = this.alternativeService.createAlternatives(action.alternatives, decision.body.id);
                        const criterias$ = this.criteriaService.createCriterias(action.criterias, decision.body.id);
                        return forkJoin([alternatives$, criterias$]).pipe(
                            map(([alternatives, criterias]) => loadMyDecisions())
                        )
                    })
                )
            })
        )
    });

    createDraft$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(saveDraft),
            exhaustMap((action) => {
                return this.decisionService.createDraft(action.decision).pipe(
                    mergeMap((response) => {
                        if (response.status == 201) {
                            console.log(response)
                            return this.decisionService.getDraft().pipe(
                              map((dec) => saveDraftSucess({ decision: dec.body })),
                              tap(() => {
                                this.router.navigateByUrl("/feed");
                              })
                            );
                          } else {
                            return EMPTY;
                          }
                    })
                )
            })
        )
    });

    discardDraft$ = createEffect(() => {
          return this.actions$.pipe(
            ofType(discardDraft),
            map((user) => discardDraftSuccess()),
            tap(() => {
              this.router.navigateByUrl("/calculator");
            })
          );
        },
      );
}


