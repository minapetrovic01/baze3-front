import { MyDecisionsState, DecisionsState, CacheDecisionsState, UnfinishedDecisionState } from "./store/decisions.reducer";
import { AuthState } from "./store/user.reducer";

export interface AppState{
    auth: AuthState;
    myDecisions: MyDecisionsState;
    searchedDecisions: DecisionsState;
    cachedDecisions: CacheDecisionsState;
    unfinishedDecision: UnfinishedDecisionState;
}