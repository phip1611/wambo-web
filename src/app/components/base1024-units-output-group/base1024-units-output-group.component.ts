import { Component, OnInit } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';
import { fromBaseToUnit, Unit } from '../../service/parsing/unit';

@Component({
  selector: 'app-base1024-units-output-group',
  templateUrl: './base1024-units-output-group.component.html'
})
export class Base1024UnitsOutputGroupComponent implements OnInit {

  parsed: ParseResult | null = null;
  output = {
    kib: '',
    mib: '',
    gib: '',
    tib: '',
  };

  constructor(private service: ParsedInputService) { }

  ngOnInit(): void {
    this.service.getInput$().subscribe(pr => {
      if (!!pr) {
        this.parsed = pr;
        this.output.kib = fromBaseToUnit(Unit.Kibi, this.parsed.signedNumericValue).toString(10);
        this.output.mib = fromBaseToUnit(Unit.Mibi, this.parsed.signedNumericValue).toString(10);
        this.output.gib = fromBaseToUnit(Unit.Gibi, this.parsed.signedNumericValue).toString(10);
        this.output.tib = fromBaseToUnit(Unit.Tebi, this.parsed.signedNumericValue).toString(10);
      } else {
        this.parsed = null;
      }
    });
  }

}
