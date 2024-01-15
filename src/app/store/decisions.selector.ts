import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Decision } from "../entities/decision";


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
