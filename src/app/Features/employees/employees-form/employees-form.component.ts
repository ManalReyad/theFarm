import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Qualifications } from '../Models/qualification';
import { EmployementRecord } from '../Models/employement-record';
import { EmploymentData } from '../Models/employment-data';
import { DurationUnitEnum } from 'src/app/Shared/Enums/duration-unit';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss'],
})
export class EmployeesFormComponent implements OnInit {
  pages: any = [{ name: ' تسجيل بيانات موظف ' }];
  currentIndexActive: number = 0;
  stepOneCompleted: boolean = false;
  editMode: boolean = false;
  currentEmployeeId!: number;
  qualifications: Qualifications[] = [];
  employementRecord: EmployementRecord[] = [];
  employmentData!: EmploymentData;
  successMsg: string = '';
  showSuccessDialog: boolean = false;
  showWarnrningDialog: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentEmployeeId = this.activatedRoute.snapshot.params['id'];
    if (this.currentEmployeeId) {
      this.editMode = true;
      this.getEmployeeById(this.currentEmployeeId);
    }
  }

  onEmployeeDataClicked(currentIndex: number) {
    this.currentIndexActive = currentIndex;
  }
  onEmploymentRecordClicked(currentIndex: number) {
    this.currentIndexActive = currentIndex;
  }
  onQualificationsClicked(currentIndex: number) {
    this.currentIndexActive = currentIndex;
  }

  moveToNextTap() {
    if (this.currentIndexActive == 0) {
      this.currentIndexActive = 1;
    } else if (this.currentIndexActive == 1) {
      this.currentIndexActive = 2;
    }
  }
  setStatus(status: string) {
    this.stepOneCompleted = status == 'VALID';
  }

  getEmployeeById(id: number) {
    this.employeeService.getById(id).subscribe((response: any) => {
      if (response.isSuccess) {
        this.employmentData = this.mapResponseToEmploymentData(response.data);
        response.data.jobs.forEach((element: any) => {
          element.employmentDate = new Date(element.employmentDate);
        });
        response.data.qualifications.forEach((element: any) => {
          
          if (element?.duration) {
            let unit;
            let  durationUnit=DurationUnitEnum
            if (element.durationTypeId == durationUnit.Month) {
              unit = element?.duration > 10 || element?.duration < 3 ? 'شهر' : 'شهور';
            } else {
              unit = element?.duration > 10 || element?.duration < 3  ? 'سنة' : 'سنين';
            }

            element.totalDuration=element.duration +' ' + unit
          }
          element.year = new Date(element.year);
        });
        this.qualifications = [...response.data.qualifications];
        this.employementRecord = [...response.data.jobs];
        this.employeeService.setEmploymentData(this.employmentData);
        this.employeeService.setEmploymentRecords(this.employementRecord);
        this.employeeService.setQualifications(this.qualifications);
      }
    });
  }
  mapResponseToEmploymentData(data: any) {
    data.birthDate =new Date(data.birthDate)
    data.countryJoiningDate=new Date(data.countryJoiningDate)
    data.releaseDate=new Date(data.releaseDate)
    data.municipalityJoiningDate=new Date(data.municipalityJoiningDate)
    return {
      firstName: data?.firstName,
      secondName: data?.secondName,
      thirdName: data?.thirdName,
      forthName: data?.forthName,
      genderId: data?.genderId,
      birthDate: data?.birthDate,
      nationalityId: data?.nationalityId,
      maritalStatusId: data?.maritalStatusId,
      religionId: data?.religionId,
      phone: data?.phone,
      mobile: data?.mobile,
      fileId: data?.fileId,
      employeeTypeId: data?.employeeTypeId,
      currentStatusId: data?.currentStatusId,
      birthPlace: data?.birthPlace,
      nationalAddress: data?.nationalAddress,
      zipcode: data?.zipcode,
      countryJoiningDate: data?.countryJoiningDate,
      recordId: data?.recordId,
      nationalId: data?.nationalId,
      releaseDate: data?.releaseDate,
      releasePlace: data?.releasePlace,
      municipalityJoiningDate: data?.municipalityJoiningDate,
      retirementDate: data?.retirementDate,
    };
  }
  save() {
    let employeeData = this.employeeService.employmentData.getValue();
    let employmentRecords = this.employeeService.employmentRecords.getValue();
    let qualifications = this.employeeService.qualifications.getValue();
    let body = {
      ...employeeData,
      qualifications: qualifications,
      jobs: employmentRecords,
      id: this.currentEmployeeId ? this.currentEmployeeId : 0,
    };
    if (this.editMode) {
      this.employeeService.update(body).subscribe((response: any) => {
        if (response.isSuccess) {
          this.editMode = false;
          this.successMsg = 'تم تعديل بيانات الموظف بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
        }
      });
    } else {
      this.employeeService.create(body).subscribe((response: any) => {
        if (response.isSuccess) {
          this.successMsg =
            'تمت إضافة الموظف بنجاح إلى قائمةالموظفين، يمكنك المتابعة';
          this.showSuccessDialog = true;
        }
      });
    }
  }

  backToList() {
    this.showSuccessDialog = false;
    this.router.navigate(['employees']);
  }

  exit() {
    this.showWarnrningDialog = true;
  }
  close() {
    this.showWarnrningDialog = false;
  }
}
