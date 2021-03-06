import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavBarComponent
  ],
  declarations: [
    NavBarComponent
  ]
})
export class NavBarModule {}
