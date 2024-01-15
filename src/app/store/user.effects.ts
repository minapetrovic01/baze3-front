import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { deleteUser, login, loginError, loginsuccess, logout, signUp } from "./user.actions";
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpResponse } from "@angular/common/http";


@Injectable()
export class UserEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private userService: UserService,
    private jwtHelper: JwtHelperService) { }

    delete$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deleteUser),
        mergeMap((action) => {
          return this.userService.deleteUser(action.id).pipe(
            switchMap((response) => {
              if (response.status == 200) {
                return of(logout());
              } else {
                return EMPTY;
              }
            }),
            catchError((error: any) => {
              if (error.status == 401) {
                return of(loginError({ message: "Invalid credentials" }));
              } else {
                return of(loginError({ message: "Something went wrong" })) ;
              }
            })
          );
        })
      )
    },
  );


 

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        return this.userService.signIn(action.email, action.password).pipe(
          switchMap((response) => {
            if (response.status == 201) {
              const token = response.body['access_token'];
              const decodedToken: number = this.jwtHelper.decodeToken(token).sub;
              return this.userService.getUser(decodedToken,token).pipe(
                map((user) => loginsuccess({ user: user.body, token })),
                tap(() => {
                  this.router.navigateByUrl("/feed");
                })
              );
            } else {
              return EMPTY;
            }
          }),
          catchError((error: any) => {
            if (error.status == 401) {
              return of(loginError({ message: "Invalid credentials" }));
            } else {
              return of(loginError({ message: "Something went wrong" })) ;
            }
          })
        );
      })
    )
  },
);

// login$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(login),
//     mergeMap((action) => {
//       return this.userService.signIn(action.email, action.password).pipe(
//         switchMap((response) => {
//           if (response.status == 201) {
//             const token = response.body['access_token'];
//             const decodedToken: number = this.jwtHelper.decodeToken(token).sub;
//             return this.userService.getProfile(token).pipe(
//               map((user) => loginsuccess({ user: user.body, token })),
//               tap(() => {
//                 this.router.navigateByUrl("/feed");
//               })
//             );
//           } else {
//             return EMPTY;
//           }
//         }),
//         catchError((error: any) => {
//           if (error.status == 401) {
//             return of(loginError({ message: "Invalid credentials" }));
//           } else {
//             return of(loginError({ message: "Something went wrong" })) ;
//           }
//         })
//       );
//     })
//   )
// },
// );

 
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.router.navigateByUrl("/sign-in");
        })
      );
    },
    { dispatch: false }
  );

 signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      mergeMap((action) => {
        return this.userService.signUp(action.user).pipe(
          switchMap((response) => {
            if (response.status == 201) {
              const token = response.body['access_token'];
              const decodedToken: number = this.jwtHelper.decodeToken(token).sub;
              return this.userService.getUser(decodedToken,token).pipe(
                map((user) => loginsuccess({ user: user.body, token })),
                tap(() => {
                  this.router.navigateByUrl("/feed");
                })
              );
            } else {
              return EMPTY;
            }
          }),
          catchError((error: any) => {
            if (error.status == 401) {
              return of(loginError({ message: "Invalid credentials" }));
            } else {
              return of(loginError({ message: "Something went wrong" })) ;
            }
          })
        );
      })
    )
  }
);


}