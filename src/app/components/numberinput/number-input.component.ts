import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NUMBER_INPUT_REGEX, parseNumberInput} from '../../service/parsing/parse';
import {ParseResult} from '../../service/parsing/parse-result';
import * as XRegExp from 'xregexp';
import {ParsedInputService} from '../../service/parsed-input.service';
import {bigNumberAsDoubleToIntegerHexBits, bigNumberAsFloatToIntegerHexBits} from '../../service/ieee754-convert.util';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html'
})
export class NumberInputComponent implements OnInit, AfterViewInit, OnDestroy {

  private latestValidParsedInput: ParseResult | null = null;

  @ViewChild('numberInputElement')
  private numberInputElement: ElementRef | null = null;

  constructor(private fb: FormBuilder,
              private parsedInputService: ParsedInputService) {
  }

  form: FormGroup | undefined = undefined;

  subscription: Subscription | undefined = undefined;

  // Normalizes the value from normalizeInputUi for
  // the further parsing steps.
  static normalizeInputForParsing(input: string): string {
    let normalized = input.toLowerCase();
    while (normalized.includes('_')) {
      normalized = normalized.replace('_', '');
    }
    return normalized;
  }

  // Normalized the input for a convenient UI experience.
  static normalizeInputUi(input: string): string {
    let normalized = input.toLowerCase();
    while (normalized.includes('__')) {
      normalized = normalized.replace('__', '_');
    }
    while (normalized.includes('--')) {
      normalized = normalized.replace('--', '-');
    }
    while (normalized.includes(',')) {
      normalized = normalized.replace(',', '.');
    }
    while (normalized.includes('..')) {
      normalized = normalized.replace('..', '.');
    }
    while (normalized.includes(' ')) {
      normalized = normalized.replace(' ', '');
    }
    return normalized;
  }

  static uiInputIsNormalized(input: string): boolean {
    const normalized = this.normalizeInputUi(input);
    // input is normalized if it is not changed by normalization function + contains at
    // maximum one decimal point
    return normalized === input;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      numberInput: ['', [Validators.required, numberInputValidator, numberI18nValidator]]
    });

    let stackOverflowProtector = 0;
    this.form.statusChanges.subscribe(() => {
      if (this.form?.valid) {
        const input = this.form.getRawValue().numberInput;
        try {
          const normalizedForParsing = NumberInputComponent.normalizeInputForParsing(input);
          const result: ParseResult | null = parseNumberInput(normalizedForParsing);
          this.latestValidParsedInput = result;
          this.parsedInputService.next(result);
        } catch (e) {
          console.error('catched error during parsing', e);
          this.form?.get(`numberInput`)?.setErrors({
            invalid: true
          });
        }
      } else {
        this.parsedInputService.next(null);
      }
    });

    // this is used to normalize the input while it is typed
    this.subscription = this.form.get('numberInput')?.valueChanges.subscribe(input => {
      // continuously help user to normalize his input
      if (!NumberInputComponent.uiInputIsNormalized(input)) {
        // @ts-ignore
        this.form.get(`numberInput`).setValue(
          NumberInputComponent.normalizeInputUi(input)
        );
        stackOverflowProtector++;
        if (stackOverflowProtector > 1000) {
          console.error('There might be a bug during ui input normalization that results in endless recursion!');
          return;
        }
      } else {
        stackOverflowProtector = 0;
      }
    });
  }

  ngAfterViewInit(): void {
    // set focus
    // @ts-ignore
    this.numberInputElement.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTransformToF32(): void {
    if (this.latestValidParsedInput) {
      const newInput = bigNumberAsFloatToIntegerHexBits(this.latestValidParsedInput.signedNumericValue);
      this.form?.get(`numberInput`)?.setValue(newInput);
    }
  }

  onTransformToF64(): void {
    if (this.latestValidParsedInput) {
      const newInput = bigNumberAsDoubleToIntegerHexBits(this.latestValidParsedInput.signedNumericValue);
      this.form?.get(`numberInput`)?.setValue(newInput);
    }
  }
}

// Checks that english format is used (. for fraction part).
const numberI18nValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value;
  if (!value || value === '') {
    // this case is covered by required validator
    return null;
  }
  const pointCount = (value.match(/\./g) || []).length;
  if (pointCount > 1) {
    return {
      i18n: true,
      big_number_sep: true,
    };
  } else {
    return null;
  }
};


// Basic validation against the REGEX
const numberInputValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let value = control.value;
  if (!value || value === '') {
    // this case is covered by required validator
    return null;
  }
  value = NumberInputComponent.normalizeInputForParsing(value);
  const match = XRegExp.exec(value, NUMBER_INPUT_REGEX);
  if (!match || !match.groups?.numeric_value) {
    return {
      invalid: true
    };
  } else {
    return null;
  }
};
