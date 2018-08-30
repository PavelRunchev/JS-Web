import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})

export class HighlightDirective {
    constructor(private el : ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'lightblue';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('lightblue');
    }

    private highlight(color : string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
    
