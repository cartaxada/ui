import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureAppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';
import { NameSearchComponent } from './name-search.component';

const searchRoutes: Routes = [
  {
    path: 'search',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'name',
        component: NameSearchComponent
      }
    ]
  }
];

export const searchRouting: ModuleWithProviders = RouterModule.forChild(searchRoutes);
