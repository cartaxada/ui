import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureAppComponent, LogOutComponent, NotFoundComponent } from './app.component';
import { HomeComponent } from './constant/constant.component';
import { AuthGuard } from './service/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'logout', component: LogOutComponent },
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
