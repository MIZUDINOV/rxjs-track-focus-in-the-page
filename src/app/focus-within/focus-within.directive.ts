import { Directive, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FocusWithinService } from './focus-within.service';

@Directive({
    selector: '[focusWithin]',
    outputs: ['focusWithin'],
    providers: [FocusWithinService],
})
export class FocusWithinDirective {
    constructor(
        @Inject(FocusWithinService)
        readonly focusWithin: Observable<Element | null>
    ) {}
}
