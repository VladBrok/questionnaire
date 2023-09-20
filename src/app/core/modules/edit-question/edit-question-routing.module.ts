import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuestionPageComponent } from '../../../components/edit-question-page/edit-question-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditQuestionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuestionRoutingModule {}
