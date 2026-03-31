import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { MortalityTargetService } from '../../mortality-target.service';

@Component({
  selector: 'app-mortality-target-form',
  templateUrl: './mortality-target-form.component.html',
  styleUrl: './mortality-target-form.component.scss'
})
export class MortalityTargetFormComponent implements OnInit {
  pages = [
    { name: 'مستهدف النافق', route: '/targets/mortality' },
    { name: 'تسجيل مستهدف النافق' },
  ];

  form!: FormGroup;
  editMode = false;
  successMesg = '';
  showSuccessDialog = false;

  breadsOptions: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mortalityTargetService: MortalityTargetService,
    private lookupService: LookupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.editMode = true;
      this.pages = [
        { name: 'مستهدف النافق', route: '/targets/mortality' },
        { name: 'تعديل مستهدف النافق' },
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
    // this.mortalityTargetService.getById(id).subscribe((res: any) => {
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
      this.mortalityTargetService.create(payload).subscribe(() => {
        this.successMesg = 'تم إضافة مستهدف النافق بنجاح';
        this.showSuccessDialog = true;
      });
    }
  }

  backToList() {
    this.router.navigate(['/targets/mortality']);
  }
}