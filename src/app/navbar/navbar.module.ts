import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavBarComponent
  ],
  declarations: [
    NavBarComponent
  ]
})
export class NavBarModule {}
