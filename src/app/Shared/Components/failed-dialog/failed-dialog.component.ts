import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-failed-dialog',
  templateUrl: './failed-dialog.component.html',
  styleUrls: ['./failed-dialog.component.scss']
})
export class FailedDialogComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() message: string='يبدو أنه قد حدث خطأ ما، من فضلك أعد المحاولة مجددًا';
  @Output() onSubmitEvent = new EventEmitter<any>();
  @Output() exit = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}

  onSubmit() {
    this.visible=false
    this.onSubmitEvent.emit();
  }
}
