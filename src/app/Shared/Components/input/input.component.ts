import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Dropdown } from '../../Models/dropdown';
import { DurationUnitEnum } from '../../Enums/duration-unit';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() errMsg: string = '';
  @Input() inputType: string = '';
  @Input() isRequired: boolean = true;
  @Input() disabled: boolean = false;
  @Input() acceptNumberAndDash: boolean = false;
  @Input() numberWithUnit: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() unit: string = '';
  @Input() selectUnit: boolean = false;
  @Input() value: any = '';
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() minLength!: number;
  @Input() maxLength!: number;
  @Input() min: number = 0;
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() keyup: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() unitChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;
  whiteSpaceError: boolean = false;
  durationUnit = DurationUnitEnum;
  unitValue: number = this.durationUnit.Year;
  passwordShow:boolean=false
  options: Dropdown[] = [
    { id: this.durationUnit.Year, name: 'سنة' },
    { id: this.durationUnit.Month, name: 'شهر' },
  ];
  constructor(private controlContainer: ControlContainer) {}
  ngOnInit(): void {
    this.control.valueChanges.subscribe((data) => {
      this.whiteSpaceError = this.noWhitespaceValidator(this.control, data);
    });
  }

  get controlValidation() {
    return (
      this.isRequired &&
      this.control.touched &&
      !this.control.value &&
      !this.whiteSpaceError
    );
  }
  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }
  get control(): FormControl {
    const control =
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName);
    if (control instanceof FormControl) {
      return control;
    }
    throw new Error('FormControl not found');
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  restrictLength(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (input.value.length >= this.maxLength) {
      event.preventDefault();
    }
  }
  restrictNagtive(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (this.inputType === 'number' && this.min === 0) {
      if (
        event.key === '-' ||
        event.key === '+' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      ) {
        event.preventDefault();
      }
    }
  }
  noWhitespaceValidator(control: FormControl, value: any) {
    return (control.value || value || '').trim().length > 0 ? false : true;
  }
  onFocus() {
    this.focus.emit();
  }
  onKeyup() {
    this.keyup.emit();
  }
  changeUnit(event: any) {
    this.unitChange.emit(event);
  }
  onChange(e: any) {
    this.whiteSpaceError = this.noWhitespaceValidator(
      this.control,
      e.target.value
    );
    if (this.whiteSpaceError) {
      this.control.setValue(null);
      this.control.setErrors({ required: true });
    }
    this.change.emit(e);
  }
}
