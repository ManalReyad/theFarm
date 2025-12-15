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
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
})
export class DropdownComponent {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() errMsg: string = '';
  @Input() options: any[] = [];
  @Input() isRequired: boolean = true;
  @Input() disabled: boolean = false;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  @ViewChild('dropdown') dropdown!: Dropdown;
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;
  constructor(private controlContainer: ControlContainer) {}
  ngOnInit(): void {}

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
  get controlValidation() {
    return this.isRequired && this.control.touched && !this.control.value;
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  onChange(e: any) {
    this.change.emit(e.value);
  }
  onSearch(e: any) {
    this.search.emit(e.filter);
  }
  open() {
    if (this.dropdown) {
      this.dropdown.show();
    }
  }
}
