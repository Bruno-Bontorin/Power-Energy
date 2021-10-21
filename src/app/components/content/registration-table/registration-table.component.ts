import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-registration-table',
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.scss'],
})
export class RegistrationTableComponent implements OnInit {
  gadgets_temp_obj: GadgetsTemp[] = [];
  // Table
  displayedColumns: string[] = [
    'id',
    'name',
    'amount',
    'time',
    'potency',
    'amperage',
  ];

  constructor(private gadgetsTempService: GadgetsTempService) {}

  ngOnInit(): void {
    // Leitura geral do banco GadgetsTemp
    this.gadgetsTempService.read().subscribe((gadgets_temp) => {
      this.gadgets_temp_obj = gadgets_temp;
      console.log(gadgets_temp);
    });
  }

  public refreshTable() {
    console.log(`Teste`);
    this.ngOnInit();
  }
}
