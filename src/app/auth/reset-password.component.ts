import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoCallback } from '../service/cognito.service';

@Component({
  template: require('./reset-password.template.html'),
  styles: [require('./auth.style.css')]
})
export class ResetPasswordComponent implements OnInit, CognitoCallback {

  username: string;
  newPassword: string;
  verificationCode: string;

  errMessage: string;
  successful: boolean;

  constructor(private cognitoService: CognitoService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
    this.errMessage = null;
    this.successful = false;
  }

  resetPassword() {
    this.errMessage = '';
    this.successful = false;
    if (this.username && this.verificationCode && this.newPassword) {
      this.cognitoService.resetPassword(this.username, this.verificationCode, this.newPassword, this);
    }
  }

  cognitoCallback(err: any, result: any) {
    if (err !== null) {
      if (err.code === 'ExpiredCodeException') {
        this.errMessage = 'Código Inválido';
      } else if (err.code === 'InvalidParameterException') {
        this.errMessage = 'Senha deve ter no minimo 8 caracteres';
      } else {
        this.errMessage = 'Algo estranho aconteceu :(';
      }
    } else {
      this.successful = true;
    }
  }


}
