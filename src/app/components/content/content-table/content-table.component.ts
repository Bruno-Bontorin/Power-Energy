import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { ContentTableDataSource } from './content-table-datasource';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'amount', 'time', 'potency', 'amperage'];

  gadgets_temp: GadgetsTemp[] = [];

  constructor(private gadgetsTempService: GadgetsTempService) {
    this.dataSource = new ContentTableDataSource(gadgetsTempService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public refreshTable(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

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
