import { Component, HostListener, OnInit } from '@angular/core';
import { FarmService } from 'src/app/Features/farm/farm.service';
import { BaseService } from 'src/app/Shared/Services/base.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  visiable: boolean = true;
  currentWindowWidth: number = 0;
  faildMessage: string = '';
  showFaildDialog: boolean = false;
  farmOptions: { id: number; name: string }[] = [];
  selectedFarmId!: number;
  projectName: string = '';
  constructor(
    private baseService: BaseService,
    private lookupService: LookupService,
  ) {}
  ngOnInit() {
    if (this.visiable) {
      this.onResize();
    }

    this.baseService.isFaild.subscribe((data: any) => {
      this.showFaildDialog = data;
    });
    this.baseService.faliureMessage.subscribe((data: any) => {
      this.faildMessage = data;
    });

    this.getFarmDropdowns();
  }
  getFarmDropdowns() {
    this.lookupService.getFarms().subscribe((response: any) => {
        this.farmOptions = response
        if (this.farmOptions.length > 0) {
          const farmId = Number(localStorage.getItem('farmId'));
          if (farmId) {
            let farm = this.farmOptions.find((farm) => farm.id == farmId);
            this.selectedFarmId = farmId;
            this.projectName = farm ? farm.name : this.farmOptions[0].name;
          } else {
            this.selectedFarmId = this.farmOptions[0].id;
            localStorage.setItem('farmId', this.farmOptions[0].id.toString());
            this.projectName = this.farmOptions[0].name;
          }
        }
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
  onSelectProject(data: any) {
    localStorage.setItem('farmId', data.value);
    let farm = this.farmOptions.find((farm) => farm.id == data.value);
    this.projectName = farm?.name || '';
    window.location.reload();
  }
}
