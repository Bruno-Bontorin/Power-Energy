import { Component, OnInit } from '@angular/core';
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
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';

@Component({
  selector: 'app-content-forms',
  templateUrl: 'content-forms.component.html',
  styleUrls: ['content-forms.component.scss'],
})
export class ContentComponentForms implements OnInit {
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
    private gadgetsTempService: GadgetsTempService,
    private voltageService: VoltageService
  ) {}

  ngOnInit() {
    // Leitura geral do banco Gadgets
    this.gadgetsService.read().subscribe((gadgets) => {
      this.gadgets_obj = gadgets;
      console.log(gadgets);
    });

    // Leitura geral do banco GadgetsTemp
    this.gadgetsTempService.read().subscribe((gadgets_temp) => {
      this.gadgets_temp_obj = gadgets_temp;
      console.log(gadgets_temp);
    });

    // Leitura para Voltage
    this.voltageService.read().subscribe((voltage) => {
      this.voltage_obj = voltage;
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
