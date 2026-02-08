import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../warehouse.service';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedDepartment: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  form!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  warehouseData:any[]=[]
  constructor(
    private warehouseService: WarehouseService,
    private router: Router
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
        field: 'warehouseName',
        hide: false,
        header: 'المخزن',
      }),
      new ListColumn({
        field: 'itemName',
        hide: false,
        header: 'اسم الصنف/الدوا',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'الكمية',
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
        if (response.success) {
          this.warehouseData = response.data;
        }
      });
  }
  onPageChanged(event: any) {
    this.pageNumber = event.first;
    this.pageSize = event.rows;
    this.getPage();
  }
}
