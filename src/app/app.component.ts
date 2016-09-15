import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './service/cognito.service';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: require('./app.component.html')
})
export class AppComponent { }

@Component({
  template: require('./secureapp.component.html')
})
export class SecureAppComponent implements OnInit {

  constructor(private cognitoService: CognitoService) {}

  ngOnInit() {
    this.cognitoService.refresh();
  }

}

@Component({
  template: require('./not-found.component.html')
})
export class NotFoundComponent {

}

@Component({
  template: ''
})
export class LogOutComponent {

  constructor(private cognitoService: CognitoService, private router: Router) {
    this.cognitoService.logOut();
    this.router.navigate(['/login']);
  }

}
