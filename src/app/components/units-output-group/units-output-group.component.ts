import { Component, computed, inject } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { fromBaseToUnit, Unit } from '../../service/parsing/unit';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-units-output-group',
  templateUrl: './units-output-group.component.html',
  imports: [MonoComponent],
})
export class UnitsOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    return {
      kilo: fromBaseToUnit(Unit.Kilo, parsed.signedNumericValue).toString(10),
      mega: fromBaseToUnit(Unit.Mega, parsed.signedNumericValue).toString(10),
      giga: fromBaseToUnit(Unit.Giga, parsed.signedNumericValue).toString(10),
      tera: fromBaseToUnit(Unit.Tera, parsed.signedNumericValue).toString(10),
    };
  });
}
