import { EntityState, createEntityAdapter } from "@ngrx/entity"
import { Decision } from "../entities/decision";
import { createReducer, on } from "@ngrx/store";
import { loadMyDecisions, loadMyDecisionsSuccess, loadSearchedDecisionsSuccess,loadCachedDecisionsSuccess, saveDraftSucess, discardDraft, discardDraftSuccess, deleteCachedDecisionsSuccess } from "./decisions.actions";


export interface DecisionsState extends EntityState<Decision> {
}

export interface MyDecisionsState extends EntityState<Decision> {
}

export interface CacheDecisionsState extends EntityState<Decision> {
}


const adapterDecisions = createEntityAdapter<Decision>();
const adapterMyDecisions = createEntityAdapter<Decision>();
const adapterCacheDecisions = createEntityAdapter<Decision>();

export const initialDecisionsState: DecisionsState = adapterDecisions.getInitialState();
export const initialMyDecisionsState: MyDecisionsState = adapterMyDecisions.getInitialState();
export const initialCacheDecisionsState: CacheDecisionsState = adapterCacheDecisions.getInitialState();

export const myDecisionsReducer=createReducer(
    initialMyDecisionsState,
    on(loadMyDecisionsSuccess, (state, { myDecisions }) => {
        return adapterMyDecisions.setAll(myDecisions, state);
    }),
);

export const searchedDecisionsReducer=createReducer(
    initialDecisionsState,
    on(loadSearchedDecisionsSuccess, (state, { searchedDecisions }) => {
        return adapterDecisions.setAll(searchedDecisions, state);
    }),
);

export const cachedDecisionsReducer=createReducer(
    initialCacheDecisionsState,
    on(loadCachedDecisionsSuccess, (state, { cachedDecisions }) => {
        console.log(cachedDecisions);
        console.log("ovde je u reduceru");
        return adapterCacheDecisions.setAll(cachedDecisions, state);
    }),
    on(deleteCachedDecisionsSuccess, (state) => {
        return adapterCacheDecisions.removeAll(state);
    }),
);

export const emptySearchReducer=createReducer(
    initialDecisionsState,
    on(loadSearchedDecisionsSuccess, (state, { searchedDecisions }) => {
        return adapterDecisions.removeAll(state);
    }),
);


export interface UnfinishedDecisionState {
    decision: Decision|null;
  }

  export const initialState: UnfinishedDecisionState = {
    decision: null,
  };

  export const unfinishedDecisionReducer = createReducer(
    initialState,
    on(saveDraftSucess, (state, { decision }): UnfinishedDecisionState => ({ ...state, decision })),
    on(discardDraftSuccess, (state): UnfinishedDecisionState => ({ ...state, decision: null })),
  );