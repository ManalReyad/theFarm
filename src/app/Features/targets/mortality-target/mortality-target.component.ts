import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListColumn } from 'src/app/Shared/Models/list-columns';
import { PageResult } from 'src/app/Shared/Models/page-result';
import { MortalityTargetService } from '../mortality-target.service';
import { LookupService } from 'src/app/Shared/Services/lookup.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mortality-target',
  templateUrl: './mortality-target.component.html',
  styleUrl: './mortality-target.component.scss',
})
export class MortalityTargetComponent {
  columns: ListColumn[] = [];
  pageResult: PageResult = { items: [] };
  selectedItem: any;
  showConfirmDeleteDialog: boolean = false;
  showSuccessDialog: boolean = false;
  successMesg: string = '';
  maxResultCount: number = 7;
  skipCount: number = 0;
  searchMode: boolean = false;
  searchReset: boolean = false;
  breedsOptions: { id: number; name: string }[] = [];
  form!:FormGroup
  constructor(
    private mortalityTargetService: MortalityTargetService,
    private router: Router,
    private lookupService:LookupService
  ) {}

  ngOnInit(): void {
    this.intializeListCoulmns();
    this.form = new FormGroup({
      breedId: new FormControl(),
    });
    this.getDropdown()
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
        field: 'weekStart',
        header: 'من الأسبوع',
      }),
      new ListColumn({
        field: 'weekEnd',
        header: 'إلى الأسبوع',
      }),
      new ListColumn({
        field: 'expectedMortalityRate',
        header: 'نسبة النافق %',
      }),
    ];
  }
  getDropdown() {
    this.lookupService
      .getBreeds()
      .subscribe((response: any) => {
        this.breedsOptions =response||[];
        if(this.breedsOptions.length>0)
        {
          this.form.get('breedId')?.setValue(this.breedsOptions?.[0]?.id)
          this.searchMode = true
          this.getPage()
        }
        
      });
  }
  getPage() {
    this.mortalityTargetService
      .getAll(this.maxResultCount, this.skipCount,this.form.value.breedId)
      .subscribe((response: any) => {
        if(response.items.length>0)
        response.items.forEach((element:any) => {
          element.expectedMortalityRate = element.expectedMortalityRate+' %'
        });
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

  addNew() {
    this.router.navigate(['/targets/mortality/create']);
  }

  edit(data: any) {
    this.router.navigate(['/targets/mortality/update/' + data.item.id]);
  }

  delete(item: any) {
    this.selectedItem = item;
    this.showConfirmDeleteDialog = true;
  }

  // submitDelete() {
  //   this.mortalityTargetService
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
