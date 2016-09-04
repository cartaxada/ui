import { Component } from '@angular/core';
import { Configuration } from '../app.configuration';

const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Component({
  template: require('./login.template.html'),
  styles: [require('./login.style.css')]
})
export class LoginComponent {
  username: string;
  password: string;

  login() {
    const authenticationData = {
      Username : this.username,
      Password : this.password,
    };

    AWS.config.region = 'us-east-1';

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    const userData = { Username : this.username, Pool : userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: any) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },

      onFailure: function (err: any) {
        alert(err);
      },
    });
  }

}
