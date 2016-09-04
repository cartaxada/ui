import { Component } from '@angular/core';
import { Configuration } from '../app.configuration';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Component({
  template: require('./login.template.html'),
  styles: [require('./login.style.css')]
})
export class LoginComponent {
  username: string;
  password: string;

  login() {
    var authenticationData = {
      Username : this.username,
      Password : this.password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    var userData = { Username : this.username, Pool : userPool };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
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
