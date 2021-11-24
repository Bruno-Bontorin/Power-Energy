import { AfterViewInit, Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { ContentTableDataSource } from './content-table-datasource';

@Pipe({ name: 'maskVoltage' })
export class MaskVoltage implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return value == 1 ? 127 : 220;
  }
}

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss'],
})
export class ContentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GadgetsTemp>;
  dataSource: ContentTableDataSource;

  public sendIdForTempTable: number = 0;
  energy: number = 0;

  // Table
  displayedColumns = [
    'id',
    'name',
    'time',
    'amount',
    'potency',
    'voltage',
    'amperage',
    'energy',
    'price',
    'action',
  ];

  gadgets_temp: GadgetsTemp[] = [];
  gadgets_custom: GadgetsTemp = {
    name: '',
    time: null,
    amount: null,
    potency: null,
    voltage: null,
    amperage: null,
    energy: null,
    price: null,
  };

  constructor(public gadgetsTempService: GadgetsTempService) {
    this.dataSource = new ContentTableDataSource(gadgetsTempService);
  }

  public getIdObj(id: number) {
    this.gadgetsTempService.getIdObj(id);
    this.sendIdForTempTable = this.gadgetsTempService.getIdObj(id);
    console.log(`${this.sendIdForTempTable} -------->>>>>>>>>>>>>>> ID ID ID ID IDS`);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public refreshTable(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public readByIdObj() {}

  public readApiForNewObjs(): void {
    this.gadgetsTempService.read().subscribe((data) => {
      this.dataSource.data = data;
      console.log(`ComponentTable - DataSource Refresh`);
      console.log(this.dataSource.data);
      console.log(`ComponentTable - RefreshTable`);
      this.refreshTable();
    });
  }
}
