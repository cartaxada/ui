import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';

const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwtDecode = require('jwt-decode');

export interface CognitoCallback {
  cognitoCallback(err: any, result: any): void;
}

@Injectable()
export class CognitoService {

  logOut() {
    const cognitoUser = this.getCurrentUser();
    cognitoUser.signOut();
  }

  isLoggedIn(): Promise<boolean> {
    const cognitoUser = this.getCurrentUser();

    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession(function(err: any, session: any) {
          if (err) { reject(err); }
          resolve(session.isValid());
        });
      } else {
        resolve(false);
      }
    });
  }

  refresh() {
    AWS.config.region = 'us-east-1';

    const cognitoUser = this.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err: any, session: any) {
        if (err) {
          alert(err);
          return;
        }
        if (session.isValid()) {
          const loginsHash = {};
          loginsHash[Configuration.identityLoginKey] = session.getIdToken().getJwtToken();

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId : Configuration.identityPoolId,
              Logins : loginsHash
          });
        } else {
          this.logOut();
        }
      });
    }

  }

  forgotPassword(username: string, callback: CognitoCallback) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result: any) {
        callback.cognitoCallback(null, result);
      },
      onFailure: function (err: any) {
        callback.cognitoCallback(err, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  resetPassword(username: string, verificationCode: string, password: string, callback: CognitoCallback) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (result: any) {
        callback.cognitoCallback(null, result);
      },
      onFailure: function (err: any) {
        callback.cognitoCallback(err, null);
      }
    });
  }

  getCurrentUserName(): Promise<string> {
    const cognitoUser = this.getCurrentUser();

    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession(function(err: any, session: any) {
          if (err) { reject(err); }
          const decoded = jwtDecode(session.getIdToken().getJwtToken());
          resolve(decoded['cognito:username']);
        });
      } else {
        reject('NO_USER');
      }
    });
  }

  private getCurrentUser() {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    return userPool.getCurrentUser();
  }

}
