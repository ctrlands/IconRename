import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { GetInfoOfAppService } from './service/get-info-of-app.service';
import { CmsService } from './service/cms.service';

// 响应式表单 ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 文件上传 ng2-file-upload
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreviewDirective } from './directive/image-preview.directive';
import { PaginationComponent } from './component/pagination/pagination.component';
import { DefaultImgDirective } from './directive/default-img.directive';
import { CmsComponent } from './component/cms/cms.component';

// 路由相关
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './component/web/web.component';
import { FormComponent } from './component/form/form.component';

const appRoutes: Routes = [
  { path: '', component: WebComponent },
  { path: 'cms', component: CmsComponent },
  { path: '**', component: WebComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ImagePreviewDirective,
    PaginationComponent,
    DefaultImgDirective,
    CmsComponent,
    WebComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      // {
      //   enableTracing: true
      // }
    )
  ],
  providers: [GetInfoOfAppService, CmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
