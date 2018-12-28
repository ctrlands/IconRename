import { Component, EventEmitter, Input, Output, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalRecords: number; // 数据总量
  @Input() rows: number = 30; // 每页显示数量
  @Input() currentPage: number; // 当前页码
  @Input() pageLinkSize: number;
  @Output() onPageChange = new EventEmitter();
  private pageCount: number;
  private pageArr: Array<number> = [];
  private pageValidation: any = { isFirst: false, isLast: false };

  constructor() { }

  ngOnInit() {
    this.initDefaultValue();
    this.getPageCount();
    this.getVisiblePageArr();
    this.validateIfFirstLast();
  }

  initDefaultValue() {
    this.rows = this.rows ? this.rows : 30;
    this.pageLinkSize = this.pageLinkSize ? this.pageLinkSize : 5;
    this.currentPage = this.currentPage ? this.currentPage : 0;
  }

  getPageCount() {
    this.pageCount = Math.ceil(this.totalRecords / this.rows);
  }

  changePage(actionKey: string) {
    this.getCurrentPage(actionKey);
    this.getVisiblePageArr();
    let data = {
      first: this.currentPage * this.rows,
      rows: this.rows,
      page: this.currentPage,
      pageCount: this.pageCount
    }
    this.onPageChange.emit(data);
  }

  getVisiblePageArr() {
    this.pageArr = [];
    let visiblePage = Math.min(this.pageLinkSize, this.pageCount);
    let start = Math.max(0, Math.ceil(this.currentPage - visiblePage / 2));
    // When page next to the end
    if (this.currentPage >= Math.floor(this.pageCount - visiblePage / 2)) {
      start = Math.max(0, this.pageCount - this.pageLinkSize);
    }
    let end = start + visiblePage - 1;
    for (var i = start; i <= end; i++) {
      this.pageArr.push(i);
    }
    // console.log(this.pageArr);
  }

  getCurrentPage(actionKey: string) {
    if (actionKey == 'first') {
      this.currentPage = 0;
    } else if (actionKey == 'last') {
      this.currentPage = this.pageCount - 1;
    } else if (actionKey == 'pre') {
      if (this.currentPage <= 0) {
        return;
      }
      this.currentPage = this.currentPage - 1;
    } else if (actionKey == 'next') {
      if (this.currentPage >= this.pageCount - 1) {
        return;
      }
      this.currentPage = this.currentPage + 1;
    } else {
      this.currentPage = Number(actionKey);
    }

    this.validateIfFirstLast();
  }

  validateIfFirstLast() {
    if (this.currentPage == 0) {
      this.pageValidation = { isFirst: true, isLast: false };
    } else if (this.currentPage == this.pageCount - 1) {
      this.pageValidation = { isFirst: false, isLast: true };
    } else {
      this.pageValidation = { isFirst: false, isLast: false };
    }
  }


  /* @Input() totalPage: number;
  @Input() currentPage: number;
  @Output() pageChange = new EventEmitter<number>();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  changePage(pageNum) {
    this.pageChange.emit(pageNum);
  }

  goPrev(pageNum) {
    if (pageNum >= 1) {
      this.changePage(pageNum - 1);
    }
  }

  goNext(pageNum) {
    if (pageNum <= this.totalPage - 2) {
      this.changePage(pageNum + 1);
    }
  } */



}
