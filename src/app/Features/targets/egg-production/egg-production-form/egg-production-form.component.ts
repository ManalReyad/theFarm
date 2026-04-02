import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { EggProductionService } from '../../egg-production.service';

@Component({
  selector: 'app-egg-production-form',
  templateUrl: './egg-production-form.component.html',
  styleUrl: './egg-production-form.component.scss'
})
export class EggProductionFormComponent {
  pages = [
    { name: 'مستهدف إستهلاك البيض', route: '/targets/mortality' },
    { name: 'تسجيل مستهدف إستهلاك البيض' },
  ];

  form!: FormGroup;
  editMode = false;
  successMesg = '';
  showSuccessDialog = false;
  currentWeekIndex = 0;
  breadsOptions: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eggProductionService: EggProductionService,
    private lookupService: LookupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.editMode = true;
      this.pages = [
        { name: 'مستهدف إستهلاك البيض', route: '/targets/egg' },
        { name: 'تعديل مستهدف إستهلاك البيض' },
      ];
      this.getById(id);
    }

    this.createForm();
    this.loadDropdowns();
  }


  createForm() {
    this.form = this.fb.group({
      breedId: [null, Validators.required],
      weeks: this.fb.array([this.createWeekGroup()]),
    });
  }

  createWeekGroup(): FormGroup {
    return this.fb.group({
      weekStart: [null, Validators.required],
      weekEnd: [null, Validators.required],
      targetEggPerBird: [null, Validators.required],
    });
  }

  get weeks(): FormArray {
    return this.form.get('weeks') as FormArray;
  }

  loadDropdowns() {
    this.lookupService.getBreeds().subscribe((res: any) => {
      this.breadsOptions = res || [];
    });
  }

  getById(id: any) {
    // this.eggProductionService.getById(id).subscribe((res: any) => {
    //   this.form.patchValue({
    //     breedId: res.breedId,
    //   });
    //   this.weeks.clear();
    //   res.weeks.forEach((w: any) => {
    //     this.weeks.push(
    //       this.fb.group({
    //         weekStart: w.weekStart,
    //         weekEnd: w.weekEnd,
    //         targetEggPerBird: w.targetEggPerBird,
    //       })
    //     );
    //   });
    // });
  }

  isCurrentRowInvalid(): boolean {
    const row = this.weeks.at(this.currentWeekIndex);
    if (!row) return false;
  
    const weekStart = row.get('weekStart')?.value;
    const weekEnd = row.get('weekEnd')?.value;
    const targetEggPerBird = row.get('targetEggPerBird')?.value;
  
    return (
      weekStart === null ||
      weekStart === undefined ||
      weekEnd === null ||
      weekEnd === undefined ||
      targetEggPerBird === null ||
      targetEggPerBird === undefined
    );
  }
  addRow() {
    this.weeks.push(this.createWeekGroup());
    this.currentWeekIndex = this.weeks.length - 1;
  }
  deleteRow(index: number) {
    if (this.weeks.length > 1) {
      this.weeks.removeAt(index);
      this.currentWeekIndex = this.weeks.length - 1;
    }
  }
  save() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.editMode) {
      // update
    } else {
      this.eggProductionService.create(payload).subscribe(() => {
        this.successMesg = 'تم إضافة مستهدف إستهلاك البيض بنجاح';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/targets/egg']);
  }
}
