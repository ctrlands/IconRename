import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, isDevMode } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FileUploader, FileItem } from 'ng2-file-upload';

import { GetInfoOfAppService } from './service/get-info-of-app.service';

import { AppInfo } from './class/app-info';
import { PageInfo } from './class/page-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  @Input() nowId: number;


  public theme_name: string;
  public search_keyword: string;

  title = 'AppRename';
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
  }


  getAppsOfName(): void {
    this.getInfoOfAppService.getInfos_service()
      .subscribe(res => {
        this.anyList = res[0];
        this.pageInfo = res[1][0];
      })
  }

  postAppsOfName(page): void {
    this.getInfoOfAppService.postInfos_service(page)
      .subscribe(res => {
        this.anyList = res[0];
        this.pageInfo = res[1][0];
      })
  }

  paginate(event) {
    this.postAppsOfName(event.page);
    // console.log(event);
  }

  setThemeName() {
    this.getInfoOfAppService.postSetThemeName(this.theme_name)
      .subscribe(res => {
        console.log(res);
        return res;
      })
  }

  searchKeyword() {
    this.getInfoOfAppService.postQueryApps(this.search_keyword)
      .subscribe(res => {
        this.anyList = res[0];
        this.pageInfo = res[1][0];
        // console.log(res);
      })
  }


  /**
   * 拖拽状态改变的回调函数
   *
   * @param {*} event true: 在拖拽区域中 ; false: 未在拖拽区域中
   * 
   */
  public fileOverBase(id, event) {
    this.uploader.onBuildItemForm = function (fileItem, form) {
      form.append('nowid', id);
    }
  }

  /**
   *
   * 文件拖拽完成时的回调函数
   * @param event: 文件的相关信息
   * @param id: 当前Icon的Id
   */
  fileDropOver(id: string, event) {

    /* FileUploader有个数组类型的属性queue，里面是所有拖拽的和选择的文件，只要操作这个属性便可以进行文件上传。 */
    if (event[0].type != 'image/png') {
      alert('只支持png格式的图片！');
    } else {
      let that = this; // 增加参数传参过去，是把这个参数加入form表单中添加; 可以增加多个参数就用form.append('参数',''自定义的参数)
      // this.uploader.setOptions({ additionalParameter: { 'nowid': '10000' } });


      // this.uploader.queue[0].url = `http://localhost:3000/upload?id=${id}`;
      this.uploader.queue[0].onSuccess = (response, status, headers) => {
        // console.log(this.el.nativeElement.querySelector('#id10002'));
        // 上传文件成功
        if (status == 200) {
          // 上传文件后获取服务器返回的数据
          let tempRes = JSON.parse(response);
          // that.mod_new_image = tempRes.data; // 申明一个变量接住返回的数据，可以进行赋值
          // 为什么要在往外面申明一个that代替this, 现在是只在uploader里面, this就只能指uploader
          // that.uploader.clearQueue(); // 上传成功之后清除上传的文件流保证下一个文件流是新的
        } else {
          // 上传文件后获取服务器返回的数据错误
          console.log('错误！')
        }
      };
      this.uploader.queue[0].upload(); // 开始上传
    }
  }
}

