import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
    selector: '[focusWithin]',
    outputs: ['focusWithin'],
    providers: [],
})
export class FocusWithinDirective {
    constructor(readonly focusWithin: Observable<boolean | null>) {}
}
