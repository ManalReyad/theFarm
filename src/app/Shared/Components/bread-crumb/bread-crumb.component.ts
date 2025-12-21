import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent {
  @Output() onClick = new EventEmitter<any>();
  @Output() mainTitleClicked = new EventEmitter<any>();

  @Input() mainTitle: string="الرئيسية";
  @Input() pages!: any[];
  constructor(private router: Router) {}
  ngOnInit() {}
  onRouteToMain() {
    this.mainTitleClicked.emit();
  }

  applyRoute(value:any) {
    if (value.route) {
      this.router.navigate([`/${value.route}`]);
    }
    if (value.command) {
      this.onClick.emit();
    }
  }
}
