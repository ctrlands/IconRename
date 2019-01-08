import { Component, OnInit } from '@angular/core';

import { CmsService } from '../../service/cms.service';

import { AppInfo } from '../../class/app-info';
import { PageInfo } from '../../class/page-info';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  title = '后台管理界面';
  public anyList: AppInfo[];
  public pageInfo: PageInfo;

  public page: string; // 当前页码

  constructor(
    private getInfoOfAppService: CmsService
  ) { }

  ngOnInit() {
    this.getAppsOfName();
  }
  /**
   * 获取所有应用信息-first
   */
  public getAppsOfName(): void {
    let page: string = '0';
    this.getInfoOfAppService.postInfos_service(page)
      .subscribe(res => {
        // console.log(res);
        this.pageInfo = res[1];
        this.anyList = res[0];
        // console.log(this.anyList )
      })
  }

  /**
   * 获取所有应用信息-pagination
   */
  public getAppsOfNames(page): void {
    this.getInfoOfAppService.postInfos_service(page)
      .subscribe(res => {
        this.pageInfo = res[1];
        this.anyList = res[0];
      })
  }

  /**
   * 分页插件-分页事件
   * @param event 
   */
  public paginate(event) {
    this.page = event.page;
    this.getAppsOfNames(event.page);
  }

  public add(appId) {
    console.log(appId);

  }

  public edit(appId) {
    console.log('edit');

  }

  public del(appId) {
    console.log('del');

  }

}
