import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'manage',
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./core/modules/create-question/create-question.module').then(
        (m) => m.CreateQuestionModule
      ),
  },
  {
    path: 'manage',
    loadChildren: () =>
      import('./core/modules/manage/manage.module').then((m) => m.ManageModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./core/modules/edit-question/edit-question.module').then(
        (m) => m.EditQuestionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
