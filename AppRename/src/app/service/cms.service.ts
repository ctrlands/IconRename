import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CmsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 获取当前页应用数据信息，分页
   */
  postInfos_service(page: string, order: string, type: string, qrystatus: boolean, keyword: string) {
    let o_post = {
      page: page,
      order: order,
      type: type,
      qrystatus: qrystatus,
      keyword: keyword
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

  /**
   * 按类别关键词查询
   * @param type ： 查询类别
   * @param keyword ： 查询关键词
   */
  postInfos_query_service(type: string, keyword: string) {
    let o_post = {
      type: type,
      keyword: keyword
    }
    return this.http.post('/api/cms/query', o_post);
  }

  

}
