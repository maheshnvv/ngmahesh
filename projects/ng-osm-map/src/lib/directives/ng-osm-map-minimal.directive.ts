import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[ngOsmMapMinimal]',
  standalone: true
})
export class NgOsmMapMinimalDirective implements OnInit {

  @Input() pins: any[] = [];

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Minimal directive initialized successfully');
      this.elementRef.nativeElement.innerHTML = '<div>Minimal directive working!</div>';
    }
  }
}
