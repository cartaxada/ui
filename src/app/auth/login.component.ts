import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '../app.configuration';

const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Component({
  template: require('./login.template.html'),
  styles: [require('./auth.style.css')]
})
export class LoginComponent {
  username: string;
  password: string;

  message: string;

  executing: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      return;
    }
    this.executing = true;
    const authenticationData = {
      Username : this.username,
      Password : this.password,
    };

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    const userData = { Username : this.username, Pool : userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, this);
  }

  // tslint:disable
  private onSuccess(result: any) {
    this.executing = false;
    const loginsHash = {};
    loginsHash[Configuration.identityLoginKey] = result.getIdToken().getJwtToken();

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId : Configuration.identityPoolId,
        Logins : loginsHash
    });
    this.router.navigate(['/home']);
  }

  private onFailure(err: any) {
    this.executing = false;
    if (err.code === 'UserNotFoundException') {
      this.message = 'Usuário não existe';
    } else if (err.code === 'NotAuthorizedException') {
      this.message = 'Combinação usuário e senha invalida';
    } else {
      this.message = 'Algo estranho aconteceu :(';
    }
  }
  // tslint:enable

}
