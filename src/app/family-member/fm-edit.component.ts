import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from './fm.model';
import { Configuration } from '../app.configuration';
import { S3Service } from '../service/s3.service';

@Component({
  template: require('./fm-edit.template.html')
})
export class FamilyMemberEditComponent implements OnInit {

  familyMember: FamilyMember;
  pictureBucket: string = Configuration.pictureBucket;
  pictureToUpload: any;
  uploading: boolean = false;

  constructor(private route: ActivatedRoute, private s3Service: S3Service) { }

  ngOnInit() {
    this.route.data.forEach((data: { familyMemberResult: FamilyMember }) => {
      this.familyMember = data.familyMemberResult;
    });
  }

  submitPic() {
    if (this.pictureToUpload) {
      const fileType = this.pictureToUpload.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.uploading = true;
        this.s3Service.uploadImage(this.pictureToUpload, this.familyMember.familyId)
          .then((res) => {
            this.uploading = false;
          }).catch((err) => {
            this.uploading = false;
          });
      }
    }
  }

  fileChangeEvent(fileInput: any) {
    this.pictureToUpload = fileInput.target.files[0];
  }

}
