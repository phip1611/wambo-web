import { Component, effect, inject } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';
import { MonoComponent } from '../mono/mono.component';

@Component({
    selector: 'app-numeral-systems-output-group',
    templateUrl: './numeral-systems-output-group.component.html',
    imports: [MonoComponent]
})
export class NumeralSystemsOutputGroupComponent {

  parsed: ParseResult | null = null;
  output = {
    bin: '',
    oct: '',
    dec: '',
    hex: '',
  };

  private readonly service = inject(ParsedInputService);

  private readonly syncOutput = effect(() => {
      const pr = this.service.input();
      if (!!pr) {
        this.parsed = pr;
        this.output.bin = this.parsed.signedNumericValue.toString(2);
        this.output.oct = this.parsed.signedNumericValue.toString(8);
        this.output.dec = this.parsed.signedNumericValue.toString(10);
        this.output.hex = this.parsed.signedNumericValue.toString(16);
      } else {
        this.parsed = null;
      }
  });
}
