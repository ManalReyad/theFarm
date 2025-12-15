import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() message: string='هل أنت متأكد أنك تريد المغادرة؟ سيتم تجاهل أي بيانات قمت بإدخالها';
  @Input() btnText!: string;
  @Output() onSubmitEvent = new EventEmitter<any>();
  @Output() exit = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}

  onSubmit() {
    this.onSubmitEvent.emit();
  }
  close() {
    this.exit.emit();
  }
}
