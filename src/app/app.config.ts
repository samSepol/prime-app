import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ButtonModule,
      DialogModule,
      DynamicDialogModule
    )
  ]
};
