import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CognitoService, CognitoCallback } from '../service/cognito.service';

@Component({
  template: require('./confirm-user.template.html'),
  styles: [require('./auth.style.css')]
})
export class ConfirmUserComponent implements OnInit, CognitoCallback {

  username: string;
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

  confirmUser() {
    this.errMessage = '';
    this.successful = false;
    if (this.username && this.verificationCode) {
      this.cognitoService.confirmUser(this.username, this.verificationCode, this);
    }
  }

  cognitoCallback(err: any, result: any) {
    if (err !== null) {
      if (err.code === 'CodeMismatchException') {
        this.errMessage = 'Código Inválido';
      } else {
        this.errMessage = 'Algo estranho aconteceu :(';
      }
      console.log(JSON.stringify(err));
    } else {
      this.successful = true;
    }
  }


}
