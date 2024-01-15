import { EntityState, createEntityAdapter } from "@ngrx/entity"
import { Decision } from "../entities/decision";
import { createReducer, on } from "@ngrx/store";
import { loadMyDecisions, loadMyDecisionsSuccess, loadSearchedDecisionsSuccess } from "./decisions.actions";


export interface DecisionsState extends EntityState<Decision> {
}

export interface MyDecisionsState extends EntityState<Decision> {
}


const adapterDecisions = createEntityAdapter<Decision>();
const adapterMyDecisions = createEntityAdapter<Decision>();

export const initialDecisionsState: DecisionsState = adapterDecisions.getInitialState();
export const initialMyDecisionsState: MyDecisionsState = adapterMyDecisions.getInitialState();


export const myDecisionsReducer=createReducer(
    initialMyDecisionsState,
    on(loadMyDecisionsSuccess, (state, { myDecisions }) => {
        return adapterDecisions.setAll(myDecisions, state);
    }),
);

export const searchedDecisionsReducer=createReducer(
    initialDecisionsState,
    on(loadSearchedDecisionsSuccess, (state, { searchedDecisions }) => {
        return adapterDecisions.setAll(searchedDecisions, state);
    }),
);

export const emptySearchReducer=createReducer(
    initialDecisionsState,
    on(loadSearchedDecisionsSuccess, (state, { searchedDecisions }) => {
        return adapterDecisions.removeAll(state);
    }),
);
    