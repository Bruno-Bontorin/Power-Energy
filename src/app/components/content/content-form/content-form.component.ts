import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { async, Observable, of, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Gadgets } from 'src/app/model/gadgets.model';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { Voltage } from 'src/app/model/voltage.model';
import { VoltageService } from 'src/app/services/voltage.service';
import { GadgetsService } from 'src/app/services/gadgets.service';
import { ContentTableComponent } from '../content-table/content-table.component';

@Component({
  selector: 'app-content-form',
  templateUrl: 'content-form.component.html',
  styleUrls: ['content-form.component.scss'],
})
export class ContentComponentForm implements OnInit {
  @ViewChild(ContentTableComponent, { static: false })
  contentTable!: ContentTableComponent;

  title: string = 'Calcule o seu gasto elétrico através dos campos abaixo';

  // Variáveis globais
  energy: number = 0;
  taxa: number = 0;

  // Filtro autocomplete
  myControl = new FormControl();
  voltage_obj: Voltage[] = [];
  gadgets_obj: Gadgets[] = [];
  gadgets_temp_obj: GadgetsTemp[] = [];
  gadgets_obj1: Gadgets = {
    name: '',
    amount: null,
    time: null,
    potency: null,
    amperage: null,
  };
  filteredOptions!: Observable<Gadgets[]>;

  // Table
  displayedColumns: string[] = [
    'id',
    'name',
    'amount',
    'time',
    'potency',
    'amperage',
  ];

  constructor(
    private gadgetsService: GadgetsService,
    private voltageService: VoltageService
  ) {}

  ngOnInit() {
    // Leitura geral do banco Gadgets
    this.gadgetsService.read().subscribe((gadgets) => {
      this.gadgets_obj = gadgets;
      console.log(`ComponentForm - Gadgets`);
      console.log(gadgets);
    });

    // Leitura para Voltage
    this.voltageService.read().subscribe((voltage) => {
      this.voltage_obj = voltage;
      console.log(`ComponentForm - Voltage`);
      console.log(voltage);
    });

    // Leitura por ID
    // const id = +this.route.snapshot.paramMap.get('id')!;
    // this.gadgetsService.readById(id).subscribe((obj) => {
    //   this.gadgets_obj1 = obj;
    // });

    // Filtro por letra digitada
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  link(id: number | undefined) {
    if (id != undefined) {
      return this.gadgetsService.readById(id).subscribe((obj) => {
        this.gadgets_obj1 = obj;
      });
    } else {
      return this.gadgetsService.readById(1).subscribe(console.log);
    }
  }

  // calc(id: number | undefined) {
  //   if (id != undefined) {
  //     let energy: number = 0;
  //     this.gadgetsService.readById(id).subscribe((obj) => {
  //       this.gadgets_obj1 = obj;
  //       energy =
  //         ((this.gadgets_obj1.potency! * (this.gadgets_obj1.time! / 60)) /
  //           1000) *
  //         0.142;
  //       this.energy = energy;
  //       return console.log(`Energia R$ ${energy}`);
  //     });
  //   }
  // }

  refreshTableForm() {
    this.contentTable.readApiForNewObjs();
  }

  // createObjTableForms() {
  //   this.registrationTable?.createObjTable();
  // }

  calc(): void {
    let energy: number = 0;
    energy =
      (this.gadgets_obj1.potency! * (this.gadgets_obj1.time! / 60)) / 1000;
    if (energy >= 100) {
      this.energy = energy * 0.839 + 14.2;
      console.log(`Energia 1 R$ ${this.energy}`);
    } else {
      this.energy = energy;
      console.log(`Energia 2 R$ ${this.energy}`);
    }
    this.refreshTableForm();
    console.log(`Energia R$ ${energy}`);
  }

  // public getObj(id: number): Gadgets[] {
  //   const mocked: Gadgets[] = this.gadgetsService.readById(id);
  //   return mocked;
  // }

  // Funções privadas
  private _filter(name: string): Gadgets[] {
    const filterValue = name.toLowerCase();

    return this.gadgets_obj.filter(
      (obj) => obj.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  //Métodos
  // refresh(id: number | undefined): Promise<void> {
  //   if (id === undefined) {
  //     console.log(`Undefined: ${id}`);
  //     return this.gadgetsService
  //       .readById(0)
  //       .forEach((obj) => (this.gadgets_obj = obj));
  //   }
  // }
}