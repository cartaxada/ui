import { Component, OnInit } from '@angular/core';
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
