import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dropdown } from 'src/app/Shared/Models/dropdown';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { EmployeeService } from '../../Services/employee.service';
import { Qualifications } from '../../Models/qualification';
import { DurationUnitEnum } from 'src/app/Shared/Enums/duration-unit';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
})
export class QualificationsComponent {
  form!: FormGroup;
  qualificationTypeOptions: Dropdown[] = [
    { id: 1, name: 'متوسط ' },
    { id: 2, name: 'فوق متوسط' },
    { id: 3, name: 'بكالوريوس او ليسانس' },
    { id: 4, name: 'ماجستير' },
    { id: 5, name: 'دكتوراه' },
  ];
  listColumns: ListColumn[] = [];
  pageResult: PageResult = {
    items: [],
    totalCount: 0,
  };
  editMode: boolean = false;
  currentIndex!: number;
  currentData!: Qualifications[];
  durationUnit = DurationUnitEnum;
  constructor(private employeeService: EmployeeService) {}
  async ngOnInit() {
    this.createForm();
    this.intializeListCoulmns();
    this.currentData = await this.employeeService.qualifications.getValue();
    if (this.currentData) {
      this.pageResult.items = this.currentData;
    }
  }
  async ngOnChanges(changes: any) {
    this.createForm();
    this.currentData = await this.employeeService.qualifications.getValue();
    if (this.currentData) {
      this.pageResult.items = this.currentData;
    }
  }
  intializeListCoulmns() {
    this.listColumns = [
      new ListColumn({
        field: 'typeName',
        hide: false,
        header: 'نوع المؤهل',
      }),
      new ListColumn({
        field: 'name',
        hide: false,
        header: 'مسمى المؤهل',
      }),
      new ListColumn({
        field: 'major',
        hide: false,
        header: 'التخصص',
      }),
      new ListColumn({
        field: 'grade',
        hide: false,
        header: 'الدرجة',
      }),
      new ListColumn({
        field: 'totalDuration',
        hide: false,
        header: 'المدة',
      }),
      new ListColumn({
        field: 'year',
        hide: false,
        header: 'سنة الحصول',
        isDate: true,
      }),
      new ListColumn({
        field: 'authority',
        hide: false,
        header: 'الجهة',
      }),
      new ListColumn({
        field: 'institution',
        hide: false,
        header: 'الجامعة / المعهد',
      }),
    ];
  }
  createForm() {
    this.form = new FormGroup({
       id: new FormControl(0),
      employeeId: new FormControl(0),
      typeId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      major: new FormControl(null, Validators.required),
      grade: new FormControl(null),
      year: new FormControl(null, Validators.required),
      duration: new FormControl(null),
      durationTypeId: new FormControl(this.durationUnit.Year),
      authority: new FormControl(null),
      institution: new FormControl(null),
    });
  }
  setDurationUnit(unit: any) {
    this.form.get('durationTypeId')?.setValue(unit.value);
  }
  onEdit(obj: any) {
    this.currentIndex = obj.index;
    this.editMode = true;
    this.form.patchValue({ ...obj.item });
  }
  onSave() {
    if (this.form.valid) {
      let unit;
      if (this.form.value?.duration) {
        if (this.form.value.durationTypeId == this.durationUnit.Month) {
          unit = this.form.value?.duration > 10 || this.form.value?.duration < 3 ? 'شهر' : 'شهور';
        } else {
          unit = this.form.value?.duration > 10 || this.form.value?.duration < 3  ? 'سنة' : 'سنين';
        }
      }
      let body = {
        ...this.form.value,
        totalDuration: this.form.value?.duration
          ? this.form.value?.duration + ' ' + unit
          : '',
        typeName: this.qualificationTypeOptions.find(
          (item: Dropdown) => item.id == this.form.value.typeId
        )?.name,
      };

      if (this.editMode) {
        this.pageResult.items?.splice(this.currentIndex, 1, body);
        this.employeeService.setQualifications(this.pageResult.items ?? []);
        this.form.reset();
        this.editMode = false;
      } else {
        this.pageResult.items?.push(body);
        this.employeeService.setQualifications(this.pageResult.items ?? []);
        this.form.reset();
      }
    }
  }

  onDelete(item: any) {
    this.pageResult.items?.splice(item.index, 1);
  }
}
