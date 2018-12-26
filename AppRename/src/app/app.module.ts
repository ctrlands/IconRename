import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { GetInfoOfAppService } from './service/get-info-of-app.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 文件上传 ng2-file-upload
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreviewDirective } from './directive/image-preview.directive';
import { PaginationComponent } from './component/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagePreviewDirective,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CommonModule,
    FileUploadModule,
    FormsModule
  ],
  providers: [GetInfoOfAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
