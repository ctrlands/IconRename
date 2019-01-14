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
  public appId: string; // 当前图标id

  public appName: string; // 当前应用图标名称
  public pkgName: string; // 当前应用包名
  public company: string; // 当前应用开发商
  public alphaIndex: string; // 应用名称索引
  public category: string; // 应用类别

  public modal_title: string; // 模态框标题

  public valid: boolean = false;
  public action: string; // add, edit, del

  public msg: string; // 返回状态数据提示信息

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
        this.pageInfo = res[1];
        this.anyList = res[0];
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
   * 编辑应用信息-保存
   */
  public editAppsPost(editdata): void {
    this.getInfoOfAppService.postInfos_edit_service(editdata)
      .subscribe(res => {
        if (res[0].code == '200') {
          this.msg = res[0].msg
        }
      })
  }

  /**
   * 编辑应用信息-根据appId获取应用信息
   */
  public editAppsGet(appId): void {
    this.getInfoOfAppService.postInfos_editGet_service(appId)
      .subscribe(res => {
        this.appName = res[0].cn_name;
        this.pkgName = res[0].pkg_name;
        this.company = res[0].company;
        this.alphaIndex = res[0].alpha_index;
        this.category = res[0].category;
      })
  }

  /**
   * 添加应用信息
   */
  public addApps(data): void {
    this.getInfoOfAppService.postInfos_add_service(data)
      .subscribe(res => {
        if (res[0].code == '200') {
          this.msg = res[0].msg;
        } else {
          this.msg = res[0].msg;
        }
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

  // 添加
  public add() {
    this.modal_title = '数据添加';
    this.action = 'add';
    this.appName = '';
    this.pkgName = '';
    this.company = '';
    this.alphaIndex = '';
    this.category = '';
  }

  // 编辑按钮-点击事件
  public edit(appId) {
    this.modal_title = '数据编辑';
    this.appName = '';
    this.pkgName = '';
    this.company = '';
    this.alphaIndex = '';
    this.category = '';
    this.appId = appId;
    this.valid = true;
    this.action = 'edit';
    this.editAppsGet(appId);
  }


  // 保存按钮-点击事件
  public submit(action, data: any) {
    action = this.action;
    switch (action) {
      case 'add':
        let add = data.appInfo.value;
        this.addApps(add);
        break;
      case 'edit':
        let edit = data.appInfo.value;
        edit.app_id = this.appId;
        this.editAppsPost(edit);
        break;
    }
  }

  // 关闭按钮-点击事件
  public close() {
    this.appName = ' ';
    this.pkgName = ' ';
    this.company = ' ';
    this.alphaIndex = ' ';
    this.category = ' ';
    this.msg = '';
  }

}
