import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DecisionService } from "../decision/decision.service";
import { AlternativeService } from "../alternative/alternative.service";
import { CriteriaService } from "../criteria/criteria.service";
import { createDecision, deleteCachedDecisions, deleteCachedDecisionsSuccess, deleteDecision, discardDraft, discardDraftSuccess, loadCachedDecisions, loadCachedDecisionsSuccess, loadDraft, loadDraftSuccess, loadMyDecisions, loadMyDecisionsSuccess, loadSearchedDecisions, loadSearchedDecisionsSuccess, saveDraft, saveDraftSucess } from "./decisions.actions";
import { EMPTY, catchError, exhaustMap, forkJoin, map, mergeMap, switchMap, take, tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class DecisionsEffects {

    constructor(private readonly actions$: Actions,
        private decisionService: DecisionService,
        private alternativeService: AlternativeService,
        private criteriaService: CriteriaService,
        private readonly router: Router,
    ) { }


    loadMyDecisions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadMyDecisions),
            switchMap((action) => {
                return this.decisionService.getMyDecisions().pipe(
                    map((myDecisions) => {
                        return loadMyDecisionsSuccess({ myDecisions: myDecisions.body });
                    })
                );
            })
        );
    });

    loadCachedDecisions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadCachedDecisions),
            exhaustMap((action) => {
                return this.decisionService.getCachedDecisions().pipe(
                    map((cachedDecisions) => loadCachedDecisionsSuccess({ cachedDecisions: cachedDecisions.body })),
                    catchError(() => EMPTY) 
                );
            })
        );
    });

    deleteCachedDecisions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCachedDecisions),
            switchMap((action) => {
                return this.decisionService.deleteCachedDecisions().pipe(
                    map((cachedDecisions) => {
                        return deleteCachedDecisionsSuccess();
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
                    map((searchedDecisions) => { return loadSearchedDecisionsSuccess({ searchedDecisions: searchedDecisions.body }) }),
                );
            })
        )
    }
    );

    createDecision$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDecision),
            exhaustMap((action) => {
                return this.decisionService.createDecision(action.decision, action.tags).pipe(
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
            switchMap((action) => {
                return this.decisionService.deleteDraft().pipe(
                    map((draft) => {
                        return discardDraftSuccess();
                    }), tap(() => {
                        this.router.navigateByUrl("/feed");
                    })
                );
            })
        );
    },
    );

    loadDraft$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadDraft),
            switchMap((action) => {
                return this.decisionService.getDraft().pipe(
                    map((draft) => {
                        return loadDraftSuccess({ decision: draft.body });
                    })
                );
            })
        );
    });

    deleteDecision$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteDecision),
            switchMap((action) => {
                return this.decisionService.deleteDecision(action.id).pipe(
                    map((draft) => {
                        return loadMyDecisions();
                    }), tap(() => {
                        this.router.navigateByUrl("/feed");
                    })
                );
            })
        );
    },
    );

}


