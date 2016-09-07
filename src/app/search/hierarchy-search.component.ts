import { Component, OnInit } from '@angular/core';
import { FamilyMember } from '../family-member/fm.model';
import { DynamoService } from '../service/dynamo.service';
import { Configuration } from '../app.configuration';

@Component({
  template: require('./hierarchy-search.template.html'),
  styles: [require('./hierarchy-search.style.css')]
})
export class HierarchySearchComponent implements OnInit {

  pictureBucket: string = Configuration.pictureBucket;
  breadcrumbs: FamilyMember[] = [];
  children: FamilyMember[] = [];

  currentLevel: number = 1;

  constructor(private dynamoService: DynamoService) {  }

  ngOnInit() {
    this.dynamoService.initialHierarchy()
      .then((res) => {
        this.children = res.sort((a, b) => {
          return a.familyId.localeCompare(b.familyId);
        });
      }).catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  chosenFM(selectedFamilyMember: FamilyMember) {
    this.breadcrumbs.push(selectedFamilyMember);
    this.currentLevel += 1;
    this.dynamoService.membersInHierarchy(this.currentLevel, selectedFamilyMember.familyId.replace(':1', ''))
      .then((res) => {
        this.children = res.sort((a, b) => {
            return a.familyId.localeCompare(b.familyId);
        });
      }).catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

}
