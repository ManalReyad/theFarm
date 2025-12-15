import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dropdown } from 'src/app/Shared/Models/dropdown';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() exit = new EventEmitter();
  toggeledCollapse: string = 'jobFile';
  filterForm!: FormGroup;

  @Input() departmentsOptions: Dropdown[] = [];
  @Input() ranksOptions: Dropdown[] = [];
  @Input() gradesOptions: Dropdown[] = [];
  @Input() releasePlacesOptions: Dropdown[] = [];
  @Output() filteredData: EventEmitter<any> = new EventEmitter();
  employmentTypesOptions: Dropdown[] = [];
  SortingDirectionOptions: Dropdown[] = [];
  currentStatusOptions: Dropdown[] = [];
  genderOptions: Dropdown[] = [];
  nationalityOptions: Dropdown[] = [];
  sortByOptions: Dropdown[] = [];
  @Input() skipCount: number = 0;
  @Input() maxResultCount: number = 10;
  constructor(
    private sharedService: SharedService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.currentOpencollaps();
    this.initializeDropdowns()
    this.createForm();
  }

  createForm() {
    this.filterForm = new FormGroup({
      maxResultCount: new FormControl(this.maxResultCount),
      skipCount: new FormControl(this.skipCount),
      fileId: new FormControl(null),
      sortBy: new FormControl(null),
      sortingDirection: new FormControl('ASC'),
      firstName: new FormControl(null),
      secondName: new FormControl(null),
      thirdName: new FormControl(null),
      forthName: new FormControl(null),
      employeeTypeIds: new FormControl(null),
      currentStatusIds: new FormControl(null),
      nationalityIds: new FormControl(null),
      genderIds: new FormControl(null),
      fromBirthDate: new FormControl(null),
      toBirthDate: new FormControl(null),
      recordId: new FormControl(null),
      nationalId: new FormControl(null),
      releasePlaces: new FormControl(null),
      fromReleaseDate: new FormControl(null),
      toReleaseDate: new FormControl(null),
      fromCountryJoiningDate: new FormControl(null),
      toCountryJoiningDate: new FormControl(null),
      fromRetirementDate: new FormControl(null),
      toRetirementDate: new FormControl(null),
      departmentIds: new FormControl(null),
      jobName: new FormControl(null),
      fromJobNumber: new FormControl(null),
      toJobNumber: new FormControl(null),
      ranks: new FormControl(null),
      grades: new FormControl(null),
      fromEmploymentDate: new FormControl(null),
      toEmploymentDate: new FormControl(null),
      fromNetSalary: new FormControl(null),
      toNetSalary: new FormControl(null),
      fromTransferAllowance: new FormControl(null),
      toTransferAllowance: new FormControl(null),
    });
  }
  reset() {
    this.filterForm.reset();
    this.filterForm.get('maxResultCount')?.setValue(this.maxResultCount);
    this.filterForm.get('skipCount')?.setValue(this.skipCount);
    this.filterForm.get('sortingDirection')?.setValue('ASC');
  }
  close() {
    this.exit.emit();
  }

  currentOpencollaps() {
    this.sharedService.openCollapseId.subscribe((collapseId) => {
      this.toggeledCollapse = collapseId;
    });
  }

  submitFilter() {
    this.employeeService
      .filter(this.filterForm.value)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.filteredData.emit(response.data);
          this.visible = false;
          this.exit.emit();
        }
      });
  }


  initializeDropdowns()
  {
    this.employmentTypesOptions= [
      { id: 1, name: 'موظف' },
      { id: 2, name: 'بند أجور' },
    ];
    this.SortingDirectionOptions= [
      {
        id: 'ASC',
        name: 'تصاعدياً',
      },
      {
        id: 'DESC',
        name: 'تنازلياً',
      },
    ];
    this.currentStatusOptions = [
      { id: 1, name: 'فى الخدمة' },
      { id: 2, name: 'خارج الخدمة' },
    ];
    this.genderOptions= [
      { id: 1, name: 'ذكر' },
      { id: 2, name: 'أنثي' },
    ];
    this.nationalityOptions= [
      { id: 1, name: 'سعودى' },
      { id: 2, name: 'مصرى' },
      { id: 3, name: 'هندى' },
    ];
    this.sortByOptions= [
      {
        id: 'FileId',
        name: 'رقم الملف',
      },
      {
        id: 'CurrentStatusId',
        name: 'الوضع الراهن',
      },
      {
        id: 'FirstName',
        name: 'الاسم',
      },
      {
        id: 'BirthDate',
        name: 'تاريخ الميلاد',
      },
     {
        id: 'ReleaseDate',
        name: 'تاريخ الإصدار',
      }, {
        id: 'ReleasePlace',
        name: 'مكان الإصدار',
      }, {
        id: 'MunicipalityJoiningDate',
        name: 'تاريخ الالتحاق بالبلدية',
      },
      {
        id: 'CountryJoiningDate',
        name: 'تاريخ الالتحاق بالدولة',
      },
      {
        id: 'RetirementDate',
        name: 'تاريخ إنهاء الخدمة',
      },
    ];
  }
}
