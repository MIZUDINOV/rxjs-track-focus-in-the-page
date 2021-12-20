import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FocusWithinModule } from './focus-within/focus-within.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FocusWithinModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
