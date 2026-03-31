import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { FeedConsumptionSettingsService } from '../../feed-consumption-settings.service';

@Component({
  selector: 'app-feed-consumption-form',
  templateUrl: './feed-consumption-form.component.html',
  styleUrl: './feed-consumption-form.component.scss'
})
export class FeedConsumptionFormComponent {
  pages = [
    { name: 'مستهدف إستهلاك العلف', route: '/targets/mortality' },
    { name: 'تسجيل مستهدف إستهلاك العلف' },
  ];

  form!: FormGroup;
  editMode = false;
  successMesg = '';
  showSuccessDialog = false;

  breadsOptions: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private feedConsumptionSettingsService: FeedConsumptionSettingsService,
    private lookupService: LookupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.editMode = true;
      this.pages = [
        { name: 'مستهدف إستهلاك العلف', route: '/targets/mortality' },
        { name: 'تعديل مستهدف إستهلاك العلف' },
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
      expectedMortalityRate: [null, Validators.required],
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
    // this.feedConsumptionSettingsService.getById(id).subscribe((res: any) => {
    //   this.form.patchValue({
    //     breedId: res.breedId,
    //   });
    //   this.weeks.clear();
    //   res.weeks.forEach((w: any) => {
    //     this.weeks.push(
    //       this.fb.group({
    //         weekStart: w.weekStart,
    //         weekEnd: w.weekEnd,
    //         expectedMortalityRate: w.expectedMortalityRate,
    //       })
    //     );
    //   });
    // });
  }

  addRow() {
    this.weeks.push(this.createWeekGroup());
  }

  deleteRow(index: number) {
    if (this.weeks.length > 1) {
      this.weeks.removeAt(index);
    }
  }
  save() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.editMode) {
      // update
    } else {
      this.feedConsumptionSettingsService.create(payload).subscribe(() => {
        this.successMesg = 'تم إضافة مستهدف إستهلاك العلف بنجاح';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/targets/feed']);
  }
}
