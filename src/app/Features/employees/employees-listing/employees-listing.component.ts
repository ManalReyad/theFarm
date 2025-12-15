import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EmployeeService } from '../Services/employee.service';
import { FilterDataParams } from 'src/app/Shared/Models/filterDataParam';
import { JobService } from '../Services/job.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { Dropdown } from 'src/app/Shared/Models/dropdown';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-employees-listing',
  templateUrl: './employees-listing.component.html',
  styleUrls: ['./employees-listing.component.scss'],
})
export class EmployeesListingComponent implements OnInit {
  columns: ListColumn[] = [];
  pageResult!: PageResult;
  filteredDate = new FilterDataParams();
  jobFilteredDate = new FilterDataParams();
  selectedEmployee: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showFilterDialog: boolean = false;
  departmentsOptions: Dropdown[] = [];
  jobsOptions: Dropdown[] = [];
  ranksOptions: Dropdown[] = [];
  gradesOptions: Dropdown[] = [];
  releasePlacesOptions: Dropdown[] = [];
  subscription!: Subscription;
  maxResultCount: number = 10;
  skipCount: number = 0;
  filterMode: boolean = false;
  searchMode: boolean = false;
  searchReset: boolean = false;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private JobService: JobService,
    private lookupService: LookupService
  ) {}
  ngOnInit(): void {
    this.intializeListCoulmns();
    this.getFilterDropdowns();
    this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: '',
        hide: false,
        header: '#',
        isIndex: true,
        width: 5,
      }),
      new ListColumn({
        field: 'fileId',
        hide: false,
        header: 'رقم الملف',
      }),
      new ListColumn({
        field: 'fullName',
        hide: false,
        header: 'الاسم',
        toolTip:'toolTip'
      }),
      new ListColumn({
        field: 'employeeTypeName',
        hide: false,
        header: 'النوع',
      }),
      new ListColumn({
        field: 'currentStatusName',
        hide: false,
        header: 'الوضع الراهن',
      }),
      new ListColumn({
        field: 'countryJoiningDate',
        hide: false,
        header: 'تاريخ الالتحاق بالدولة',
        isDate: true,
      }),
      new ListColumn({
        field: 'phone',
        hide: false,
        header: 'الهاتف',
      }),
    ];
  }
  addNew() {
    this.employeeService.setEmploymentData({});
    this.employeeService.setEmploymentRecords([]);
    this.employeeService.setQualifications([]);
    this.router.navigate(['employees/create']);
  }
  openFilter() {
    this.showFilterDialog = true;
    this.filterMode = true;
  }
  reset() {
    this.filteredDate.skipCount = 0;
    this.filteredDate.maxResultCount = this.maxResultCount;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.filteredDate.skipCount = 0;
    this.filteredDate.searchTerm = '';
    this.searchMode = false;
    this.filteredDate.maxResultCount = this.maxResultCount;
    this.getPage();
  }
  closeFilter() {
    this.showFilterDialog = false;
  }
  getFilterDropdowns() {
    this.jobFilteredDate.fullResult = true;
    let departments = this.lookupService.GetAllDepartments();
    let ranks = this.JobService.getRanks();
    let grades = this.JobService.getGrades();
    let releasePlaces = this.employeeService.getReleasePlaces();
    let sources: Observable<any>[] = [];
    sources.push(departments);
    sources.push(ranks);
    sources.push(grades);
    sources.push(releasePlaces);

    this.subscription = forkJoin(sources).subscribe((response: any) => {
      this.departmentsOptions = response[0]?.data.map((item: any) => {
        return { id: item.id, name: item.name };
      });
      this.ranksOptions = response[1]?.data.map((item: any) => {
        return { id: item, name: item };
      });
      this.gradesOptions = response[2]?.data.map((item: any) => {
        return { id: item, name: item };
      });
      this.releasePlacesOptions = response[3]?.data.map((item: any) => {
        return { id: item, name: item };
      });
    });
  }
  getPage() {
    this.employeeService
      .getAll(this.filteredDate)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          response.data?.items.forEach((element: any) => {
            element.toolTip =
              element.firstName +
              ' ' +
              element.secondName +
              ' ' +
              element.thirdName +
              ' ' +
              element.forthName;
              element.fullName = this.shortString(element.toolTip);
          });
          this.filterMode = false;
          this.pageResult = response.data;
        }
      });
  }
  setFilterdData(data: any) {
    data?.items.forEach((element: any) => {
      element.fullName =
        element.firstName +
        ' ' +
        element.secondName +
        ' ' +
        element.thirdName +
        ' ' +
        element.forthName;

      element.fullName = this.shortString(element.fullName);
    });
    this.pageResult = data;
  }
  shortString(str: string) {
    if (str.length > 40) {
      let newStr = str.substring(0, 40) + '..';
      return newStr;
    }

    return str;
  }
  onPageChanged(event: any) {
    this.filteredDate.skipCount = event.first;
    this.filteredDate.maxResultCount = event.rows;
    this.maxResultCount = event.rows;
    this.skipCount = event.first;
    this.getPage();
  }
  search(value: string) {
    if (value) {
      this.searchMode = true;
    } else {
      this.searchMode = false;
    }
    this.filteredDate.searchTerm = value;
    this.getPage();
  }
  edit(object: any) {
    this.router.navigate(['employees/update/' + object.item.id]);
  }
  delete(item: any) {
    this.selectedEmployee = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.employeeService
      .delete(this.selectedEmployee.id)
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
        }
      });
  }

  close() {
    this.showConfirmDeleteDialog = false;
  }
  backToList() {
    this.showSuccessDialog = false;
    this.getPage();
  }
}
