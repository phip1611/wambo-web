import { Component, OnInit } from '@angular/core';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from '../../service/bit.util';
import { toUInt16, toUInt32, toUInt64, toUInt8 } from '../../service/int-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';

@Component({
    selector: 'app-unsigned-integers-output-group',
    templateUrl: './unsigned-integers-output-group.component.html',
    standalone: false
})
export class UnsignedIntegersOutputGroupComponent implements OnInit {

  parsed: ParseResult | null = null;
  output = {
    u8: '',
    u16: '',
    u32: '',
    u64: '',
    bits: '',
  };

  constructor(private service: ParsedInputService) { }

  ngOnInit(): void {
    this.service.getInput$().subscribe(pr => {
      if (!!pr) {
        this.parsed = pr;
        this.output.u8 = toUInt8(this.parsed.unsignedWholePart).toString();
        this.output.u16 = toUInt16(this.parsed.unsignedWholePart).toString();
        this.output.u32 = toUInt32(this.parsed.unsignedWholePart).toString();
        const u64 = toUInt64(this.parsed.unsignedWholePart);
        this.output.u64 = u64.toString();
        this.output.bits = bignumberWholePartToUnsignedBitStringOfLength(this.parsed.unsignedWholePart, BitLength.B64);
      } else {
        this.parsed = null;
      }
    });
  }
}
