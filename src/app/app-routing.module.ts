import { DialogDeleteComponent } from './components/dialogs/dialog-delete/dialog-delete.component';
import { ContentPhysicsComponent } from './components/content/content-physics/content-physics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponentForm } from './components/content/content-form/content-form.component';
import { DialogEditComponent } from './components/dialogs/dialog-edit/dialog-edit.component';

const routes: Routes = [
  {
    path: 'calculate',
    component: ContentComponentForm,
  },
  {
    path: '',
    redirectTo: '/calculate',
    pathMatch: 'full',
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
    component: ContentPhysicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
