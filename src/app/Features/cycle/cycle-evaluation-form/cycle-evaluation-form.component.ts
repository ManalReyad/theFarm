import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluationItemsService } from '../../evaluation/evaluation-items.service';
import { CycleEvaluationService } from '../cycle-evaluation.service';

@Component({
  selector: 'app-cycle-evaluation-form',
  templateUrl: './cycle-evaluation-form.component.html',
  styleUrl: './cycle-evaluation-form.component.scss',
})
export class CycleEvaluationFormComponent {
  pages: any = [];
  form!: FormGroup;
  editMode: boolean = false;
  successMesg: string = '';
  showSuccessDialog: boolean = false;
  roomOptions: { id: number; name: string }[] = [];
  farmId: any;
  evaluationItemsOptions: { id: number; name: string }[] = [];
  cycleOptions: { id: number; name: string }[] = [];
  currentScoreIndex: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cycleEvaluationService: CycleEvaluationService,
    private evaluationItemsService: EvaluationItemsService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    let cycleId = this.activatedRoute.snapshot.params['id'];
    let cycleName = this.activatedRoute.snapshot.queryParams['name'];
    this.cycleOptions=[{id:cycleId,name:cycleName}]
    this.pages= [
      { name: 'الدورات', route: '/cycle' },
      { name: 'التقييمات', route: '/cycle/evaluations/'+cycleId },
      { name: 'تسجيل بيانات التقييم' },
    ];
    this.createForm();
    this.getDropdowns();
    this.form.get('cycleId')?.setValue(cycleId)

  }

  getDropdowns() {
    this.evaluationItemsService.getAll().subscribe((data: any) => {
      this.evaluationItemsOptions = data || [];
    });
  }
  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      cycleId: new FormControl(null),
      scores: this.fb.array([
        this.fb.group({
          evaluationItemId: [null, Validators.required],
          score: [null, Validators.required],
        }),
      ]),
    });
  }

  get Scores(): FormArray {
    return this.form.get('scores') as FormArray;
  }
  addScoreRow() {
    this.Scores.push(
      this.fb.group({
        evaluationItemId: [0],
        score: [0],
      })
    );
  }
  deleteScoreRow(index: number) {
    this.Scores.removeAt(index);
  }
  getAvailableEvaluationItems(index: number) {
    const selectedBeforeCurrent = this.Scores.controls
      .map((c: any, i: any) =>
        i !== index ? c.get('evaluationItemId')?.value : null
      )
      .filter((v: any) => v !== null && v !== undefined);

    return this.evaluationItemsOptions.filter(
      (opt) => !selectedBeforeCurrent.includes(opt.id)
    );
  }

  isCurrentScoreRowInvalid(): boolean {
    const row = this.Scores.at(this.currentScoreIndex);

    if (row) {
      const evaluationItemId = row.get('evaluationItemId')?.value;
      const score = row.get('score')?.value;

      return !evaluationItemId || score === null || score === undefined;
    }

    return false;
  }
  save() {
    this.form.patchValue({ ...this.form.value, farmId: +this.farmId });
    if (this.editMode) {
      this.cycleEvaluationService
        .update(this.form.value)
        .subscribe((response: any) => {
          this.successMesg = 'تم تعديل بيانات التقييم بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
        });
    } else {
      this.cycleEvaluationService
        .create(this.form.value)
        .subscribe((response: any) => {
          this.successMesg = 'تمت إضافة التقييم بنجاح ، يمكنك المتابعة';
          this.showSuccessDialog = true;
        });
    }
  }
  restrictNagtive(event: KeyboardEvent) {
    if (
      event.key === '-' ||
      event.key === '+' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }
  backToList() {
    window.history.back();
  }
}
