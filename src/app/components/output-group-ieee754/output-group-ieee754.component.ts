import { Component, computed, inject } from '@angular/core';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from '../../service/bit.util';
import {
  bigNumberWholePartBitsToF32Value,
  bigNumberWholePartBitsToF64Value,
} from '../../service/ieee754-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-output-group-ieee754',
  templateUrl: './output-group-ieee754.component.html',
  imports: [MonoComponent],
})
export class OutputGroupIeee754Component {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    return {
      f32: bigNumberWholePartBitsToF32Value(parsed.unsignedWholePart).toString(),
      // this is a double. Javascript uses a double for all numbers.
      f64: bigNumberWholePartBitsToF64Value(parsed.unsignedWholePart).toString(),
      bits: bignumberWholePartToUnsignedBitStringOfLength(parsed.unsignedWholePart, BitLength.B64),
    };
  });
}
