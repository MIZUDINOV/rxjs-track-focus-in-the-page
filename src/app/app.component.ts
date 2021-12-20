import { Component } from '@angular/core';

type Focused = boolean | null | string;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    focused: Focused = null;

    get name(): Focused {
        return this.focused ? this.focused : 'null';
    }

    onFocusWithin(focuse: Focused) {
        this.focused = focuse;
    }
}
