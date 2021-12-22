import { Component } from '@angular/core';

// type Focused = boolean | null | string;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    focused: Element | null = null;

    get name(): string {
        return this.focused ? this.focused.tagName : 'null';
    }

    onFocusWithin(focused: Element | null) {
        this.focused = focused;
    }
}
