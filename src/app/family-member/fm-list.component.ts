import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from './fm.model';

@Component({
  template: require('./fm-list.template.html')
})
export class FamilyMemberListComponent implements OnInit {

  familyMembers: FamilyMember[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.forEach((data: { familyMembersResult: FamilyMember[] }) => {
      this.familyMembers = data.familyMembersResult;
    });
  }

}
