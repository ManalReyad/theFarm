import { Component } from '@angular/core';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { FeedConsumptionSettingsService } from '../../targets/feed-consumption-settings.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-feed-consumption-report',
  templateUrl: './feed-consumption-report.component.html',
  styleUrl: './feed-consumption-report.component.scss',
})
export class FeedConsumptionReportComponent {
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
    private feedConsumptionSettingsService: FeedConsumptionSettingsService,
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
        field: 'targetFeedPerBirdGram',
        header: 'استهلاك العلف المستهدف لكل طائر (جرام)',
      }),
      new ListColumn({
        field: 'actualFeedPerBirdGram',
        header: 'استهلاك العلف الفعلي لكل طائر (جرام)',
      }),
      new ListColumn({
        field: 'achievementPerBirdPercent',
        header: 'نسبة تحقيق استهلاك العلف لكل طائر (%)',
      }),
      new ListColumn({
        field: 'cumulativeTargetFeedPerBirdKg',
        header: 'تراكمي استهلاك العلف المستهدف لكل طائر (كجم)',
      }),
      new ListColumn({
        field: 'cumulativeActualFeedPerBirdKg',
        header: 'تراكمي استهلاك العلف الفعلي لكل طائر (كجم)',
      }),
      new ListColumn({
        field: 'cumulativeAchievementPerBirdPercent',
        header: 'نسبة المحقق التراكمي لاستهلاك العلف لكل طائر (%)',
      }),
      new ListColumn({
        field: 'targetFeedPerHouseTon',
        header: 'كمية العلف المستهدفة للعنبر (طن)',
      }),
      new ListColumn({
        field: 'actualFeedPerHouseTon',
        header: 'كمية العلف الفعلية للعنبر (طن)',
      }),
      new ListColumn({
        field: 'achievementHousePercent',
        header: 'نسبة تحقيق استهلاك العلف للعنبر (%)',
      }),
      new ListColumn({
        field: 'cumulativeTargetFeedHouseTon',
        header: 'تراكمي كمية العلف المستهدفة للعنبر (طن)',
      }),
      new ListColumn({
        field: 'cumulativeActualFeedHouseTon',
        header: 'تراكمي كمية العلف الفعلية للعنبر (طن)',
      }),
      new ListColumn({
        field: 'cumulativeAchievementHousePercent',
        header: 'نسبة المحقق التراكمي لاستهلاك العلف للعنبر (%)',
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
    this.feedConsumptionSettingsService
      .getFeedReport(
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
