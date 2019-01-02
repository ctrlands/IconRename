import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultImg]'
})
export class DefaultImgDirective {

  @Input('defaultImg') defaultImgSrc: string;

  constructor(public elementRef: ElementRef) { }

  @HostListener('error', ['$event.target'])
  ImageError(event) {
    if (this.defaultImgSrc) {
      event.src = this.defaultImgSrc;
    } else {
      event.src = '../assets/icon/null.png';
    }
  }
}
