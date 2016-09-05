import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';

const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwtDecode = require('jwt-decode');

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
