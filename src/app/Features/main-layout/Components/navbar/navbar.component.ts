import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() showSideNav = new EventEmitter();
  constructor(private router:Router) {}
  ngOnInit(): void {}
  toggleSideNav() {
    this.showSideNav.emit();
  }


  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }
}
