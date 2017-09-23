import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import {RubdetailComponent} from "./rubs/rubdetail/rubdetail.component";

@Injectable()
export class AuthGuard implements CanActivate, CanDeactivate<RubdetailComponent> {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggedIn()) {
      console.log("User is logged in");
      return true;
    } else {
      console.log("User is not logged in, navigate to login mask");
      this.router.navigate(['/login']);
      return false;
    }

  }

  canDeactivate(component: RubdetailComponent) {
    return component.areFormsSaved();
  }
}
