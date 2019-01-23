import { Component, enableProdMode, Input, OnInit, ElementRef, Renderer2, ViewChild, isDevMode } from '@angular/core';
enableProdMode();
import { HttpClient } from '@angular/common/http';

import { FileUploader, FileItem } from 'ng2-file-upload';

import { GetInfoOfAppService } from '../../service/get-info-of-app.service';

import { AppInfo } from '../../class/app-info';
import { PageInfo } from '../../class/page-info';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})

export class WebComponent implements OnInit {
  @Input() nowId: number;
  title: string = 'Icon-Rename-client';



  public inuse_theme_name: string;

  public theme_name: string;

  public search_keyword: string; // 应用名称/应用开发商模糊查询

  public search_keywordOfTheme: string; // 主题名称查询

  public uploadImg: any;

  public themeLists: any;

  public addThemeNameMsg: any;

  public page: any;

  public nopage: number = 1; // 是否显示分页插件

  title = 'Icon-Rename';
  public anyList: AppInfo[];
  public pageInfo: PageInfo;
  public operateId = {
    id: ''
  };


  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/upload',
    method: 'post',
    itemAlias: 'uploadedfile',
    autoUpload: true,
    allowedFileType: ['image'],
    allowedMimeType: ['image/png'],
    parametersBeforeFiles: true
  })



  /* 分页参数 */

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer2: Renderer2,
    private getInfoOfAppService: GetInfoOfAppService,
  ) {
  };


  ngOnInit() {
    this.operateId = { id: '10000' };
    this.getAppsOfName();
    this.getThemeList();
  }

  public isvalid (): boolean {
    if (this.search_keyword && this.inuse_theme_name) {
      return false;
    } else {
      return true;
    }
  }


  /**
   * 获取所有应用信息
   */
  public getAppsOfName(): void {
    let page: string = '0';
    this.getInfoOfAppService.getInfos_service(page)
      .subscribe(res => {
        this.inuse_theme_name = res[1].theme_name;
        this.pageInfo = res[2];
        this.anyList = res[0];
      })
  }

  /**
   * 分页获取信息
   * @param page 
   */
  public postAppsOfName(theme, page): void {
    this.getInfoOfAppService.postInfos_service(theme, page)
      .subscribe(res => {
        this.anyList = res[0];
        this.pageInfo = res[2];
      })
  }

  /**
   * 分页插件-分页事件
   * @param event 
   */
  public paginate(theme, event) {
    this.page = event.page;
    this.inuse_theme_name = theme;
    this.postAppsOfName(theme, event.page);
  }

  /**
   * 添加新主题
   */
  public setThemeName() {
    this.getInfoOfAppService.postSetThemeName(this.theme_name)
      .subscribe(res => {
        
        if (res[0].code == '200') {
          this.addThemeNameMsg = '';
          this.addThemeNameMsg = res[0].msg;
          this.inuse_theme_name = res[3].theme_name;
          this.anyList = res[1];
          this.pageInfo = res[2];
          this.getThemeList();
          this.theme_name = '';
        } else {
          this.addThemeNameMsg = res[0].msg;
        }
      })
  }

  /**
   * 根据应用名称或应用开发商模糊查询应用信息
   */

  public searchKeywordOfApp() {
    this.getInfoOfAppService.postQueryApps(this.search_keyword)
      .subscribe(res => {
        // this.inuse_theme_name = res[1].theme_name;
        this.anyList = res[0];
        // this.pageInfo = res[1];
        this.nopage = 0;
      })
  }

  /**
   * 根据主题名查询
   */
  public searchKeywordOfTheme() {
    let page = 0;
    this.nopage = 1;
    this.search_keyword = '';
    this.getInfoOfAppService.getAppsByTheme_service(this.search_keywordOfTheme, page)
      .subscribe(res => {
        this.inuse_theme_name = res[1].theme_name;
        this.anyList = res[0];
        this.pageInfo = res[2][0];
      })

  }

  /**
   * 获取所有主题信息
   */
  public getThemeList() {
    this.getInfoOfAppService.getThemeList_service()
      .subscribe(res => {
        this.themeLists = res[0];
      })
  }

  /**
   * 根据主题名显示该主题的图标-左侧主题下拉列表点击事件
   * @param theme_name : 主题名
   * @param page : 当前页码
   */
  getAppsByTheme(theme_name, page) {
    page = 0;
    this.getInfoOfAppService.getAppsByTheme_service(theme_name, page)
      .subscribe(res => {
        this.inuse_theme_name = res[1].theme_name;
        this.anyList = res[0];
        this.pageInfo = res[2][0];
      })
  }







  /**
   * 拖拽状态改变的回调函数
   *
   * @param {*} event true: 在拖拽区域中 ; false: 未在拖拽区域中
   * 
   */
  public fileOverBase(id, event) {
    let tname = this.inuse_theme_name;
    this.uploader.onBuildItemForm = function (fileItem, form) {
      form.append('nowid', id); // 当前图标app_id或者当前ng2-file-upload对应div
      form.append('themeName', tname); // 当前图标包对应主题名称
    }
  }

  /**
   *
   * 文件拖拽完成时的回调函数
   * @param event: 文件的相关信息
   * @param id: 当前Icon的Id
   */
  public uploadstatus: boolean;
  public fileDropOver(id: string, event) {

    /* FileUploader有个数组类型的属性queue，里面是所有拖拽的和选择的文件，只要操作这个属性便可以进行文件上传。 */
    if (event[0].type != 'image/png') {
      alert('只支持png格式的图片！');
    } else {
      let that = this; // 增加参数传参过去，是把这个参数加入form表单中添加; 可以增加多个参数就用form.append('参数',''自定义的参数)
      // this.uploader.setOptions({ additionalParameter: { 'nowid': '10000' } });

      var ids = '#img_' + id;
      var idOfDiv = '#id' + id;
      //console.log(this.el.nativeElement.querySelector(idOfDiv));
      // this.uploader.queue[0].url = `http://localhost:3000/upload?id=${id}`;
      this.uploader.queue[0].onSuccess = (response, status, headers) => {

        // 上传文件成功
        if (status == 200) {
          // 上传文件后获取服务器返回的数据
          let tempRes = JSON.parse(response);
          this.uploadstatus = true;
          /* this.uploadImg = this.uploader.queue[0];
          console.log(this.uploadImg); */
          // that.mod_new_image = tempRes.data; // 申明一个变量接住返回的数据，可以进行赋值
          // 为什么要在往外面申明一个that代替this, 现在是只在uploader里面, this就只能指uploader
          that.uploader.clearQueue(); // 上传成功之后清除上传的文件流保证下一个文件流是新的
          // this.el.nativeElement.querySelector(ids).src = '../assets/icon/'+tempRes.res_name;
          // this.el.nativeElement.querySelector(ids).src = '/api/' + tempRes.res_src;
          this.renderer2.setAttribute(this.el.nativeElement.querySelector(ids),'src','/api/' + tempRes.res_src);
          // this.el.nativeElement.querySelector(idOfDiv).style.backgroundColor = '#f03326';
          this.renderer2.addClass(this.el.nativeElement.querySelector(idOfDiv),'activeImg');

        } else {
          // 上传文件后获取服务器返回的数据错误
          console.log('错误！')
        }
      };

      this.uploader.queue[0].upload(); // 开始上传
    }
  }
}

