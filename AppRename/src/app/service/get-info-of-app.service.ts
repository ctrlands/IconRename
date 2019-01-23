import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';


@Injectable()
export class GetInfoOfAppService {
  /* httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;application/x-wwww-form-urlencodeed;charset=utf-8'
    })
  } */

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 获取所有应用数据信息，分页
   */
  getInfos_service(page: string) {
    let o_post = {
      page: page
    }
    return this.http.post('/api/sql', o_post);
  }

  /**
   * 获取主题名称列表
   */
  getThemeList_service() {
    return this.http.get('/api/themeList');
  }

  /**
   * 分页应用数据信息获取
   * @param reqBody : 当前页码
   */
  postInfos_service(theme: any, reqBody: any) {
    /* let o_post = new HttpParams().set('page',reqBody); // page=1
    return this.http.post('/api/sql', '', {params: o_post});  // 后台可通过req.query.page取得page的值*/
    let o_post = {
      theme: theme,
      page: reqBody
    }
    return this.http.post('/api/sql', o_post); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }

  /**
   * 添加新主题名字
   * @param reqBody : 设置新主题的名字
   */
  postSetThemeName(reqBody: string) {
    let o_theme_name = {
      theme_name: reqBody
    }
    return this.http.post('/api/theme', o_theme_name); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }

  /**
   * 通过应用名称/应用发行商名称模糊查询符合条件的应用数据
   * @param reqBody : 查询应用的应用名称/应用发行商名称
   */
  postQueryApps(reqBody: string) {
    let o_query_keyword = {
      query_keyword: reqBody
    }
    return this.http.post('/api/query', o_query_keyword); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }

  /**
   * 根据主题名获取该主题的图标
   * @param reqBody ：主题名
   */
  getAppsByTheme_service(reqBody: any, page: any) {
    let theme = {
      theme: reqBody,
      page: page
    }
    return this.http.get('/api/theme', {params: theme});
  }
  
}
