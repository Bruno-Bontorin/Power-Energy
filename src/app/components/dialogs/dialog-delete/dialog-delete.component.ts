import { VoltageService } from 'src/app/services/voltage.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { ContentComponentForm } from '../../content/content-form/content-form.component';
import { FormBuilder } from '@angular/forms';
import { GadgetsService } from 'src/app/services/gadgets.service';
import { DefaultService } from 'src/app/services/default.service';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-dialog-content-component',
  templateUrl: 'dialog-delete.component.html',
})
export class DialogDeleteComponent implements OnInit {
  @Input() getIdForTempTable: number | undefined;
  id: number = 0;

  constructor(
    public dialog: MatDialog,
    private gadgetsTempService: GadgetsTempService,
    private voltageService: VoltageService,
    private defaultService: DefaultService
  ) {}

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
    console.log(`${this.getIdForTempTable} §§§§§§§§§§§§§§§§§§§§ --->>> DIALOG ID ID`);

    this.getIdForTempTable! > 0 && this.getIdForTempTable != undefined
      ? this.gadgetsTempService.readById(this.getIdForTempTable!).subscribe((obj) => {
          this.gadgets_temp = obj;
          this.readVoltageToGetId();
          console.log(`${this.gadgets_temp.name} §§§§§§§§§§§§§§§§§§§§ --->>> DIALOG`);
        })
      : 0;
    const dialogRef = this.dialog.open(DialogDeleteContentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(`Dialog result: ${this.getIdForTempTable}`);
    });
    this.ngOnInit();
  }

  // <<----=============================#####=============================---->>
  // Leitura do obj Voltage para obter IDs

  readVoltageToGetId() {
    if (this.gadgets_temp.voltage != undefined) {
      this.voltageService.readById(this.gadgets_temp.voltage!).subscribe((obj) => {
        this.gadgets_temp.voltage = obj.id!;
      });
    } else {
      this.voltageService.readById(1).subscribe((obj) => {
        this.gadgets_temp.voltage = obj.id!;
      });
    }
  }
}

@Component({
  selector: 'app-dialog-delete-content',
  templateUrl: 'dialog-delete-content.component.html',
  styleUrls: ['dialog-delete-content.component.scss'],
})
export class DialogDeleteContentComponent extends ContentComponentForm {
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
      console.log(`${this.gadgets_obj1.name} §§§§§§§§§§§§§§§§§§§§ --->>> DIALOG`);
    });
  }
}
