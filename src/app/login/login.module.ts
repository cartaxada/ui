import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { loginRouting } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    loginRouting
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
