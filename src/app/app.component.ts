import { Component, computed, inject } from '@angular/core';
import { ParsedInputService } from './service/parsed-input.service';
import { NumberInputComponent } from './components/numberinput/number-input.component';
import { NumeralSystemsOutputGroupComponent } from './components/numeral-systems-output-group/numeral-systems-output-group.component';
import { UnitsOutputGroupComponent } from './components/units-output-group/units-output-group.component';
import { Base1024UnitsOutputGroupComponent } from './components/base1024-units-output-group/base1024-units-output-group.component';
import { SignedIntegersOutputGroupComponent } from './components/signed-integers-output-group/signed-integers-output-group.component';
import { UnsignedIntegersOutputGroupComponent } from './components/unsigned-integers-output-group/unsigned-integers-output-group.component';
import { OutputGroupIeee754Component } from './components/output-group-ieee754/output-group-ieee754.component';
import { EndiannessOutputGroupComponent } from './components/endianness-output-group/endianness-output-group.component';
import { SiteInfoComponent } from './components/site-info/site-info.component';

/**
 * The app component is responsible for disabling "information card" components in some conditions.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NumberInputComponent,
    NumeralSystemsOutputGroupComponent,
    UnitsOutputGroupComponent,
    Base1024UnitsOutputGroupComponent,
    SignedIntegersOutputGroupComponent,
    UnsignedIntegersOutputGroupComponent,
    OutputGroupIeee754Component,
    EndiannessOutputGroupComponent,
    SiteInfoComponent,
  ],
})
export class AppComponent {
  private readonly service = inject(ParsedInputService);
  readonly hasData = computed(() => this.service.input() !== null);
  readonly isFraction = computed(() => {
    const val = this.service.input();
    return !!val?.unsignedFractionPart;
  });
}
