import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from './fm.model';
import { Configuration } from '../app.configuration';

@Component({
  template: require('./fm-edit.template.html')
})
export class FamilyMemberEditComponent implements OnInit {

  familyMember: FamilyMember;
  pictureBucket: string = Configuration.pictureBucket;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.forEach((data: { familyMemberResult: FamilyMember }) => {
      this.familyMember = data.familyMemberResult;
    });
  }

}
