import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from './fm.model';
import { Configuration } from '../app.configuration';
import { DynamoService } from '../service/dynamo.service';

@Component({
  template: require('./fm.template.html'),
  styles: [require('./fm.style.css')]
})
export class FamilyMemberViewComponent implements OnInit {

  breadcrumbs: FamilyMember[];
  familyMembers: FamilyMember[];
  pictureBucket: string = Configuration.pictureBucket;

  constructor(private route: ActivatedRoute, private dynamoService: DynamoService) { }

  ngOnInit() {
    this.route.data.forEach((data: { familyMembersResult: FamilyMember[] }) => {
      this.familyMembers = data.familyMembersResult.sort((a, b) => {
        return a.familyId.localeCompare(b.familyId);
      });
      const breadcrumbIds = this.calculateBreadcrumbIds();
      if (breadcrumbIds.length === 0) {
        this.breadcrumbs = [];
      } else {
        this.dynamoService.familyMemberById(breadcrumbIds)
            .then((res) => {
              this.breadcrumbs = res.sort((a, b) => {
                return a.familyId.length - b.familyId.length;
              });
            }).catch((err) => {
              console.log(err);
            });
      }
    });
  }

  private calculateBreadcrumbIds(): string[] {
    const currentFamilyMember = this.familyMembers.find((fm) => fm.familyId.includes(':1')).familyId;
    const fmId = currentFamilyMember.split(':')[0];

    let breadcrumbIds: string[] = [];
    for (let i = 2; i < fmId.length; i += 3) {
      breadcrumbIds.push(fmId.slice(0, i));
    }

    return breadcrumbIds;
  }

}
