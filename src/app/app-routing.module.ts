import { DialogDeleteComponent } from './components/dialogs/dialog-delete/dialog-delete.component';
import { PhysicsContentComponent } from './components/content/physics-content/physics-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponentForm } from './components/content/content-form/content-form.component';
import { DialogEditComponent } from './components/dialogs/dialog-edit/dialog-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponentForm,
  },
  {
    path: 'calculate',
    component: ContentComponentForm,
  },
  {
    path: 'gadgets/obj/:id',
    redirectTo: '/calculate',
  },
  {
    path: 'gadgets_temp/update/:id',
    redirectTo: '/calculate',
  },
  {
    path: 'gadgets_temp/delete/:id',
    redirectTo: '/calculate',
  },
  {
    path: 'physics_content',
    component: PhysicsContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
