import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateQuestionPageComponent } from './components/create-question-page/create-question-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SingleChoiceQuestionFormComponent } from './components/single-choice-question-form/single-choice-question-form.component';
import { QuestionDirective } from './core/directives/question.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { FormOptionsComponent } from './components/form-options/form-options.component';
import { MultipleChoicesFormComponent } from './components/multiple-choices-form/multiple-choices-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuestionPageComponent,
    SingleChoiceQuestionFormComponent,
    QuestionDirective,
    LayoutComponent,
    FormOptionsComponent,
    MultipleChoicesFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
