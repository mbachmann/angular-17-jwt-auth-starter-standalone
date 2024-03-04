import {CanActivateFn, Router} from '@angular/router';

import {inject, Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth.service";


@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let redirectTo: string = "";
    const allowedRoles = next.data['roles'] as Array<string>;
    if (next.routeConfig && next.routeConfig.path) {
        redirectTo = next.routeConfig.path;
    }

    if (this.authService.hasAnyRole(allowedRoles)) {
      return true;
    } else {
      console.log("no access rights, need role " + allowedRoles)
      if (this.authService.isLoggedIn()) {
        this.router.navigate(["/", "401"], {queryParams: { redirect: redirectTo }});
      } else {
        this.router.navigate(["/", "login"], {queryParams: { redirect: redirectTo }});
      }

      // Redirect or handle unauthorized access
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return <boolean>inject(PermissionsService).canActivate(next, state);
}
