import { Injectable, signal } from '@angular/core';
import { ParseResult } from './parsing/parse-result';

@Injectable({ providedIn: 'root' })
export class ParsedInputService {
  private readonly inputState = signal<ParseResult | null>(null);
  readonly input = this.inputState.asReadonly();

  next(pr: ParseResult | null): void {
    this.inputState.set(pr);
  }
}
