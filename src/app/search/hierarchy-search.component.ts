import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FamilyMember } from '../family-member/fm.model';
import { DynamoService } from '../service/dynamo.service';
import { Configuration } from '../app.configuration';

@Component({
  template: require('./hierarchy-search.template.html'),
  styles: [require('./hierarchy-search.style.css')]
})
export class InitialHierarchySearchComponent implements OnInit {

  pictureBucket: string = Configuration.pictureBucket;
  breadcrumbs: FamilyMember[] = [];
  children: FamilyMember[] = [];

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
}

@Component({
  template: require('./hierarchy-search.template.html'),
  styles: [require('./hierarchy-search.style.css')]
})
export class HierarchySearchComponent implements OnInit, OnDestroy {

  pictureBucket: string = Configuration.pictureBucket;
  breadcrumbs: FamilyMember[] = [];
  children: FamilyMember[] = [];

  sub: Subscription;

  constructor(private route: ActivatedRoute, private dynamoService: DynamoService) {  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const familyMemberId = params['familyId'];
      const nextLevel = familyMemberId.split('-').length + 1;

      this.dynamoService.membersInHierarchy(nextLevel, familyMemberId.replace(':1', ''))
          .then((res) => {
            this.children = res.sort((a, b) => {
                return a.familyId.localeCompare(b.familyId);
            });
          }).catch((err) => {
            console.log(JSON.stringify(err));
          });

      this.dynamoService.familyMemberById(this.calculateBreadcrumbIds(familyMemberId))
          .then((res) => {
            this.breadcrumbs = res.sort((a, b) => {
              return a.familyId.length - b.familyId.length;
            });
          }).catch((err) => {
            console.log(err);
          });

    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private calculateBreadcrumbIds(currentFamilyMember: string): string[] {
    const fmId = currentFamilyMember.split(':')[0];

    let breadcrumbIds: string[] = [];
    for (let i = 2; i < fmId.length; i += 3) {
      breadcrumbIds.push(fmId.slice(0, i));
    }

    breadcrumbIds.push(currentFamilyMember.replace(':1', ''));
    return breadcrumbIds;
  }

}
