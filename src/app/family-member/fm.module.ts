import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FamilyMemberListComponent } from './fm-list.component';
import { FamilyMemberViewComponent } from './fm.component';
import { familyMemberRouting } from './fm.routing';
import { FamilyMemberResolver } from './fm.resolver.ts';
import { FamilyMemberToEditResolver } from './fm-edit.resolver';
import { FamilyMemberEditComponent } from './fm-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    familyMemberRouting
  ],
  declarations: [
    FamilyMemberListComponent,
    FamilyMemberViewComponent,
    FamilyMemberEditComponent
  ],
  providers: [
    FamilyMemberResolver,
    FamilyMemberToEditResolver
  ]
})
export class FamilyMemberModule {}
