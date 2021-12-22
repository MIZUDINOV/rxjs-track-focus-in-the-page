import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import {
    debounceTime,
    distinctUntilChanged,
    fromEvent,
    map,
    merge,
    Observable,
    of,
    tap,
} from 'rxjs';

@Injectable()
export class FocusWithinService extends Observable<Element | null> {
    constructor(
        @Inject(DOCUMENT) documentRef: Document,
        { nativeElement }: ElementRef<HTMLElement>
    ) {
        const focused$ = merge(
            fromEvent(documentRef, 'focusin'),
            fromEvent(nativeElement, 'focusout'),
            of(null)
        ).pipe(
            debounceTime(0),
            map(() =>
                nativeElement.contains(documentRef.activeElement)
                    ? documentRef.activeElement
                    : null
            ),
            distinctUntilChanged()
        );

        super((subscriber) => focused$.subscribe(subscriber));
    }
}
