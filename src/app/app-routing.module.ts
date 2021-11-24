import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponentForm } from './components/content/content-form/content-form.component';
import { DialogDeleteComponent } from './components/dialogs/dialog-delete/dialog-delete.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponentForm,
  },
  {
    path: 'gadgets/obj/:id',
    component: ContentComponentForm,
  },
  {
    path: 'gadgets_temp/update/:id',
    component: ContentComponentForm,
  },
  {
    path: 'gadgets_temp/delete/:id',
    component: DialogDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
