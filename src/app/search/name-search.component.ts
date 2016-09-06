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

  constructor(private dynamoService: DynamoService) {}

  search() {
    if (this.searchQuery && this.searchQuery.trim()) {
      this.dynamoService.searchByName(this.searchQuery.trim())
          .then((res) => {
            this.searchResult = res;
          }).catch((err) => {
            console.log(JSON.stringify(err));
          });
    }
}

}
