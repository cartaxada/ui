import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DynamoService } from '../service/dynamo.service';
import { FamilyMember } from './fm.model';

@Injectable()
export class FamilyListResolver implements Resolve<FamilyMember[]> {

  constructor(private dynamoService: DynamoService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<FamilyMember[]> {
    return this.dynamoService.familyMemberList();
  }
}
