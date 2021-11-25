import { NgModule, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/template/header/header.component';
import { ContentComponentForm } from 'src/app/components/content/content-form/content-form.component';
import { ContentTableComponent } from './components/content/content-table/content-table.component';

// Material imports
import { MaterialModule } from 'src/app/components/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaskVoltage } from './components/content/content-table/content-table.component';

import {
  DialogDeleteComponent,
  DialogDeleteContentComponent,
} from './components/dialogs/dialog-delete/dialog-delete.component';

// Backend
import { HttpClientModule } from '@angular/common/http';

// FormControl
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {
  DialogEditComponent,
  DialogEditContentComponent,
} from './components/dialogs/dialog-edit/dialog-edit.component';
import { ContentPyshicalComponent } from './components/content/content-pyshical/content-pyshical.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponentForm,
    ContentTableComponent,
    MaskVoltage,
    DialogDeleteComponent,
    DialogDeleteContentComponent,
    DialogEditComponent,
    DialogEditContentComponent,
    ContentPyshicalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  entryComponents: [HeaderComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
