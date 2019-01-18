import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges, ViewChild, OnInit } from '@angular/core';

@Directive({
  selector: 'img[imgPreview]'
})
export class ImagePreviewDirective implements OnInit {
  @Input() image: any;
  @Input() isClear_direct: boolean;
  @ViewChild('previewImg') previewImg: ElementRef;



  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.isClear_direct = this.isClear_direct ? this.isClear_direct : false;
  }



  ngOnChanges(change: SimpleChanges) {
   
    let reader = new FileReader();
    let el = this.el;
    let renderer2 = this.renderer2;

    /* if (this.isClear_direct == false) {
      if (this.image) {
        console.log('指令内部false, this.isClear_direct: ' + this.isClear_direct);
        return reader.readAsDataURL(this.image);
      } else {
        return '../../../assets/icon/default-null.png';
      }
    }


    if (this.isClear_direct == true) {
      el.nativeElement.src = '../../../assets/icon/default-null.png';
      el.nativeElement.style.border = '3px dotted red';
      console.log('指令内部true, this.isClear_direct: ' + this.isClear_direct);
    }

    if (this.isClear_direct == undefined) {
      return reader.readAsDataURL(this.image);
    } */

    reader.onload = function (e) {
      el.nativeElement.style.border = 'unset';
      el.nativeElement.src = reader.result;
    }

    if (this.image) {
      console.log(this.image);
      return reader.readAsDataURL(this.image);
    } else {
      return '../../../assets/icon/default-null.png';
    }


  }

}
