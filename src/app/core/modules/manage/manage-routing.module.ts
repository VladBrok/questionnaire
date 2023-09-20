import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageQuestionsPageComponent } from '../../../components/manage-questions-page/manage-questions-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManageQuestionsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
