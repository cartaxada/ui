import { Component, OnInit } from '@angular/core';
import { FamilyMember } from './fm.model';
import { DynamoService } from '../service/dynamo.service';

@Component({
  template: require('./fm-list.template.html')
})
export class FamilyMemberListComponent implements OnInit {

  familyMembers: FamilyMember[];
  searching: boolean = false;

  constructor(private dynamoService: DynamoService) {  }

  ngOnInit() {
    this.searching = true;
    this.dynamoService.familyMemberList()
        .then((res: FamilyMember[]) => {
          this.searching = false;
          this.familyMembers = res;
        }).catch((err: any) => {
          this.searching = false;
          console.log(JSON.stringify(err));
        });
  }

}
