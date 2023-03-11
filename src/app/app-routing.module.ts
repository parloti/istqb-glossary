import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'term/', pathMatch: 'prefix' },
  { path: 'term/:id', component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
