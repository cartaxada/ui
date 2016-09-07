import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureAppComponent } from '../app.component';
import { AuthGuard } from '../service/auth-guard.service';

import { GeneratePDFComponent } from './pdf.component';

const pdfRoutes: Routes = [
  {
    path: 'generate-contacts-pdf',
    component: SecureAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GeneratePDFComponent
      }
    ]
  }
];

export const pdfRouting: ModuleWithProviders = RouterModule.forChild(pdfRoutes);
