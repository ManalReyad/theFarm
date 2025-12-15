import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
})
export class SuccessDialogComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() message!: string;
  @Input() btnText!: string;
  @Output() onSubmitEvent = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {
  }

  onSubmit() {
    this.onSubmitEvent.emit();
  }
}
