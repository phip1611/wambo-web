import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XRegExp from 'xregexp';
import { bigNumberAsDoubleToIntegerHexBits, bigNumberAsFloatToIntegerHexBits } from '../../service/ieee754-convert.util';
import { ParsedInputService } from '../../service/parsed-input.service';
import { NUMBER_INPUT_REGEX, parseNumberInput } from '../../service/parsing/parse';
import { ParseResult } from '../../service/parsing/parse-result';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html'
})
export class NumberInputComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private fb: FormBuilder,
              private parsedInputService: ParsedInputService) {
  }

  private latestValidParsedInput: ParseResult | null = null;

  @ViewChild('numberInputElement')
  private numberInputElement: ElementRef | null = null;

  form: FormGroup | undefined = undefined;

  inputChangeSubscription: Subscription | undefined = undefined;

  /**
   * Normalizes the input from the input field and "normalizes" it,
   * i.e. removes all "_" from it. The underscores are valid for the
   * input field but not for the parsing step.
   *
   * @param input validated form input
   * @return form validated value that is ready for parsing
   */
  static prepareInputForParsing(input: string): string {
    let normalized = input.toLowerCase();
    while (normalized.includes('_')) {
      normalized = normalized.replace('_', '');
    }
    return normalized;
  }

  /**
   * Function which normalizes the input and helps to remove
   * common mistakes, like accidentally typed ".." instead of ".".
   * @param input raw form input
   * @return new value for form (updated while typing)
   */
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

  /**
   * Checks if {@link #normalizeInputUi} does no changes to the input.
   * @param input raw form input
   * @return if value is normalized in terms of {@link #normalizeInputUi}
   */
  static uiInputIsNormalized(input: string): boolean {
    const normalized = this.normalizeInputUi(input);
    // input is normalized if it is not changed by normalization function + contains at
    // maximum one decimal point
    return normalized === input;
  }

  /**
   * Updates the URL fragment which stores the user input.
   * This enables a user to easily share a link with others.
   *
   * @param input validated and parsable form input
   * @private
   */
  private static updateUrlFragment(input: string): void {
    window.history.replaceState(
      null,
      document.title,
      '#' + input
    );
  }

  /*
  private setupOnBrowserNavigationChange(): void {
    window.addEventListener('hashchange', (evt) => {
      this.getInputFromUrlFragmentAndUpdateForm();
    });
  }*/

  /**
   * Get's a (hopefully valid) form input from the URL and
   * stores it inside the form.
   * @private
   */
  private getInputFromUrlFragmentAndUpdateForm(): void {
    const urlFragmentSplit: string[] = window.location.toString().split('#');
    if (urlFragmentSplit[1]) {
      this.form?.get('numberInput')?.setValue(urlFragmentSplit[1]);
    }
  }

  /**
   * Initializes the form and sets up the subscription for form changes.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      numberInput: [
        '',
        [
          Validators.required,
          numberInputValidator,
          numberI18nValidator
        ]
      ]
    });

    // variable is only required for debugging weird input combinations
    // in case I made programming errors...
    let stackOverflowProtector = 0;

    // on each form input (which can be invalid)
    this.form.statusChanges.subscribe(() => {
      // if validators say: everything is ok
      if (this.form?.valid) {
        const input: string = this.form.getRawValue().numberInput;
        try {
          const normalizedForParsing = NumberInputComponent.prepareInputForParsing(input);
          // at this point valid from the perspective of validators: next: parsing
          const result: ParseResult | null = parseNumberInput(normalizedForParsing);
          // at this point if no error was thrown: totally valid input
          this.latestValidParsedInput = result;
          // this will enable all "information cards" to see the latest input and output useful information
          this.parsedInputService.next(result);
          // store the input in the URL fragment for URL sharing
          NumberInputComponent.updateUrlFragment(input);
        } catch (e) {
          console.error('catched error during parsing', e);
          this.form?.get(`numberInput`)?.setErrors({
            invalid: true
          });
        }
      } else {
        // tell all "information cards" to show nothing
        this.latestValidParsedInput = null;
        this.parsedInputService.next(null);
      }
    });

    // this is used to normalize the input while it is typed on the fly
    this.inputChangeSubscription = this.form.get('numberInput')?.valueChanges.subscribe(input => {
      // continuously help user during input with auto normalization
      if (!NumberInputComponent.uiInputIsNormalized(input)) {
        // update value inside form
        this.form?.get(`numberInput`)?.setValue(
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

  /**
   * Code that needs to be executed after the components view was initialized.
   */
  ngAfterViewInit(): void {
    // set focus to input element
    // Already done in HTML via "autofocus" attribute
    // this.numberInputElement?.nativeElement.focus();

    // this.setupOnBrowserNavigationChange();

    // If a value is specified in the URL: put it into the form
    this.getInputFromUrlFragmentAndUpdateForm();
  }

  ngOnDestroy(): void {
    if (this.inputChangeSubscription) {
      this.inputChangeSubscription.unsubscribe();
    }
  }

  /**
   * Takes the user inputs numeric value, transforms it to `f32`/`float` and transforms this value to it's
   * hexadecimal integer bits representation.
   */
  onTransformToF32(): void {
    if (this.latestValidParsedInput) {
      const newInput = bigNumberAsFloatToIntegerHexBits(this.latestValidParsedInput.signedNumericValue);
      this.form?.get(`numberInput`)?.setValue(newInput);
    }
  }

  /**
   * Takes the user inputs numeric value, transforms it to `f32`/`float` and transforms this value to it's
   * hexadecimal integer bits representation.
   */
  onTransformToF64(): void {
    if (this.latestValidParsedInput) {
      const newInput = bigNumberAsDoubleToIntegerHexBits(this.latestValidParsedInput.signedNumericValue);
      this.form?.get(`numberInput`)?.setValue(newInput);
    }
  }
}

/**
 * Validator for the user input which checks that the number is properly formatted,
 * e.g. "." as decimal separator and not "," as done in german.
 * @param control FormControl
 */
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


/**
 * Validator which checks the form input against the REGEX which will be used for parsing when
 * the form is valid.
 * @param control FormControl
 */
const numberInputValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let value = control.value;
  if (!value || value === '') {
    // this case is covered by required validator
    return null;
  }
  value = NumberInputComponent.prepareInputForParsing(value);
  const match = XRegExp.exec(value, NUMBER_INPUT_REGEX);
  if (!match || !match.groups?.numeric_value) {
    return {
      invalid: true
    };
  } else {
    return null;
  }
};
