import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { loginRouting } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    loginRouting
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ]
})
export class LoginModule {}
