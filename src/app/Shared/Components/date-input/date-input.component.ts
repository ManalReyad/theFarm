import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent), // Use forwardRef here
      multi: true,
    },
  ],
})
export class DateInputComponent {
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() errMsg: string = '';
  @Input() isRequired: boolean = true;
  @Input() hideLabel: boolean = false;
  @Input() clear: boolean = false;
  @Input() disabled: boolean = false;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() value: any;
  @Input() id: string='date';
  @Input() isRange: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @ViewChild('calendar') calendar!: Calendar;
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  onTouched: any = () => {}
  constructor(private controlContainer: ControlContainer) {}
  ngOnInit(): void {}

  get controlValidation() {
    return this.isRequired && this.control.touched && !this.control.value;
  }

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }
  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }
  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }
  openCalendar(): void {
    this.calendar?.inputfieldViewChild?.nativeElement.focus();
  }
  onChange(selectedDate: any) {
    console.log(selectedDate);
    
    if (this.isRange) {
      this.change.emit(selectedDate);
    } else {
      selectedDate.setHours(selectedDate.getHours() + 3);
      this.control.setValue(selectedDate);
      this.change.emit(selectedDate);
    }
  }
}
