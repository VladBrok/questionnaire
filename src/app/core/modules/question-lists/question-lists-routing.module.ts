import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListsPageComponent } from '../../../components/question-lists-page/question-lists-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionListsRoutingModule {}
