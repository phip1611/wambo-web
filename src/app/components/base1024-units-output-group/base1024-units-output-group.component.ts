import { Component, computed, inject } from '@angular/core';
import { ParsedInputService } from '../../service/parsed-input.service';
import { fromBaseToUnit, Unit } from '../../service/parsing/unit';
import { MonoComponent } from '../mono/mono.component';

@Component({
  selector: 'app-base1024-units-output-group',
  templateUrl: './base1024-units-output-group.component.html',
  imports: [MonoComponent],
})
export class Base1024UnitsOutputGroupComponent {
  private readonly service = inject(ParsedInputService);
  readonly parsed = this.service.input;
  readonly output = computed(() => {
    const parsed = this.parsed();
    if (!parsed) {
      return null;
    }
    return {
      kib: fromBaseToUnit(Unit.Kibi, parsed.signedNumericValue).toString(10),
      mib: fromBaseToUnit(Unit.Mibi, parsed.signedNumericValue).toString(10),
      gib: fromBaseToUnit(Unit.Gibi, parsed.signedNumericValue).toString(10),
      tib: fromBaseToUnit(Unit.Tebi, parsed.signedNumericValue).toString(10),
    };
  });
}
