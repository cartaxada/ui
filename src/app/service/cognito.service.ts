import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

@Injectable()
export class CognitoService {

  isLoggedIn(): Promise<boolean> {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(Configuration.poolData);
    const cognitoUser = userPool.getCurrentUser();

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

}
