import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ConfirmUserComponent } from './confirm-user.component';
import { ResetPasswordComponent } from './reset-password.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:username', component: ResetPasswordComponent },
  { path: 'confirm-user/:username', component: ConfirmUserComponent }
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);
