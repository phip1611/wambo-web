import { Component, OnInit } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';

@Component({
  selector: 'app-numeral-systems-output-group',
  templateUrl: './numeral-systems-output-group.component.html',
  standalone: false,
})
export class NumeralSystemsOutputGroupComponent implements OnInit {
  parsed: ParseResult | null = null;
  output = {
    bin: '',
    oct: '',
    dec: '',
    hex: '',
  };

  constructor(private service: ParsedInputService) {}

  ngOnInit(): void {
    this.service.getInput$().subscribe((pr) => {
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
}
