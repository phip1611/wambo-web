import { Component, OnInit } from '@angular/core';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from '../../service/bit.util';
import { toSInt16, toSInt32, toSInt64, toSInt8 } from '../../service/int-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';

@Component({
    selector: 'app-signed-integers-output-group',
    templateUrl: './signed-integers-output-group.component.html',
    standalone: false
})
export class SignedIntegersOutputGroupComponent implements OnInit {

  parsed: ParseResult | null = null;
  output = {
    i8: '',
    i16: '',
    i32: '',
    i64: '',
    bits: '',
  };

  constructor(private service: ParsedInputService) { }

  ngOnInit(): void {
    this.service.getInput$().subscribe(pr => {
      if (!!pr) {
        this.parsed = pr;
        this.output.i8 = toSInt8(this.parsed.unsignedWholePart).toString();
        this.output.i16 = toSInt16(this.parsed.unsignedWholePart).toString();
        this.output.i32 = toSInt32(this.parsed.unsignedWholePart).toString();
        const i64 = toSInt64(this.parsed.unsignedWholePart);
        this.output.i64 = i64.toString();
        this.output.bits = bignumberWholePartToUnsignedBitStringOfLength(this.parsed.unsignedWholePart, BitLength.B64);
      } else {
        this.parsed = null;
      }
    });
  }
}
