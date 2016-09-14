import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyMemberListComponent } from './fm-list.component';
import { SecureAppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';
import { FamilyMemberResolver } from './fm.resolver';
import { FamilyMemberToEditResolver } from './fm-edit.resolver';
import { FamilyMemberViewComponent } from './fm.component';
import { FamilyMemberEditComponent } from './fm-edit.component';

const familyMemberRoutes: Routes = [
  {
    path: 'family-member',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FamilyMemberListComponent
      },
      {
        path: ':familyId/edit',
        component: FamilyMemberEditComponent,
        resolve: { familyMemberResult: FamilyMemberToEditResolver }
      },
      {
        path: ':familyId',
        component: FamilyMemberViewComponent,
        resolve: { familyMembersResult: FamilyMemberResolver }
      }
    ]
  }
];

export const familyMemberRouting: ModuleWithProviders = RouterModule.forChild(familyMemberRoutes);
