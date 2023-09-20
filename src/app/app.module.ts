import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateQuestionPageComponent } from './components/create-question-page/create-question-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SingleChoiceQuestionFormComponent } from './components/single-choice-question-form/single-choice-question-form.component';
import { QuestionDirective } from './core/directives/question.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuestionPageComponent,
    SingleChoiceQuestionFormComponent,
    QuestionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
