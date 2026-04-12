import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { EggProductionReportsService } from '../egg-production-reports.service';

@Component({
  selector: 'app-egg-production-report',
  templateUrl: './egg-production-report.component.html',
  styleUrl: './egg-production-report.component.scss'
})
export class EggProductionReportComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  searchMode: boolean = false;
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchReset: boolean = false;
  farmId: any;
  cycleOptions: { id: number; name: string }[] = [];
  form!: FormGroup;
  constructor(
    private eggProductionReportsService: EggProductionReportsService,
    private lookupService: LookupService
  ) {}
  ngOnInit(): void {
    this.farmId = Number(localStorage.getItem('farmId'));
    this.form = new FormGroup({
      cycleId: new FormControl(null),
    });
    this.intializeListCoulmns();
    this.getDropdown();
    //   this.getPage();
  }
  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: 'chickAge',
        header: 'اليوم',
      }),
      new ListColumn({
        field: 'brokenCartons',
        header: 'الانتاج الفعلي كسر (طبق)',
      }),
      new ListColumn({
        field: 'doubleCartons',
        header: 'الانتاج الفعلي دبل (طبق)',
      }),
      new ListColumn({
        field: 'normalCartons',
        header: 'الانتاج الفعلي سليم (طبق)',
      }),
      new ListColumn({
        field: 'totalActualCartons',
        header: 'اجمالي الانتاج الفعلي (طبق)',
      }),
      new ListColumn({
        field: 'targetCartons',
        header: 'الانتاج المستهدف (طبق)',
      }),
      new ListColumn({
        field: 'actualPercent',
        header: 'الانتاج الفعلي %',
      }),
      new ListColumn({
        field: 'targetPercent',
        header: 'الانتاج المستهدف %',
      }),
      new ListColumn({
        field: 'achievementPercent',
        header: 'التحقيق %',
      }),
      new ListColumn({
        field: 'targetPerBird',
        header: 'متوسط انتاج البيض المستهدف / الطائر (بيضة)',
      }),
      new ListColumn({
        field: 'actualPerBird',
        header: 'متوسط انتاج البيض الفعلي / الطائر (بيضة)',
      }),
      new ListColumn({
        field: 'achievementPerBird',
        header: 'التحقيق %',
      }),
      new ListColumn({
        field: 'cumulativeActual',
        header: 'تراكمي الانتاج الفعلي (طبق)',
      }),
      new ListColumn({
        field: 'cumulativeTarget',
        header: 'تراكمي الانتاج المستهدف (طبق)',
      }),
      new ListColumn({
        field: 'cumulativeAchievement',
        header: 'التحقيق % تراكمي',
      }),
    ];
  }
  getDropdown() {
    this.lookupService
      .getActiveCycles(this.farmId)
      .subscribe((response: any) => {
        this.cycleOptions =
          response?.length > 0
            ? response.map((item: any) => {
                return { id: item.id, name: item.cycleName };
              })
            : [];
        if (this.cycleOptions.length > 0) {
          this.form.get('cycleId')?.setValue(this.cycleOptions[0]?.id);
          this.getPage();
        }
      });
  }
  getPage() {
    this.eggProductionReportsService
      .getEggProductionReport(
        this.maxResultCount,
        this.skipCount,
        this.form.value.cycleId
      )
      .subscribe((response: any) => {
        this.pageResult.items = response.items;
        this.pageResult.records = response.totalCount;
      });
  }
  onPageChanged(event: any) {
    this.maxResultCount = event.rows;
    this.skipCount = event.first;
    this.getPage();
  }
  resetSearch() {
    this.searchReset = true;
    this.searchMode = false;
    this.skipCount = 0;
    this.getPage();
  }
}
