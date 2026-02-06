import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { TreasuryService } from '../../treasury/treasury.service';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrl: './warehouse-details.component.scss'
})
export class WarehouseDetailsComponent {
  pages = [{ name: 'المخزن',route:'/warehouse' }, { name: 'التفاصيل' }];
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
        field: 'inventoryTypeName',
        hide: false,
        header: 'نوع المخزون',
      }),
      new ListColumn({
        field: 'quantity',
        hide: false,
        header: 'الكمية',
      }),
      new ListColumn({
        field: 'processTypeName',
        hide: false,
        header: 'نوع العملية',
      }),
      new ListColumn({
        field: 'roomName',
        hide: false,
        header: 'العنبر',
      }),
    ];
  }
  getById(id: number) {
    this.treasuryService.getById(id).subscribe((response: any) => {
      this.data = response.data;
      this.pageResult.items=this.data?.stockHistories
    });
  }
}
