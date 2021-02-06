import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html'
})
export class SiteInfoComponent implements OnInit {

  bootstrapClasses = 'd-block d-md-inline-block py-1 py-md-0';

  // TODO refactor to use
  // https://medium.com/@aniruddhadas9/bootstrap-5-in-angular-10-without-jquery-45723598440c
  // this should only load the javascript parts that are necessary.
  // => even smaller bundle

  constructor() { }

  ngOnInit(): void {
  }

}
