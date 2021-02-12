import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.auth.navigateAfterLogin();
      return false;
    }
    return true;
  }
}