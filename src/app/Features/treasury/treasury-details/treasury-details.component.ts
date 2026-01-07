import { Component, OnInit } from '@angular/core';
import { TreasuryService } from '../treasury.service';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';

@Component({
  selector: 'app-treasury-details',
  templateUrl: './treasury-details.component.html',
  styleUrl: './treasury-details.component.scss',
})
export class TreasuryDetailsComponent implements OnInit {
  pages = [{ name: 'الخزنة' }, { name: 'التفاصيل' }];
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  data: any;
  constructor(
    private treasuryService: TreasuryService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.getById(+id);
      this.intializeListCoulmns();
    }
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
        field: 'paidTypeName',
        hide: false,
        header: 'نوع العملية',
      }),
      new ListColumn({
        field: 'value',
        hide: false,
        header: 'القيمة',
      }),
      new ListColumn({
        field: 'employeeID',
        hide: false,
        header: 'العامل',
      }),
      new ListColumn({
        field: 'merchantID',
        hide: false,
        header: 'التاجر',
      }),
    ];
  }
  getById(id: number) {
    this.treasuryService.getById(id).subscribe((response: any) => {
      this.data = response.data;
      this.pageResult.items=this.data.treasuryHistories
    });
  }
}
