import { Component, HostListener, OnInit } from '@angular/core';
import { BaseService } from 'src/app/Shared/Services/base.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit{
  visiable: boolean = true;
  currentWindowWidth: number=0;
  faildMessage:string=''
 showFaildDialog:boolean=false
  constructor(private baseService:BaseService){}
  ngOnInit() {
    if (this.visiable) {
      this.onResize();
    }

    this.baseService.isFaild.subscribe((data:any) => {
      this.showFaildDialog = data;
    });
    this.baseService.faliureMessage.subscribe((data:any) => {
      this.faildMessage = data;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
    if (window.innerWidth > 1024) {
      this.visiable = true;
    } else {
      this.visiable = false;
    }
  }
  show() {
    this.visiable = !this.visiable;
  }
}

