import { Directive, HostBinding, HostListener } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
class AppDropdownDirective {
  @HostBinding('class.show')
    isOpen: boolean = false

  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen
    console.log(this.isOpen)
  }
}

export default AppDropdownDirective
