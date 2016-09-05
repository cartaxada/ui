import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyMemberListComponent } from './fm-list.component';
import { SecureAppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';
import { FamilyListResolver } from './fm-list.resolver';

const familyMemberRoutes: Routes = [
  {
    path: 'family-member',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FamilyMemberListComponent,
        resolve: {
          familyMembersResult: FamilyListResolver
        }
      }
    ]
  }
];

export const familyMemberRouting: ModuleWithProviders = RouterModule.forChild(familyMemberRoutes);
