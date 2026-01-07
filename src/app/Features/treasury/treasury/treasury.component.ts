import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { FarmService } from '../../farm/farm.service';
import { PaidType } from '../enums/paid-type';
import { TreasuryService } from '../treasury.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrl: './treasury.component.scss',
})
export class TreasuryComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedDepartment: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showAddMonyForm: boolean = false;
  showDeductMonyForm: boolean = false;
  editMode: boolean = false;
  addMonyform!: FormGroup;
  deductMonyform!: FormGroup;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  farmOptions: { id: number; name: string }[] = [];
  paidTypeOptions: { id: number; name: string }[] = [
    {
      id: PaidType.Deposit,
      name: 'إضافة للعهدة',
    },
    {
      id: PaidType.Sale,
      name: 'عملية بيع',
    },
  ];
  constructor(
    private farmService: FarmService,
    private treasuryService: TreasuryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.intializeListCoulmns();
    this.getPage();
    this.getDropdowns();
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
        field: 'farmName',
        hide: false,
        header: 'المزرعة',
      }),
      new ListColumn({
        field: 'value',
        hide: false,
        header: 'القيمة',
      }),
    ];
  }
  createForm() {
    this.addMonyform = new FormGroup({
      id: new FormControl(0),
      farmID: new FormControl(null, Validators.required),
      paidTypeID: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
    });
  }
  getDropdowns() {
    this.farmService.getList().subscribe((response: any) => {
      if (response.success) {
        this.farmOptions = response.data;
      }
    });
  }
  add() {
    this.addMonyform.reset();
    this.showAddMonyForm = true;
  }
  deduct() {
    this.router.navigate(['treasury/deduction']);
  }
  goToDetails(data: any) {
    this.router.navigate(['treasury/details/' + data.id]);
  }
  getPage() {
    this.treasuryService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((response: any) => {
        if (response.success) {
          this.pageResult = response.data;
        }
      });
  }
  save() {
    this.treasuryService
      .addMony(this.addMonyform.value)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تمت الإضافة  بنجاح ، يمكنك المتابعة';
          this.showAddMonyForm = false;
          this.showSuccessDialog = true;
        }
      });
  }

  showWarnningMessage() {
    this.showWarnningDialog = true;
  }
  onPageChanged(event: any) {
    this.pageNumber = event.first;
    this.pageSize = event.rows;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.pageNumber = 1;
    this.getPage();
  }
  delete(item: any) {
    this.selectedDepartment = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.farmService
      .delete(this.selectedDepartment.id)
      .subscribe((response: any) => {
        if (response.success) {
          this.successMesg = 'تم حذف المزرعة بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
        }
      });
  }

  close() {
    this.showAddMonyForm = false;
    this.showDeductMonyForm = false;
    this.showConfirmDeleteDialog = false;
    this.showWarnningDialog = false;
  }
  backToList() {
    this.showAddMonyForm = false;
    this.showDeductMonyForm = false;
    this.showSuccessDialog = false;
    this.getPage();
  }
  back() {
    this.showWarnningDialog = false;
  }
}
