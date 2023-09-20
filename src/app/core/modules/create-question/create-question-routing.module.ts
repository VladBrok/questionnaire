import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionPageComponent } from '../../../components/create-question-page/create-question-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreateQuestionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuestionRoutingModule {}
