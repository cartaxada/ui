import { Component } from '@angular/core';
import { FamilyMember } from '../family-member/fm.model';
import { DynamoService } from '../service/dynamo.service';

@Component({
  template: require('./name-search.template.html')
})
export class NameSearchComponent {
  searchQuery: string;
  searchResult: FamilyMember[];

  constructor(private dynamoService: DynamoService) {}

  search() {
    this.dynamoService.searchByName(this.searchQuery)
        .then((res) => {
          this.searchResult = res;
        }).catch((err) => {
          console.log(JSON.stringify(err));
        });
  }

}
