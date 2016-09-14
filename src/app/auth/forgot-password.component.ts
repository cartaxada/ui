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
    if (this.username && this.username.trim()) {
      this.cognitoService.forgotPassword(this.username.trim(), this);
    }
  }

  cognitoCallback(err: any, result: any) {
    if (err !== null) {
      if (err.code === 'UserNotFoundException') {
        this.errMessage = 'Usuário não existe';
      } else {
        this.errMessage = 'Algo estranho aconteceu :(';
      }
    } else {
      this.successful = true;
    }
  }

}
