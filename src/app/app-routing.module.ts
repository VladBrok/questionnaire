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
      import('./core/modules/question/question.module').then(
        (m) => m.QuestionModule
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
      import('./core/modules/question/question.module').then(
        (m) => m.QuestionModule
      ),
  },
  {
    path: 'lists',
    loadChildren: () =>
      import('./core/modules/question-lists/question-lists.module').then(
        (m) => m.QuestionListsModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./core/modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
