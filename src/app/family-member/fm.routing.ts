import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyMemberListComponent } from './fm-list.component';
import { SecureAppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';

const familyMemberRoutes: Routes = [
  {
    path: 'family-member',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: FamilyMemberListComponent }
    ]
  }
];

export const familyMemberRouting: ModuleWithProviders = RouterModule.forChild(familyMemberRoutes);
