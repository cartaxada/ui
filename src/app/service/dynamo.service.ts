import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';
import { FamilyMember } from '../family-member/fm.model';
import { CognitoService } from './cognito.service';

const AWS = require('aws-sdk');

@Injectable()
export class DynamoService {

  constructor(private cognitoService: CognitoService) {}

  familyMember(familyId: string): Promise<FamilyMember> {
    this.cognitoService.refresh();
    const params = {
      TableName : Configuration.dynamoDbTable,
      Key: { familyId: familyId }
    };

    return new Promise((resolve, reject) => {
      const docClient = new AWS.DynamoDB.DocumentClient();
      docClient.get(params, function(err: any, data: any) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data.Item);
        }
      });
    });
  }

  updateFamilyMember(familyMember: FamilyMember): Promise<FamilyMember> {
    this.cognitoService.refresh();
    const params = {
      TableName : Configuration.dynamoDbTable,
      Item: familyMember
    };

    return new Promise((resolve, reject) => {
      const docClient = new AWS.DynamoDB.DocumentClient();
      docClient.put(params, function(err: any, data: any) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data.Item);
        }
      });
    });
  }

  familyMemberView(familyId: string): Promise<FamilyMember[]> {
    this.cognitoService.refresh();
    let familyIdParameter = familyId;
    if (!familyIdParameter.includes(':')) {
      familyIdParameter += ':';
    }
    const params = {
      TableName: Configuration.dynamoDbTable,
      FilterExpression: 'begins_with(familyId, :user)',
      ExpressionAttributeValues: { ':user': familyIdParameter }
    };

    return new Promise((resolve, reject) => {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.scan(params, function(err: any, data: any) {
        if (err) {
          console.log(err);
          resolve([]);
        } else {
          resolve(data.Items);
        }
      });
    });
  }

  searchByName(searchQuery: string): Promise<FamilyMember[]> {
    this.cognitoService.refresh();
    const params = {
      TableName: Configuration.dynamoDbTable,
      ProjectionExpression: 'familyId, #name',
      FilterExpression: 'contains(#name, :query) OR contains(nicknames, :query)',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':query': searchQuery }
    };

    return new Promise((resolve, reject) => {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.scan(params, function(err: any, data: any) {
        if (err) {
          console.log(err);
          resolve([]);
        } else {
          resolve(data.Items);
        }
      });
    });
  }

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
