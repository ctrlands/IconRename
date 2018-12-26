import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[imgPreview]'
})
export class ImagePreviewDirective {
  @Input() image: any;

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnChanges(change: SimpleChanges) {
    let reader = new FileReader();
    let el = this.el;

    reader.onload = function (e) {
      console.log(change);
      console.log(e);
      el.nativeElement.src = reader.result;
    }

    if (this.image) {
      return reader.readAsDataURL(this.image);
    }
  }

}
