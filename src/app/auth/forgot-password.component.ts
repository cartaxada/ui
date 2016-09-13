import { Component } from '@angular/core';
import { CognitoService, CognitoCallback } from '../service/cognito.service';

@Component({
  template: require('./forgot-password.template.html'),
  styles: [require('./auth.style.css')]
})
export class ForgotPasswordComponent implements CognitoCallback {

  username: string;
  errMessage: string;
  successful: boolean = false;

  constructor(private cognitoService: CognitoService) {}

  sendCode() {
    this.errMessage = '';
    this.successful = false;
    if (this.username) {
      this.cognitoService.forgotPassword(this.username, this);
    }
  }

  cognitoCallback(err: any, result: any) {
    if (err !== null) {
      this.errMessage = err.message;
    } else {
      this.successful = true;
    }
  }

}
