import { Component } from '@angular/core';
import { FamilyMember } from '../family-member/fm.model';
import { DynamoService } from '../service/dynamo.service';
import { Configuration } from '../app.configuration';

@Component({
  template: require('./name-search.template.html')
})
export class NameSearchComponent {

  pictureBucket: string = Configuration.pictureBucket;
  searchQuery: string;
  searchResult: FamilyMember[];

  searching: boolean = false;
  noResultMessage: boolean = false;

  constructor(private dynamoService: DynamoService) {}

  search() {
    if (this.searchQuery && this.searchQuery.trim()) {
      this.searching = true;
      this.noResultMessage = false;
      this.dynamoService.searchByName(this.searchQuery.trim())
          .then((res) => {
            this.searching = false;
            this.searchResult = res;
            if (this.searchResult.length === 0) {
              this.noResultMessage = true;
            }
          }).catch((err) => {
            this.searching = false;
            console.log(JSON.stringify(err));
          });
    }
  }

}
