import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FamilyMemberListComponent } from './fm-list.component';
import { familyMemberRouting } from './fm.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    familyMemberRouting
  ],
  declarations: [
    FamilyMemberListComponent
  ]
})
export class FamilyMemberModule {}
