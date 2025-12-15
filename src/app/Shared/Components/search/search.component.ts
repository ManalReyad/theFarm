import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() filterBtn: boolean = false;
  @Input() resetSearch: boolean = false;
  @Output() setSearchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() filter: EventEmitter<any> = new EventEmitter();
  searchValue: string = '';
  constructor() {}

  ngOnInit(): void {}
  getSearchValue(event: any) {
    this.searchValue = event.target.value;
    this.setSearchValue.emit(event.target.value);
  }
  onFilter() {
    this.filter.emit();
  }
}
