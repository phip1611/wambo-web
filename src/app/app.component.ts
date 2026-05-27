import { Component, effect, inject } from '@angular/core';
import { ParsedInputService } from './service/parsed-input.service';

/**
 * The app component is responsible for disabling "information card" components in some conditions.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {

  /**
   * Whether there is a valid input from that "information card" components
   * can show useful information.
   */
  hasData: boolean = false;

  /**
   * Whether the user typed in a fraction.
   */
  isFraction: boolean = false;

  private readonly service = inject(ParsedInputService);

  private readonly syncState = effect(() => {
      const val = this.service.input();
      this.hasData = !!val;
      this.isFraction = this.hasData && !!val?.unsignedFractionPart;
  });
}
