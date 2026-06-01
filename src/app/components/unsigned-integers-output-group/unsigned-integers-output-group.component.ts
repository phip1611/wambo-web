import { Component, computed, inject } from '@angular/core';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from '../../service/bit.util';
import { toUInt16, toUInt32, toUInt64, toUInt8 } from '../../service/int-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-unsigned-integers-output-group',
  templateUrl: './unsigned-integers-output-group.component.html',
  imports: [MonoComponent],
})
export class UnsignedIntegersOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    return {
      u8: toUInt8(parsed.unsignedWholePart).toString(),
      u16: toUInt16(parsed.unsignedWholePart).toString(),
      u32: toUInt32(parsed.unsignedWholePart).toString(),
      u64: toUInt64(parsed.unsignedWholePart).toString(),
      bits: bignumberWholePartToUnsignedBitStringOfLength(parsed.unsignedWholePart, BitLength.B64),
    };
  });
}
