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

}
