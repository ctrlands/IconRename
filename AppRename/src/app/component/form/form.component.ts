import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// 响应式表单 & 表单组
import { FormControl, FormGroup } from '@angular/forms';

// 简单表单验证
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() appName: string; // 应用名称
  @Input() pkgName: string; // 应用包名
  @Input() company: string; // 应用开发商

  constructor() { }

  ngOnInit() {
    this.initDefaultValue();
  }

  ngOnChanges() {
    // this.app_name = this.appName;
    // this.pkg_name = this.pkgName;
    // this.app_company = this.company;
    this.initDefaultValue();
  }

  initDefaultValue() {
    this.appName = this.appName ? this.appName : '';
    this.pkgName = this.pkgName ? this.pkgName : '';
    this.company = this.company ? this.company : '';
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

}
