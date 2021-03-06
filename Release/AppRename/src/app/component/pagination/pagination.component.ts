import { Component, EventEmitter, Input, Output, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() theme: any;
  @Input() totalRecords: any; // 数据总量
  @Input() rows: any = 30; // 每页显示数量
  @Input() currentPage: any; // 当前页码
  @Input() pageLinkSize: any; // 页面范围

  @Input() cms_page_type: any; // 后台管理分页时查询类别
  @Input() page_type: any; // 前台分页时查询类别



  @Output() onPageChange = new EventEmitter();
  public pageCount: any;
  public pageArr: Array<any> = [];
  public pageValidation: any = { isFirst: false, isLast: false };

  constructor() { }

  ngOnInit() {
    this.initDefaultValue();
    this.getPageCount();
    this.getVisiblePageArr();
    this.validateIfFirstLast();
  }

  ngOnChanges() {
    this.initDefaultValue();
    this.getPageCount();
    this.getVisiblePageArr();
    this.validateIfFirstLast();
  }

  initDefaultValue() {
    this.theme = this.theme ? this.theme : 'default';
    this.rows = this.rows ? this.rows : 30;
    this.pageLinkSize = this.pageLinkSize ? this.pageLinkSize : 5;
    this.currentPage = this.currentPage ? this.currentPage : 0;
    this.totalRecords = this.totalRecords ? this.totalRecords : 0;
    this.cms_page_type = this.cms_page_type ? this.cms_page_type : 'company';
    this.page_type = this.page_type ? this.page_type : 'company';
  }

  getPageCount() {
    this.pageCount = Math.ceil(this.totalRecords / this.rows);
  }

  changePage(theme,actionKey: string) {
    this.getCurrentPage(actionKey);
    this.getVisiblePageArr();
    let data = {
      theme: theme,
      first: this.currentPage * this.rows,
      rows: this.rows,
      page: this.currentPage,
      pageCount: this.pageCount,
      cms_page_type: this.cms_page_type,
      page_type: this.page_type
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

}
