import { Component } from '@angular/core';

type Focused = Element | null;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    focused: Focused = null;

    get name(): Focused | string {
        return this.focused ? this.focused.tagName : 'null';
    }

    onFocusWithin(focused: Focused) {
        this.focused = focused;
    }
}
