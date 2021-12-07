import { Gadgets } from 'src/app/model/gadgets.model';
import { VoltageService } from 'src/app/services/voltage.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { ContentComponentForm } from 'src/app/components/content/content-form/content-form.component';
import { FormBuilder } from '@angular/forms';
import { GadgetsService } from 'src/app/services/gadgets.service';
import { DefaultService } from 'src/app/services/default.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent implements OnInit {
  @Input() getIdForTempTable: number | undefined;

  constructor(public dialog: MatDialog, private defaultService: DefaultService) {}

  gadgets_temp_obj: Gadgets[] = [];
  gadgets_temp: GadgetsTemp = {
    name: '',
    time: null,
    amount: null,
    potency: null,
    voltage: null,
    amperage: null,
    energy: null,
    price: null,
  };

  ngOnInit() {}

  openDialog() {
    this.defaultService.setId(this.getIdForTempTable!);
    const dialogRef = this.dialog.open(DialogEditContentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(`Dialog result: ${this.getIdForTempTable}`);
    });
  }
}

@Component({
  selector: 'app-dialog-edit-content',
  templateUrl: 'dialog-edit-content.component.html',
  styleUrls: ['dialog-edit-content.component.scss'],
})
export class DialogEditContentComponent extends ContentComponentForm {
  title: string = 'Tem certeza que deseja alterar este aparelho?';
  affirmative: string = 'Confirmar';
  negative: string = 'Cancelar';

  constructor(
    public formBuilder: FormBuilder,
    public gadgetsService: GadgetsService,
    public gadgetsTempService: GadgetsTempService,
    public voltageService: VoltageService,
    public dialog: MatDialog,
    private defaultService: DefaultService
  ) {
    super(formBuilder, gadgetsService, gadgetsTempService, voltageService);

    console.log(`${this.defaultService.getId()} @@@@@@@ --->>> GET ID`);

    this.gadgetsTempService.readById(this.defaultService.getId()).subscribe((obj) => {
      this.gadgets_obj1 = obj;
      this.readVoltageToGetId();
      console.log(`${this.gadgets_obj1.name} §§§§§§§§§ --->>> DIALOG`);
    });
  }

  updateGadget() {
    this.gadgets_obj1.id = this.defaultService.getId();
    this.gadgetsTempService.updateGadget(this.gadgets_obj1);
  }

  isDisabled(): boolean {
    return !this.form.valid ? true : !this.gadgetsFormControl.valid ? true : false;
  }
}
