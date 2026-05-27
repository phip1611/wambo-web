import { Component, effect, inject } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { ParseResult } from '../../service/parsing/parse-result';
import { fromBaseToUnit, Unit } from '../../service/parsing/unit';

@Component({
    selector: 'app-units-output-group',
    templateUrl: './units-output-group.component.html',
    standalone: false
})
export class UnitsOutputGroupComponent {

  parsed: ParseResult | null = null;
  output = {
    kilo: '',
    mega: '',
    giga: '',
    tera: '',
  };

  private readonly service = inject(ParsedInputService);

  private readonly syncOutput = effect(() => {
      const pr = this.service.input();
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
