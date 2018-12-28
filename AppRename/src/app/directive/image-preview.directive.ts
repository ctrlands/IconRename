import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Directive({
  selector: 'img[imgPreview]'
})
export class ImagePreviewDirective {
  @Input() image: any;
  @Input() uploadId: string;
  @ViewChild('par') par: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnChanges(change: SimpleChanges) {
    let reader = new FileReader();
    let el = this.el;
    let renderer2 = this.renderer2;


    reader.onload = function (e) {
      let s = el.nativeElement;
/*       console.log(s);
      console.log(renderer2); */
      // renderer2.addClass(el.nativeElement, 'wild');

      el.nativeElement.src = reader.result;
    }

    if (this.image) {
      // console.log(this.uploadId);
      return reader.readAsDataURL(this.image);
    }
  }

}
