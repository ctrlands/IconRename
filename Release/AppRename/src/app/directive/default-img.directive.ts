import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appErrorImg]'
})
export class DefaultImgDirective {

  @Input('appErrorImg') errorImageSrc: string;

  constructor(public elementRef: ElementRef) { }

  @HostListener('error', ['$event.target'])
  ImageError(event) {
    if (this.errorImageSrc) {
      event.src = this.errorImageSrc;
    } else {
      event.src = 'default/DEFAULTICONOFALL/default-null.png';
    }
  }
}
