import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CmsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 获取所有应用数据信息，分页
   */
  postInfos_service(page: string) {
    let o_post = {
      page: page
    }
    return this.http.post('/api/cms', o_post);
  }


  /**
   * 添加-
   * @param data 
   */
  postInfos_add_service(data: any) {
    return this.http.post('/api/cms/add', data);
  }

  /**
   * 编辑-数据保存
   * @param data 
   */
  postInfos_edit_service(data: any) {
    return this.http.post('/api/cms/edit', data);
  }

  /**
   * 编辑-根据appId获取应用信息
   * @param appId 
   */
  postInfos_editGet_service(appId: any) {
    let o_post = {
      app_id: appId
    }
    return this.http.post('/api/cms/editOfGetInfo', o_post);
  }

}
