import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoService } from './cognito.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private cognitoService: CognitoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.cognitoService.isLoggedIn()
            .then((res) => {
              if (!res) { this.router.navigate(['/login']); }
              return res;
            }).catch((err) => {
              console.log(err);
              return false;
            });
  }
}
