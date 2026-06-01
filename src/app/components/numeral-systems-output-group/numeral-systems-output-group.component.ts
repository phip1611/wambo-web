import { Component, computed, inject } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-numeral-systems-output-group',
  templateUrl: './numeral-systems-output-group.component.html',
  imports: [MonoComponent],
})
export class NumeralSystemsOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    return {
      bin: parsed.signedNumericValue.toString(2),
      oct: parsed.signedNumericValue.toString(8),
      dec: parsed.signedNumericValue.toString(10),
      hex: parsed.signedNumericValue.toString(16),
    };
  });
}
