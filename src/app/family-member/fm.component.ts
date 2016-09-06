import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from './fm.model';
import { Configuration } from '../app.configuration';

@Component({
  template: require('./fm.template.html'),
  styles: [require('./fm.style.css')]
})
export class FamilyMemberViewComponent implements OnInit {

  familyMembers: FamilyMember[];
  pictureBucket: string = Configuration.pictureBucket;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.forEach((data: { familyMembersResult: FamilyMember[] }) => {
      this.familyMembers = data.familyMembersResult;
    });
  }

}
