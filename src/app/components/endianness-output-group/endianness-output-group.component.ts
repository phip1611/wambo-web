import { Component, computed, inject } from '@angular/core';
import {
  bignumberWholePartToUnsignedBitStringOfLength,
  BitLength,
} from '../../service/bit.util';
import { Endianness, getSystemEndianness } from '../../service/endianness.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { back_substr } from '../../service/string.util';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-endianness-output-group',
  templateUrl: './endianness-output-group.component.html',
  imports: [MonoComponent],
})
export class EndiannessOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    const u32Bits = bignumberWholePartToUnsignedBitStringOfLength(
      parsed.unsignedWholePart,
      BitLength.B32,
    );
    return {
      systemEndianness: Endianness[getSystemEndianness()],
      u32Bits,
      byteLE0: '0b' + back_substr(u32Bits, u32Bits.length, 8),
      byteLE1: '0b' + back_substr(u32Bits, u32Bits.length - 8, 8),
      byteLE2: '0b' + back_substr(u32Bits, u32Bits.length - 16, 8),
      byteLE3: '0b' + back_substr(u32Bits, u32Bits.length - 24, 8),
    };
  });
}
