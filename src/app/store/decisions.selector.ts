import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Decision } from "../entities/decision";
import { UnfinishedDecisionState } from "./decisions.reducer";


export const selectSearchedDecisionsFeature=createSelector(
    (state: AppState) => state.searchedDecisions,
    (searchedDecisions) => searchedDecisions
);

export const selectSearchedDecisions=createSelector(
    selectSearchedDecisionsFeature,
    (state) => state.ids.map(id => state.entities[id])
    .filter(decision => decision !== undefined)
    .map(decision => <Decision>decision)
);

export const selectMyDecisionsFeature=createSelector(
    (state: AppState) => state.myDecisions,
    (myDecisions) => myDecisions
);

export const selectMyDecisions=createSelector(
    selectMyDecisionsFeature,
    (state) => state.ids.map(id => state.entities[id])
    .filter(decision => decision !== undefined)
    .map(decision => <Decision>decision)
);

export const selectCacheDecisionsFeature=createSelector(
    (state: AppState) => state.cachedDecisions,
    (cachedDecisions) => cachedDecisions
);

export const selectCachedDecisions=createSelector(
    selectCacheDecisionsFeature,
    (state) => state.ids.map(id => state.entities[id])
    .filter(decision => decision !== undefined)
    .map(decision => <Decision>decision)
);

export const unfinishedDecisionFeature = createFeatureSelector<UnfinishedDecisionState>("unfinishedDecision");

export const selectUnfinishedDecision = createSelector(
    unfinishedDecisionFeature,
    (state) => state.decision
);
