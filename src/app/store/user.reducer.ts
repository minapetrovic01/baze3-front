import { createReducer, on } from "@ngrx/store";
import { User } from "../entities/user";
import { loginError, loginsuccess, logout, setUser } from "./user.actions";
import { EntityState } from "@ngrx/entity";

export interface AuthState {
  user: User | null;
}

export interface UsersState extends EntityState<User> {

}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }): AuthState => ({ ...state, user })),

  on(loginsuccess, (state, { user }): AuthState => ({ ...state, user })),
  on(loginError, (state, { message }): AuthState => ({ ...state, user: null })),
  on(logout, (state): AuthState => ({ ...state, user: null, }))
);