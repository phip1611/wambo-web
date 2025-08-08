import { Component, OnInit } from '@angular/core';
import {
  bignumberWholePartToUnsignedBitStringOfLength,
  BitLength,
} from '../../service/bit.util';
import { Endianness, getSystemEndianness } from '../../service/endianness.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';
import { back_substr } from '../../service/string.util';

@Component({
  selector: 'app-endianness-output-group',
  templateUrl: './endianness-output-group.component.html',
  standalone: false,
})
export class EndiannessOutputGroupComponent implements OnInit {
  parsed: ParseResult | null = null;
  output = {
    systemEndianness: '',
    u32Bits: '',
    byteLE0: '',
    byteLE1: '',
    byteLE2: '',
    byteLE3: '',
  };

  constructor(private service: ParsedInputService) {}

  ngOnInit(): void {
    this.service.getInput$().subscribe((pr) => {
      if (!!pr) {
        this.parsed = pr;
        // Endianness[] -> numeric value to string
        this.output.systemEndianness = Endianness[getSystemEndianness()];
        this.output.u32Bits = bignumberWholePartToUnsignedBitStringOfLength(
          this.parsed.unsignedWholePart,
          BitLength.B32,
        );
        this.output.byteLE0 =
          '0b' +
          back_substr(this.output.u32Bits, this.output.u32Bits.length, 8);
        this.output.byteLE1 =
          '0b' +
          back_substr(this.output.u32Bits, this.output.u32Bits.length - 8, 8);
        this.output.byteLE2 =
          '0b' +
          back_substr(this.output.u32Bits, this.output.u32Bits.length - 16, 8);
        this.output.byteLE3 =
          '0b' +
          back_substr(this.output.u32Bits, this.output.u32Bits.length - 24, 8);
      } else {
        this.parsed = null;
      }
    });
  }
}
