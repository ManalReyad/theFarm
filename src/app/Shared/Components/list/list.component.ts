import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListColumn } from '../../Models/list-columns';
import { PageResult } from '../../Models/page-result';
import { Dropdown } from '../../Models/dropdown';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listColumns!: ListColumn[];
  @Input() pageResult!: PageResult;
  @Input() withAction: boolean = true;
  @Input() hasEdit: boolean = true;
  @Input() hasDelete: boolean = true;
  @Input() hasPagination: boolean = true;
  @Input() hasBorder: boolean = false;
  @Input() searchMode: boolean = false;
  @Input() filterMode: boolean = false;
  @Input() noDataImg: string = '';
  @Input() noDataMessage: string = '';
  @Input() addButtonText: string = '';
  @Input() nosearchBtnText: string = '';
  @Input() displayEmptyList: boolean = false;
  @Output() onChangeStatus = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() back = new EventEmitter();
  first: number = 0;
  last!: number;
  rows: number = 10;
  options: Dropdown[] = [
    { id: 5, name: 5 },
    { id: 10, name: 10 },
    { id: 20, name: 20 },
  ];
  constructor() {}

  ngOnInit(): void {}

  changeStatus(event: any, value: any) {
    let newObj = {
      check: event.checked,
      value: value,
    };
    this.onChangeStatus.emit(newObj);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageChange.emit(event);
  }

  onDelete(currtentItem: any, index: number) {
    this.delete.emit({ id: currtentItem.id, index: index });
  }

  onEdit(currtentItem: any, index: number) {
    this.edit.emit({ item: currtentItem, index: index });
  }

  addNew() {
    this.add.emit();
  }
  onBack() {
    this.back.emit();
  }
}
