import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponentForm } from './components/content/content-form/content-form.component';

const routes: Routes = [
  {
    path: 'gadgets/obj/:id',
    component: ContentComponentForm,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
