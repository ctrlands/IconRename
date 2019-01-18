import { Component, OnInit, Input, ElementRef, Renderer2, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';

// 响应式表单 & 表单组
import { FormControl, FormGroup } from '@angular/forms';

// 简单表单验证
import { Validators } from '@angular/forms';

// 文件上传
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('previewImg') previewImg: ElementRef;
  @Input() appName: string; // 应用名称
  @Input() pkgName: string; // 应用包名
  @Input() company: string; // 应用开发商
  @Input() alphaIndex: string; // 应用名称索引
  @Input() category: string; // 应用类别

  @Input() cmsSrc: string; // 应用图标路径


  @Input() uploadSrc: string; // 文件上传url


  @Input() isClear_child: boolean;

  @Output() getFile = new EventEmitter();
  

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/cms/add',
    method: 'post',
    itemAlias: 'uploadedfile',
    autoUpload: false,
    allowedFileType: ['image'],
    allowedMimeType: ['image/png'],
    parametersBeforeFiles: true
  })



  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
  ) { }

  /* ngOnInit() {
    
    this.initDefaultValue();
  } */
  ngAfterViewInit() {
    // console.dir(this.previewImg);
  }

  ngOnChanges() {
    // this.app_name = this.appName;
    // this.pkg_name = this.pkgName;
    // this.app_company = this.company;
    this.initDefaultValue();
  }

  initDefaultValue() {
    this.uploadSrc = this.uploadSrc ? this.uploadSrc : 'http://localhost:3000/cms/add';


    this.appName = this.appName ? this.appName : '';
    this.pkgName = this.pkgName ? this.pkgName : '';
    this.company = this.company ? this.company : '';
    this.alphaIndex = this.alphaIndex ? this.alphaIndex : '';
    this.category = this.category ? this.category : '';
    this.cmsSrc = this.cmsSrc ? this.cmsSrc : 'default/DEFAULTICONOFALL/default-cms-null.png';
    this.isClear_child = this.isClear_child ? this.isClear_child : false;


    if (this.isClear_child == true) {
      this.previewImg.nativeElement.src = 'default/DEFAULTICONOFALL/default-null.png';
      this.previewImg.nativeElement.style.border = '3px dotted lightgrey';

    }
    // this.app_name = this.appName;
    // this.pkg_name = this.pkgName;
    // this.app_company = this.company;
  }

  // @Output() onSubmit = new EventEmitter();
  // app_name = new FormControl(''); // FormControl

  // FormGroup
  /* appInfo = new FormGroup({
    app_name: new FormControl(''),
    pkg_name: new FormControl(''),
    compnay: new FormControl(''),
    // childGroup = new FormGroup({})
  }) */

  // Validators简单表单验证
  appInfo = new FormGroup({
    app_name: new FormControl('', Validators.required),
    pkg_name: new FormControl('', Validators.required),
    company: new FormControl(''),
    alphaIndex: new FormControl(''),
    category: new FormControl('')
    // childGroup = new FormGroup({})
  })

  // onSubmitIn() {
  //   let data = {
  //     value: this.appInfo.value,
  //     valid: this.appInfo.value.valid
  //   };
  //   this.onSubmit.emit(data);
  //   console.log(data)
  // }

  // onSubmits() {
  //   this.appInfo.value.valid = this.appInfo.valid;
  //   console.log(this.appInfo.value);
  //   console.log(this.appInfo.valid);
  // }


  public InfoOfFile(event) {
    let data = {
      event: event,
      uploader: this.uploader
    }
    this.getFile.emit(data);
  }


  /**
   *
   * 文件拖拽完成时的回调函数
   * @param event: 文件的相关信息
   * @param id: 当前Icon的Id
   */
  public uploadstatus: boolean;
  public imgsrc = [];
  public imgsrcTemp = []; // 存储最新的文件


  public fileDropOver(event) {
    this.uploader.setOptions({ additionalParameter: { 'pkgName': this.pkgName } });


    if (this.uploader.queue.length > 1) {
      this.imgsrc.splice(0, this.imgsrc.length);
      this.imgsrc.push(this.uploader.queue[this.uploader.queue.length - 1]._file);
      this.imgsrcTemp = this.imgsrc;
     
      this.InfoOfFile(this.imgsrcTemp);
      this.isClear_child = false;


      let el = this.previewImg;
      for (let i = 0; i < this.uploader.queue.length; i++) {
        let reader = new FileReader(); // 这个FileReader应该对应于每一个读取的文件都需要重新new一个
        reader.readAsDataURL(this.uploader.queue[this.uploader.queue.length-1]._file);
        reader.onload = function (e) { // 数据读取完成时触发onload对应的响应函数
          el.nativeElement.src = reader.result;
        }
      }

      // this.uploader.clearQueue(); // 上传成功之后清除上传的文件流保证下一个文件流是新的

    } else if (this.uploader.queue.length = 1) {
      this.isClear_child = false;
      this.imgsrcTemp.splice(0, this.imgsrcTemp.length);
      this.imgsrc.push(this.uploader.queue[0]._file);
      this.imgsrcTemp = this.imgsrc;




      let el = this.previewImg;
      for (let i = 0; i < this.uploader.queue.length; i++) {
        let reader = new FileReader(); // 这个FileReader应该对应于每一个读取的文件都需要重新new一个
        reader.readAsDataURL(this.imgsrcTemp[i]);
        reader.onload = function (e) { // 数据读取完成时触发onload对应的响应函数
          el.nativeElement.src = reader.result;
          el.nativeElement.style.border = 'unset';
        }
      }


      // this.uploader.clearQueue();
      this.InfoOfFile(this.imgsrcTemp);

    }

    /*  this.uploader.queue[0].onSuccess = (response, status, headers) => {
 
       // 上传文件成功
       if (status == 200) {
         // 上传文件后获取服务器返回的数据
         let tempRes = JSON.parse(response);
         this.uploadstatus = true;
         let that = this;
         that.uploader.clearQueue(); // 上传成功之后清除上传的文件流保证下一个文件流是新的
       } else {
         // 上传文件后获取服务器返回的数据错误
         console.log('错误！')
       }
     }; */

  }

}
