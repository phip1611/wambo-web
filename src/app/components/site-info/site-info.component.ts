import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-site-info',
    templateUrl: './site-info.component.html',
    standalone: false
})
export class SiteInfoComponent implements OnInit {

  bootstrapClasses = 'd-block d-md-inline-block py-1 py-md-0';

  /**
   * Information fetched from /3rdpartylicenses.txt.
   */
  openSourceLicenses: string | null = null;

  // TODO refactor to use
  // https://medium.com/@aniruddhadas9/bootstrap-5-in-angular-10-without-jquery-45723598440c
  // this should only load the javascript parts that are necessary.
  // => even smaller bundle

  constructor() { }

  ngOnInit(): void {
    fetch('/3rdpartylicenses.txt')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Can't fetch '/3rdpartylicenses.txt'`);
        }
        return res;
      })
      .then(res => res.text())
      .then(content => this.openSourceLicenses = content)
      .catch(() => console.info(`Can't fetch '/3rdpartylicenses.txt'`));
  }

}
