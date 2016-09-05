import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureAppComponent } from './app.component';
import { HomeComponent } from './constant/constant.component';
import { AuthGuard } from './service/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/secure',
    pathMatch: 'full'
  },
  {
    path: 'secure',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent }
    ]
  }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
