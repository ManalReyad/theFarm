import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'src/app/Shared/Models/dropdown';
import { EmployeeService } from '../../Services/employee.service';
import { EmploymentData } from '../../Models/employment-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
})
export class EmployeeDataComponent implements OnInit ,OnChanges{
  form!: FormGroup;
 
  employmentTypesOptions: Dropdown[] = [
    { id: 1, name: 'موظف' },
    { id: 2, name: 'بند أجور' },
  ];
  currentStatusOptions: Dropdown[] = [
    { id: 1, name: 'فى الخدمة' },
    { id: 2, name: 'خارج الخدمة' },
  ];
  genderOptions: Dropdown[] = [
    { id: 1, name: 'ذكر' },
    { id: 2, name: 'أنثي' },
  ];
  nationalityOptions: Dropdown[] = [
    { id: 1, name: 'سعودى' },
    { id: 2, name: 'مصرى' },
    { id: 3, name: 'هندى' },
  ];
  maritalStatusOptions: Dropdown[] = [
    { id: 1, name: 'أعزب' },
    { id: 2, name: 'متزوج' },
  ];
  religionOptions: Dropdown[] = [
    { id: 1, name: 'الاسلام' },
    { id: 2, name: 'المسيحية' },
    { id: 2, name: 'اليهودية' },
  ];
  
 @Input() currentData!:EmploymentData;
  @Output() stepCompleted:EventEmitter<string>=new EventEmitter()
  constructor(private employeeService:EmployeeService,private datePipe:DatePipe) {}

  async ngOnInit() {
    this.createForm();
    this.currentData = await this.employeeService.employmentData.getValue();
    if (this.currentData) {
      this.form.patchValue({ ...this.currentData });
    }    
  }
  async ngOnChanges(changes: any){
    this.createForm();
    this.currentData = await this.employeeService.employmentData.getValue();
    if (this.currentData) {
      this.form.patchValue({ ...this.currentData });
    }
  }
  createForm() {
    this.form = new FormGroup({
      fileId: new FormControl(null, Validators.required),
      employeeTypeId: new FormControl(null, Validators.required),
      genderId: new FormControl(null, Validators.required),
      currentStatusId: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      secondName: new FormControl(null, Validators.required),
      thirdName: new FormControl(null, Validators.required),
      forthName: new FormControl(null, Validators.required),
      birthPlace: new FormControl(null),
      nationalityId: new FormControl(null,Validators.required),
      birthDate: new FormControl(null,Validators.required),
      maritalStatusId: new FormControl(null,Validators.required),
      religionId: new FormControl(null,Validators.required),
      phone: new FormControl(null,Validators.required),
      mobile: new FormControl(null,Validators.required),
      zipcode: new FormControl(null),
      nationalAddress: new FormControl(null),
      recordId: new FormControl(null,Validators.required),
      nationalId: new FormControl(null,Validators.required),
      releaseDate: new FormControl(null,Validators.required),
      releasePlace: new FormControl(null,Validators.required),
      municipalityJoiningDate: new FormControl(null,Validators.required),
      countryJoiningDate: new FormControl(null,Validators.required),
      retirementDate: new FormControl(null),
    });

    this.form.statusChanges.subscribe((status) => {
      this.stepCompleted.emit(status);
    });
    this.form.valueChanges.subscribe((data) => {
      this.employeeService.setEmploymentData(data);
    });
  }
}
