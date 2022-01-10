import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[basicHighlight]'
})
class BasicHighLight implements OnInit {

  @Input()
  defaultColor = 'aqua'

  @Input('basicHighlight')
  highlightColor = 'purple'

  @HostBinding('style.backgroundColor')
  backgroundColor: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor
  }

  @HostListener('mouseenter')
  customEvent() {
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.backgroundColor = this.defaultColor
  }

}

export default BasicHighLight
