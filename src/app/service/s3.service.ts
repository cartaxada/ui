import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';
import { CognitoService } from './cognito.service';

const AWS = require('aws-sdk');

@Injectable()
export class S3Service {

  constructor(private cognitoService: CognitoService) {}

  uploadImage(file: File, fileName: string): Promise<boolean> {
    this.cognitoService.refresh();

    return new Promise((resolve, reject) => {
      const params = {Key: fileName, ContentType: file.type, Body: file};

      const bucketName = Configuration.pictureBucket + '-original';
      const bucket = new AWS.S3({params: {Bucket: bucketName }});

      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      });

    });

  }

}
