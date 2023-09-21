import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionPageComponent } from './components/question-page/question-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SingleChoiceQuestionFormComponent } from './components/single-choice-question-form/single-choice-question-form.component';
import { QuestionDirective } from './core/directives/question.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { FormOptionsComponent } from './components/form-options/form-options.component';
import { MultipleChoicesFormComponent } from './components/multiple-choices-form/multiple-choices-form.component';
import { OpenQuestionFormComponent } from './components/open-question-form/open-question-form.component';
import { ManageQuestionsPageComponent } from './components/manage-questions-page/manage-questions-page.component';
import { QuestionListsPageComponent } from './components/question-lists-page/question-lists-page.component';
import { SingleChoiceQuestionCardComponent } from './components/single-choice-question-card/single-choice-question-card.component';
import { MultipleChoiceQuestionCardComponent } from './components/multiple-choice-question-card/multiple-choice-question-card.component';
import { OpenQuestionCardComponent } from './components/open-question-card/open-question-card.component';

// TODO: add app navigation with "Lists" and "Manage"

@NgModule({
  declarations: [
    AppComponent,
    QuestionPageComponent,
    SingleChoiceQuestionFormComponent,
    QuestionDirective,
    LayoutComponent,
    FormOptionsComponent,
    MultipleChoicesFormComponent,
    OpenQuestionFormComponent,
    ManageQuestionsPageComponent,
    QuestionListsPageComponent,
    SingleChoiceQuestionCardComponent,
    MultipleChoiceQuestionCardComponent,
    OpenQuestionCardComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatIconModule,
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
