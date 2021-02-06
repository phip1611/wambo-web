import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParsedInputService} from './service/parsed-input.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  hasData: boolean = false;

  isFraction: boolean = false;

  private subscription: Subscription | null = null;

  constructor(private service: ParsedInputService) {
  }

  ngOnInit(): void {
    this.subscription = this.service.getInput$().subscribe(val => {
      this.hasData = !!val;
      this.isFraction = this.hasData && !!val?.unsignedFractionPart;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
