import { Component, OnInit } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';
import { fromBaseToUnit, Unit } from '../../service/parsing/unit';

@Component({
    selector: 'app-units-output-group',
    templateUrl: './units-output-group.component.html',
    standalone: false
})
export class UnitsOutputGroupComponent implements OnInit {

  parsed: ParseResult | null = null;
  output = {
    kilo: '',
    mega: '',
    giga: '',
    tera: '',
  };

  constructor(private service: ParsedInputService) { }

  ngOnInit(): void {
    this.service.getInput$().subscribe(pr => {
      if (!!pr) {
        this.parsed = pr;
        this.output.kilo = fromBaseToUnit(Unit.Kilo, this.parsed.signedNumericValue).toString(10);
        this.output.mega = fromBaseToUnit(Unit.Mega, this.parsed.signedNumericValue).toString(10);
        this.output.giga = fromBaseToUnit(Unit.Giga, this.parsed.signedNumericValue).toString(10);
        this.output.tera = fromBaseToUnit(Unit.Tera, this.parsed.signedNumericValue).toString(10);
      } else {
        this.parsed = null;
      }
    });
  }

}
