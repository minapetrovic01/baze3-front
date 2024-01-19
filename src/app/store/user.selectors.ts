import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.reducer";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectIsAuth = createSelector(
  authFeature,
  (state) => !!state.user!=null
);
export const selectUserData = createSelector(
  authFeature,
  (state) => state.user
);