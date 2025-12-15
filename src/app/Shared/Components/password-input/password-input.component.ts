import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordInputComponent,
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements OnInit{
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() errMsg: string = '';
  @Input() isRequired: boolean = true;
  @Input() disabled: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() minLength!: number;
  @Input() maxLength!: number;
  @Input() min: number = 0;
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;
  whiteSpaceError: boolean = false;
  passwordShow: boolean = false;

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
      this.whiteSpaceError
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

  noWhitespaceValidator(control: FormControl, value: any) {
    return (control.value || value || '').trim().length > 0 ? false : true;
  }
  showingPassword() {

    this.passwordShow=!this.passwordShow
  }
}
