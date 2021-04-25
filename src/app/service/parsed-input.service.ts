import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ParseResult } from './parsing/parse-result';

@Injectable({providedIn: 'root'})
export class ParsedInputService {
  private input$ = new ReplaySubject<ParseResult | null>(1);

  next(pr: ParseResult | null): void {
    this.input$.next(pr);
  }

  getInput$(): Observable<ParseResult | null> {
    return this.input$.asObservable();
  }
}
