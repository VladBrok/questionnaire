// import {
//   Component,
//   ElementRef,
//   Input,
//   ViewChild,
//   afterNextRender,
// } from '@angular/core';
// import { FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-question-text-field',
//   template: `<div #content>
//     dfksdlfj dslkfjl fskldfjlsdk jfkjf sdlfjkl fsjfkjf slkdjflsjfls;ldfj
//     lksjflsdjf sfjsljf klsjfklsdj ffj lksjflsjf sdkfjslfjs;jf lksjf jflsjflsjdf
//     lsjf fskdjflsdjflsdjf sflj fs fsjfjsfjsldjflsjdf fksldjflsdjflsdfj
//   </div>`,
// })
// export class QuestionTextFieldComponent {
//   resizeObserver: ResizeObserver | null = null;
//   @Input() form!: FormGroup<any>;
//   @ViewChild('content') contentRef!: ElementRef<HTMLDivElement>;

//   constructor() {
//     afterNextRender(() => {
//       this.resizeObserver = new ResizeObserver(() => {
//         console.log(
//           'Content was resized:',
//           this.contentRef.nativeElement.clientWidth
//         );
//       });

//       this.resizeObserver.observe(this.contentRef.nativeElement);
//     });
//   }

//   ngOnDestroy() {
//     this.resizeObserver?.disconnect();
//     this.resizeObserver = null;
//   }
// }

import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DestroyRef,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-text-field',
  templateUrl: './question-text-field.component.html',
  styleUrls: ['./question-text-field.component.scss'],
})
export class QuestionTextFieldComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() form!: FormGroup<any>;

  constructor() {
    console.log('constructor:', this.form);
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      console.log('%c destroyRef onDestroy', 'color: red');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges:', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit:', this.form);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('%c ngOnDestroy', 'color: red');
  }
}
