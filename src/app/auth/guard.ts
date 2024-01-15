import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { selectIsAuth } from "../store/user.selectors";

@Injectable({ providedIn: 'root' })
export class IsAuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // const isAuth = this.store.select(selectIsAuth).subscribe(isAuth => {
        //     return isAuth;
        // });
        // if (isAuth) {
        //     return true;
        // }
        // else {

        //     return this.router.parseUrl('/sign-in');
        // }
        return this.store.select(selectIsAuth).pipe(
            map(isAuth => {
                if (isAuth) {
                    return true;
                } else {
                    return this.router.parseUrl('/sign-in');
                }
            })
        );
    }
}
