import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { FeedMixService } from '../feed-mix.service';

@Component({
  selector: 'app-feed-mix',
  templateUrl: './feed-mix.component.html',
  styleUrl: './feed-mix.component.scss'
})
export class FeedMixComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };

  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;

  successMesg: string = '';
  pageSize: number = 10;
  pageNumber: number = 1;
  searchMode: boolean = false;
  searchReset: boolean = false;

  constructor(
    private feedMixService: FeedMixService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intializeListCoulmns();
    this.getPage();
  }

  intializeListCoulmns() {
    this.columns = [
      new ListColumn({
        field: '',
        header: '#',
        width: 5,
        isIndex: true,
      }),
      new ListColumn({
        field: 'name',
        header: 'اسم الخلطة',
      }),
      new ListColumn({
        field: 'totalWeight',
        header: 'إجمالي الوزن',
      }),
      new ListColumn({
        field: 'totalPrice',
        header: 'إجمالي السعر',
      }),
    ];
  }

  getPage() {
    this.feedMixService
      .getAll()
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

  addNew() {
    this.router.navigate(['/feed-mix/create']);
  }

  edit(data: any) {
    this.router.navigate(['/feed-mix/update/' + data.item.id]);
  }

  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  // submitDelete() {
  //   this.feedMixService
  //     .delete(this.selectedItem.id)
  //     .subscribe((response: any) => {
  //       if (response.success) {
  //         this.successMesg = 'تم حذف خلطة العلف بنجاح، يمكنك المتابعة';
  //         this.showSuccessDialog = true;
  //         this.showConfirmDeleteDialog = false;
  //       }
  //     });
  // }

  close() {
    this.showConfirmDeleteDialog = false;
  }

  backToList() {
    this.showSuccessDialog = false;
    this.getPage();
  }
}
