import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentReadComponent } from './components/content/content-read/content-read.component';
import { ContentComponentForms } from './components/content/content-forms/content-forms.component';

const routes: Routes = [
  {
    path: 'read',
    component: ContentReadComponent,
  },
  {
    path: 'gadgets/obj/:id',
    component: ContentComponentForms,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
