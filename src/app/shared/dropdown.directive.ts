import { Directive, OnInit, HostListener, HostBinding, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  // private toggle: boolean = false;
  // constructor(private elRef: ElementRef,
  //   private renderer: Renderer2) { }

  @HostBinding('class.open') isOpen = false;

  ngOnInit(){
  }

  // @HostListener('click') click(eventData: Event){
  //     console.log("this is clicked");
  //     this.toggle = !this.toggle;
  //     if(this.toggle) this.renderer.addClass(this.elRef.nativeElement, 'open');
  //     else this.renderer.removeClass(this.elRef.nativeElement, 'open');
  // }

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}
