import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../warehouse.service';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { Router } from '@angular/router';
import { FarmService } from '../../farm/farm.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  form!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  warehouseData:any[]=[]
  searchText=''
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private lookupService:LookupService
  ) {}
  ngOnInit(): void {
    this.intializeListCoulmns();
    this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: '',
        hide: false,
        header: '#',
        width: 5,
        isIndex: true,
      }),
      new ListColumn({
        field: 'itemName',
        hide: false,
        header: 'اسم الصنف/الدوا',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'الكمية (طن)',
      }),
       new ListColumn({
        field: 'pricePerUnit',
        hide: false,
        header: 'سعر الوحدة',
      }),
       new ListColumn({
        field: 'totalValue',
        hide: false,
        header: 'السعر الكلي',
      }),
    ];
  }
  outgoing() {
    this.router.navigate(['warehouse/outgoing']);
  }
  incoming() {
    this.router.navigate(['warehouse/incoming']);
  }
  getPage() {
    this.warehouseService
      .getAll()
      .subscribe((response: any) => {
        this.warehouseData = response;
        this.getData()
      });
  }
  search(text:string)
  {
    this.searchText=text
    this.searchMode=true;
    this.getPage()

  }
  getData() {
    this.lookupService.getFarms().subscribe((response: any) => {
        let farms = response||[];
        if (farms.length > 0) {
          const farmId = Number(localStorage.getItem('farmId'));
          if (farmId) {
            let farm = farms.find((farm:any) => farm.id == farmId);
            let wharehouse = this.warehouseData.find((item) => item.farmName == farm.name);
            if(wharehouse)
            {
              this.warehouseService.getWarehouseItem(wharehouse.id,this.maxResultCount,this.skipCount,this.searchText).subscribe((data:any)=>{
                this.pageResult.items=data.items
                this.pageResult.records=data.totalCount
              })
            }

          } 
        }
    });
  }
  onPageChanged(event: any) {
    this.maxResultCount= event.rows;
    this.skipCount= event.first;
    this.getPage();
  }
}
