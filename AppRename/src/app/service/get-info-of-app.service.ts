import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  getInfos_service() {
    return this.http.get('/api/sql');
  }

  postInfos_service(reqBody:any) {
    /* let o_post = new HttpParams().set('page',reqBody); // page=1
    return this.http.post('/api/sql', '', {params: o_post});  // 后台可通过req.query.page取得page的值*/
    let o_post = {
      page: reqBody
    }
    return this.http.post('/api/sql', o_post); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }

  postSetThemeName(reqBody: string) {
    let o_theme_name = {
      theme_name: reqBody
    }
    return this.http.post('/api/theme', o_theme_name); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }

  postQueryApps(reqBody: string) {
    let o_query_keyword = {
      query_keyword: reqBody
    }
    return this.http.post('/api/query', o_query_keyword); // 后台使用req.body.page取到该值。这里不设置{headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  }
}
