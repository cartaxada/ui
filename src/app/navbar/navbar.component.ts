import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.template.html')
})
export class NavBarComponent {

  constructor(private cognitoService: CognitoService, private router: Router) {}

  logout() {
    this.cognitoService.logOut();
    this.router.navigate(['/login']);
  }

}
