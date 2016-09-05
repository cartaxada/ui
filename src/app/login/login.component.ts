import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '../app.configuration';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Component({
  template: require('./login.template.html'),
  styles: [require('./login.style.css')]
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private router: Router) {}

  login() {
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

  private onSuccess(result: any) {
    console.log('access token + ' + result.getAccessToken().getJwtToken());
    this.router.navigate(['/secure']);
  }

  private onFailure(err: any) {
    alert(err);
  }

}
