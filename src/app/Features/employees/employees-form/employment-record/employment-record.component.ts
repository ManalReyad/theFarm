import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'src/app/Shared/Models/dropdown';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EmployeeService } from '../../Services/employee.service';
import { EmployementRecord } from '../../Models/employement-record';
import { LookupService } from 'src/app/Shared/Services/lookup.service';

@Component({
  selector: 'app-employment-record',
  templateUrl: './employment-record.component.html',
  styleUrls: ['./employment-record.component.scss'],
})
export class EmploymentRecordComponent implements OnInit, OnChanges {
  departmentsOptions: Dropdown[] = [];
  form!: FormGroup;
  pageResult: PageResult = {
    items:[],
    totalCount: 0,
  };
  listColumns!: ListColumn[];
  currentData!: EmployementRecord[];
  currentIndex!:number
  @Output() stepCompleted: EventEmitter<string> = new EventEmitter();
  editMode: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private lookupService: LookupService
  ) {}
  async ngOnInit() {
    this.getDepartmentsDropdown();
    this.createForm();
    this.intializeListCoulmns()
    this.currentData = await this.employeeService.employmentRecords.getValue();
    if (this.currentData) {
      this.pageResult.items=this.currentData
    }    
  }
  async ngOnChanges(changes: any) {
    this.createForm();
    this.currentData = await this.employeeService.employmentRecords.getValue();
    if (this.currentData) {
      this.pageResult.items=this.currentData
    }
  }
  intializeListCoulmns() {
    this.listColumns = [
      new ListColumn({
        field: 'departmentName',
        hide: false,
        header: 'جهة العمل',
      }),
      new ListColumn({
        field: 'name',
        hide: false,
        header: 'الوظيفة',
      }),
      new ListColumn({
        field: 'number',
        hide: false,
        header: 'رقم الوظيفة',
      }),
      new ListColumn({
        field: 'code',
        hide: false,
        header: 'رمز الوظيفة',
      }),
      new ListColumn({
        field: 'employmentDate',
        hide: false,
        header: 'تاريخ التعيين',
        isDate: true,
      }),
      new ListColumn({
        field: 'rank',
        hide: false,
        header: 'المرتبة',
      }),
      new ListColumn({
        field: 'grade',
        hide: false,
        header: 'الدرجة',
      }),
      new ListColumn({
        field: 'netSalary',
        hide: false,
        header: 'الراتب الأساسي',
      }),
      new ListColumn({
        field: 'transferAllowance',
        hide: false,
        header: 'بدل النقل',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(0),
      employeeId: new FormControl(0),
      departmentId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      rank: new FormControl(null, Validators.required),
      grade: new FormControl(null),
      employmentDate: new FormControl(null, Validators.required),
      netSalary: new FormControl(),
      transferAllowance: new FormControl(),
      totalOtherAllowances: new FormControl(null, Validators.required),
    });
    this.form.statusChanges.subscribe((status) => {
      this.stepCompleted.emit(status);
    });
  }

  getDepartmentsDropdown() {
    this.lookupService.GetAllDepartments().subscribe((response: any) => {
      if (response.isSuccess) {
        this.departmentsOptions = response.data;
      }
    });
  }
onEdit(object:any)
{
  console.log(object.item);
  
this.currentIndex=object.index;
this.editMode=true;
this.form.patchValue({...object.item})
}
  onSave() {
    if (this.form.valid) {
      if (this.editMode) {
        let body = {
          ...this.form.value,
          departmentName: this.departmentsOptions.find(
            (item: Dropdown) => item.id == this.form.value.departmentId
          )?.name,
        };
        this.intializeListCoulmns()
        this.pageResult.items?.splice(this.currentIndex,1,body);
        this.employeeService.setEmploymentRecords(this.pageResult.items??[])
        this.form.reset()
        this.editMode=false
        
      } else {
        let body = {
          ...this.form.value,
          departmentName: this.departmentsOptions.find(
            (item: Dropdown) => item.id == this.form.value.departmentId
          )?.name,
        };
        this.intializeListCoulmns()
        this.pageResult.items?.push(body);
        this.employeeService.setEmploymentRecords(this.pageResult.items??[])
        this.form.reset()
      }
    }
  }

  onDelete(item: any) {
    this.pageResult.items?.splice(item.index,1)
    this.employeeService.setEmploymentRecords(this.pageResult.items??[])
  }
}
