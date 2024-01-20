import { createAction, props } from "@ngrx/store";
import { User } from "../entities/user";
import { UserDto } from "../entities/user.dto";

export const login = createAction(
  "[Auth] Login",
  props<{ email: string; password: string }>()
);

export const loginsuccess = createAction(
  "[Auth] Login Success",
  props<{ user: User; }>()
);

export const loginError = createAction(
  "[Auth] Login",
  props<{ message: string }>()
);

export const logout = createAction("[Auth] Log Out");

export const setUser = createAction(
  "[Auth] Set user",
  props<{ user: User }>(),
);

export const signUp = createAction(
  "[Auth] Sign Up",
  props<{ user: UserDto }>()
);

export const deleteUser = createAction(
  "[Auth] Delete User",
  props<{ email: string }>()
);

export const supportUser = createAction(
  "[Auth] Support User",
  props<{ email: string }>()
);
export const unSupportUser = createAction(
  "[Auth] UnSupport",
  props<{ email: string }>()
);
export const supportUserSuccess = createAction(
  "[Auth] Support User scs",
);
export const supportUserFailure = createAction(
  "[Auth] support failure",
  props<{ errorMessage: string }>()
);