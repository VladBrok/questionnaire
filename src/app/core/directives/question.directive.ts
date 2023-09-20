import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appQuestion]',
})
export class QuestionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
