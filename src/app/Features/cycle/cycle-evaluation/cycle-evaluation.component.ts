import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { CycleEvaluationService } from '../cycle-evaluation.service';

@Component({
  selector: 'app-cycle-evaluation',
  templateUrl: './cycle-evaluation.component.html',
  styleUrl: './cycle-evaluation.component.scss'
})
export class CycleEvaluationComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;
  successMesg: string = '';
  showWarnningDialog: boolean = false;
  searchMode: boolean = false;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchReset: boolean = false;
  cycleId:any;
  cycleName:string=''
  pages: any = [
    { name: 'الدورات', route: '/cycle' },
    { name: 'التقييمات' },
  ];
  constructor(
    private cycleEvaluationService: CycleEvaluationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
     this.cycleId = this.activatedRoute.snapshot.params['id'];
      this.cycleName = this.activatedRoute.snapshot.queryParams['name'];

    this.intializeListCoulmns();
    this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: '',
        hide: false,
        header: '#',
        width: 5,
        isIndex: true,
      }),
      new ListColumn({
        field: 'name',
        hide: false,
        header: 'الاسم',
      }),
      new ListColumn({
        field: 'barnName',
        hide: false,
        header: 'العنبر',
      }),
      new ListColumn({
        field: 'startDate',
        hide: false,
        header: 'تاريخ البداية',
        isDate: true,
      }),
      new ListColumn({
        field: 'endDate',
        hide: false,
        header: 'تاريخ النهاية',
        isDate: true,
      }),
      new ListColumn({
        field: 'chickCount',
        hide: false,
        header: 'عدد الفراخ',
      }),
      new ListColumn({
        field: 'chickAge',
        hide: false,
        header: 'عمر الفراخ',
      }),
    ];
  }
  getPage() {
    this.cycleEvaluationService
      .getAllByCycle(2)
      .subscribe((response: any) => {
        this.pageResult.items = response;
      });
  }
  onPageChanged(event: any) {
    this.pageNumber = event.first;
    this.pageSize = event.rows;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.pageNumber = 1;
    this.getPage();
  }
  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  submitDelete() {
    this.cycleEvaluationService
      .delete(this.selectedItem.id)
      .subscribe((response: any) => {
                this.successMesg = 'تم حذف الدورة بنجاح، يمكنك المتابعة';
          this.showSuccessDialog = true;
          this.showConfirmDeleteDialog = false;
      });
  }
  addNew() {
    this.router.navigate(['/cycle/evaluation/create/' +this.cycleId], {
      queryParams: { name: this.cycleName },
    });
  }
  close() {
    this.showForm = false;
    this.showConfirmDeleteDialog = false;
    this.showWarnningDialog = false;
  }
  backToList() {
    this.showForm = false;
    this.showSuccessDialog = false;
    this.getPage();
  }
  back() {
    this.showWarnningDialog = false;
  }
}
