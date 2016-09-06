import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NameSearchComponent } from './name-search.component';

import { searchRouting } from './search.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    searchRouting
  ],
  declarations: [
    NameSearchComponent
  ]
})
export class SearchModule {}
