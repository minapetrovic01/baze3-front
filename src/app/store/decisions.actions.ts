import { createAction, props } from "@ngrx/store";
import { Decision } from "../entities/decision";
import { Alternative } from "../entities/alternative";
import { Criteria } from "../entities/criteria";
import { DecisionDto } from "../entities/decision.dto";
import { AlternativeDto } from "../entities/alternative.dto";
import { CriteriaDto } from "../entities/criteria.dto";


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

export const createDecision = createAction(
    '[Decisions] Create Decision',
    props<{ decision: DecisionDto,alternatives:AlternativeDto[], criterias:CriteriaDto[] }>()
);

export const emptySearch = createAction(
    '[Decisions] Empty Search'
);