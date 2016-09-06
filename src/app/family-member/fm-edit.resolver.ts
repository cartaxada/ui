import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DynamoService } from '../service/dynamo.service';
import { FamilyMember } from './fm.model';

@Injectable()
export class FamilyMemberToEditResolver implements Resolve<FamilyMember> {

  constructor(private dynamoService: DynamoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<FamilyMember> {
    const familyId = route.params['familyId'];
    return this.dynamoService.familyMember(familyId);
  }
}
