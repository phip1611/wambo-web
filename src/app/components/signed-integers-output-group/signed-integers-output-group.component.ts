import { Component, computed, inject } from '@angular/core';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from '../../service/bit.util';
import { toSInt16, toSInt32, toSInt64, toSInt8 } from '../../service/int-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { MonoComponent } from '../mono/mono.component';

@Component({
    selector: 'app-signed-integers-output-group',
    templateUrl: './signed-integers-output-group.component.html',
    imports: [MonoComponent]
})
export class SignedIntegersOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
      const parsed = this.parsed();
      if (!parsed) {
        return null;
      }
      return {
        i8: toSInt8(parsed.unsignedWholePart).toString(),
        i16: toSInt16(parsed.unsignedWholePart).toString(),
        i32: toSInt32(parsed.unsignedWholePart).toString(),
        i64: toSInt64(parsed.unsignedWholePart).toString(),
        bits: bignumberWholePartToUnsignedBitStringOfLength(parsed.unsignedWholePart, BitLength.B64),
      };
  });
}
