import { Component, OnInit } from '@angular/core';
import {
  bignumberWholePartToUnsignedBitStringOfLength,
  BitLength,
} from '../../service/bit.util';
import {
  bigNumberWholePartBitsToF32Value,
  bigNumberWholePartBitsToF64Value,
} from '../../service/ieee754-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';

@Component({
  selector: 'app-output-group-ieee754',
  templateUrl: './output-group-ieee754.component.html',
  standalone: false,
})
export class OutputGroupIeee754Component implements OnInit {
  parsed: ParseResult | null = null;
  output = {
    f32: '',
    // this is a double. Javascript uses a double for all numbers.
    f64: '',
    bits: '',
  };

  constructor(private service: ParsedInputService) {}

  ngOnInit(): void {
    this.service.getInput$().subscribe((pr) => {
      if (!!pr) {
        this.parsed = pr;
        this.output.f32 = bigNumberWholePartBitsToF32Value(
          this.parsed.unsignedWholePart,
        ).toString();
        this.output.f64 = bigNumberWholePartBitsToF64Value(
          this.parsed.unsignedWholePart,
        ).toString();
        this.output.bits = this.output.bits =
          bignumberWholePartToUnsignedBitStringOfLength(
            this.parsed.unsignedWholePart,
            BitLength.B64,
          );
      } else {
        this.parsed = null;
      }
    });
  }
}
