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

  newNickname: string;
  newPhone = { ddd: '', number: '', operator: '' };

  constructor(private route: ActivatedRoute, private s3Service: S3Service) { }

  ngOnInit() {
    this.route.data.forEach((data: { familyMemberResult: FamilyMember }) => {
      this.familyMember = data.familyMemberResult;
      if (!this.familyMember.address) {
        this.familyMember.address = {};
      }
      if (!this.familyMember.nicknames) {
        this.familyMember.nicknames = [];
      }
      if (!this.familyMember.phones) {
        this.familyMember.phones = [];
      }
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

  nickName() {
    this.familyMember.nicknames.push(this.newNickname);
    this.newNickname = '';
  }

  phone() {
    this.familyMember.phones.push(this.newPhone);
    this.newPhone = { ddd: '', number: '', operator: '' };
  }

  noPhone(phone: number) {
    this.familyMember.phones.splice(phone, 1);
  }

  noNickName(nickname: number) {
    this.familyMember.nicknames.splice(nickname, 1);
  }

  saveEdit() {
    console.log(JSON.stringify(this.familyMember));
  }

}
