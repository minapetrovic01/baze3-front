import { createAction, props } from "@ngrx/store";
import { Decision } from "../entities/decision";
import { Alternative } from "../entities/alternative";
import { Criteria } from "../entities/criteria";
import { DecisionDto } from "../entities/decision.dto";
import { AlternativeDto } from "../entities/alternative.dto";
import { CriteriaDto } from "../entities/criteria.dto";
import { TagDto } from "../entities/tag.dto";


export const loadMyDecisions = createAction(
    '[Decisions] Load My Decisions'
);

export const loadMyDecisionsSuccess = createAction(
    '[Decisions] Load My Decisions Success',
    props<{ myDecisions: Decision[] }>()
);

export const loadSearchedDecisions = createAction(
    '[Decisions] Load Searched Decisions',
    props<{ search: string }>()
);

export const loadSearchedDecisionsSuccess = createAction(
    '[Decisions] Load Searched Decisions Success',
    props<{ searchedDecisions: Decision[] }>()
);

export const loadCachedDecisions = createAction(
    '[Decisions] Load Cached Decisions'
);

export const deleteCachedDecisions = createAction(
    '[Decisions] Delete Cached Decisions'
);

export const deleteCachedDecisionsSuccess = createAction(
    '[Decisions] Deleted Cached Decisions'
);

export const loadCachedDecisionsSuccess = createAction(
    '[Decisions] Load Cached Decisions',
    props<{ cachedDecisions: Decision[] }>()
);

export const createDecision = createAction(
    '[Decisions] Create Decision',
    props<{ decision: DecisionDto,alternatives:AlternativeDto[], criterias:CriteriaDto[], }>()
);

export const saveDraft = createAction(
    '[Decisions] Create Draft Decision',
    props<{ decision: Decision }>()
)
export const saveDraftSucess = createAction(
    '[Decisions] Create Draft Success',
    props<{ decision: Decision}>()
)
export const discardDraft = createAction(
    '[Decisions] Discard Draft Decision',
    props<{ email: string }>()
)
export const discardDraftSuccess = createAction(
    '[Decisions] Discard Draft Success',
)




export const createDecisionPartial = createAction(
    '[Decisions] Create Decision Partial',
    props<{ decision: DecisionDto,alternatives:AlternativeDto[], criterias:CriteriaDto[], }>()
);

export const emptySearch = createAction(
    '[Decisions] Empty Search'
);