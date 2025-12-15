import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-delete-dialog',
  templateUrl: './confirmation-delete-dialog.component.html',
  styleUrls: ['./confirmation-delete-dialog.component.scss']
})
export class ConfirmationDeleteDialogComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() message: string='';
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
