import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-collaps',
  templateUrl: './collaps.component.html',
  styleUrls: ['./collaps.component.scss'],
})
export class CollapsComponent implements OnInit {
  @Input() title: any;
  @Input() collapseId: string = 'collaps-1';
  @Input() icon: string = '';
  @Input() activeIcon: string = '';
  @Input() isToggled: boolean = false;
  constructor(private sharedServices: SharedService) {}

  ngOnInit(): void {}
  toggel() {
  //  this.isToggled = !this.isToggled;
    this.sharedServices.setOpenCollapseId(
      this.isToggled ? null : this.collapseId
    );
  }
}
