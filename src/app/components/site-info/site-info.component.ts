import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-site-info',
    templateUrl: './site-info.component.html'
})
export class SiteInfoComponent {

  readonly bootstrapClasses = 'd-block d-md-inline-block py-1 py-md-0';

  /**
   * Information fetched from /3rdpartylicenses.txt.
   */
  readonly openSourceLicenses = signal<string | null>(null);

  constructor() {
    void this.loadOpenSourceLicenses();
  }

  private async loadOpenSourceLicenses(): Promise<void> {
    const res = await fetch('/3rdpartylicenses.txt').catch(() => null);
    if (!res?.ok) {
      return;
    }
    this.openSourceLicenses.set(await res.text());
  }
}
