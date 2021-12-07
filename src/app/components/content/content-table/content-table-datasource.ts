import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export class ContentTableDataSource extends DataSource<GadgetsTemp> {
  data: GadgetsTemp[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(public gadgetsTempService: GadgetsTempService) {
    super();
  }

  connect(): Observable<GadgetsTemp[]> {
    this.read();
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: GadgetsTemp[]): GadgetsTemp[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: GadgetsTemp[]): GadgetsTemp[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id':
          return compare(+a.id!, +b.id!, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'amount':
          return compare(+a.amount!, +b.amount!, isAsc);
        case 'time':
          return compare(+a.time!, +b.time!, isAsc);
        case 'potency':
          return compare(+a.potency!, +b.potency!, isAsc);
        case 'amperage':
          return compare(+a.amperage!, +b.amperage!, isAsc);
        case 'energy':
          return compare(+a.energy!, +b.energy!, isAsc);
        case 'price':
          return compare(+a.price!, +b.price!, isAsc);
        case 'voltage':
          return compare(+a.voltage!, +b.voltage!, isAsc);
        default:
          return 0;
      }
    });
  }

  private read(): void {
    this.gadgetsTempService.read().subscribe((gadgets_temp) => {
      this.data = gadgets_temp;
      console.log(`ComponentTable - GadgetsTemp DataSource`);
      console.log(gadgets_temp);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
