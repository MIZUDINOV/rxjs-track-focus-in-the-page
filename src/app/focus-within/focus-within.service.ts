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
export class FocusWithinService extends Observable<
    Element | EventTarget | null
> {
    constructor(
        // Внедряем в нашем конструкторе Токен документа
        @Inject(DOCUMENT) documentRef: Document,
        // Деструктурируем поле из ElementRef
        { nativeElement }: ElementRef<HTMLElement>
    ) {
        // С помощью merge() объединяем все наблюдаемые объекты в одни поток
        const focusedElement$ = merge(
            // Используем defer(), чтобы получить данные в момент подписки, а не в момент создания
            defer(() => of(documentRef.activeElement)),

            // Создаем событие focusin и возарщаем элемент
            fromEvent(nativeElement, 'focusin').pipe(
                map(({ target }) => target)
            ),

            // Создаем событие focusout и возвращаем элемент
            fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
                // Деструктурируем наш переданный тип FocusEvent, нам нужно поле relatedTarget
                map(({ relatedTarget }) => relatedTarget)
            )
        ).pipe(
            map((element: Element | EventTarget | null) =>
                element && nativeElement.contains(element as Node)
                    ? element
                    : null
            ),
            distinctUntilChanged()
        );

        super((subscriber) => focusedElement$.subscribe(subscriber));
    }
}
