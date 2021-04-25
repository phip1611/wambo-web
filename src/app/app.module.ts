import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { Base1024UnitsOutputGroupComponent } from './components/base1024-units-output-group/base1024-units-output-group.component';
import { EndiannessOutputGroupComponent } from './components/endianness-output-group/endianness-output-group.component';
import { MonoComponent } from './components/mono/mono.component';
import { NumberInputComponent } from './components/numberinput/number-input.component';
import { NumeralSystemsOutputGroupComponent } from './components/numeral-systems-output-group/numeral-systems-output-group.component';
import { OutputGroupIeee754Component } from './components/output-group-ieee754/output-group-ieee754.component';
import { SignedIntegersOutputGroupComponent } from './components/signed-integers-output-group/signed-integers-output-group.component';
import { SiteInfoComponent } from './components/site-info/site-info.component';
import { UnitsOutputGroupComponent } from './components/units-output-group/units-output-group.component';
import { UnsignedIntegersOutputGroupComponent } from './components/unsigned-integers-output-group/unsigned-integers-output-group.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberInputComponent,
    NumeralSystemsOutputGroupComponent,
    UnitsOutputGroupComponent,
    Base1024UnitsOutputGroupComponent,
    MonoComponent,
    SignedIntegersOutputGroupComponent,
    UnsignedIntegersOutputGroupComponent,
    SiteInfoComponent,
    OutputGroupIeee754Component,
    EndiannessOutputGroupComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
