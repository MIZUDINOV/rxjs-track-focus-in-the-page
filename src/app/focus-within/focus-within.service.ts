import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import {
    defer,
    distinctUntilChanged,
    fromEvent,
    map,
    mapTo,
    merge,
    Observable,
    of,
} from 'rxjs';

// Делаем наш сервис внедряемым с помощью @Injectable() и наблюдаемым, наследуясь от Observable
@Injectable()
export class FocusWithinService extends Observable<boolean | null> {
    constructor(
        // Внедряем в нашем конструкторе Токен документа
        @Inject(DOCUMENT) documentRef: Document,
        // Деструктурируем поле из ElementRef
        { nativeElement }: ElementRef<HTMLElement>
    ) {
        // С помощью merge() объединяем все наблюдаемые объекты в одни поток
        const focused$ = merge(
            // Используем defer(), чтобы получить данные в момент подписки, а не в момент создания
            defer(() => of(nativeElement.contains(documentRef.activeElement))),

            // Создаем событие focusin
            fromEvent(nativeElement, 'focusin').pipe(mapTo(true)),

            // Создаем событие focusout
            fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
                // Деструктурируем наш переданный тип FocusEvent, нам нужно поле relatedTarget
                map(({ relatedTarget }) =>
                    nativeElement.contains(relatedTarget as Node)
                )
            )
        ).pipe(distinctUntilChanged());

        super((subscriber) => focused$.subscribe(subscriber));
    }
}
