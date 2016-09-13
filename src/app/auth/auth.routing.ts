import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:username', component: ResetPasswordComponent }
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);
