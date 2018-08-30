import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TeplateDrivenFormComponent } from './teplate-driven-form/teplate-driven-form.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { HighlightDirective } from './directives/highlightdirective';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TeplateDrivenFormComponent,
    ReactiveFormsComponent,
    HighlightDirective,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
