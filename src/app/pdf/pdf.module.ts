import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GeneratePDFComponent } from './pdf.component';

import { pdfRouting } from './pdf.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    pdfRouting
  ],
  declarations: [
    GeneratePDFComponent
  ]
})
export class PDFModule {}
