import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';
import { FamilyMember } from '../family-member/fm.model';
import { CognitoService } from './cognito.service';

const AWS = require('aws-sdk');

@Injectable()
export class DynamoService {

  constructor(private  cognitoService: CognitoService) {}

  familyMemberList(): Promise<FamilyMember[]> {
    return this.cognitoService.getCurrentUserName()
          .then((res) => {
            const params = {
              TableName: Configuration.dynamoDbTable,
              ProjectionExpression: 'familyId, #name',
              FilterExpression: 'begins_with(familyId, :user)',
              ExpressionAttributeNames: { '#name': 'name' },
              ExpressionAttributeValues: { ':user': res }
            };
            return new Promise((resolve, reject) => {
              const dynamodb = new AWS.DynamoDB.DocumentClient();
              dynamodb.scan(params, function(err: any, data: any) {
                if (err) {
                  console.log(err);
                  resolve([]);
                }
                resolve(data.Items);
              });
            });
          }).catch((err) => {
            console.log(err);
            return [];
          });
  }

}
