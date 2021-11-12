import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
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
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
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

  gadgetsFormControl = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required],
  });

  timeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*d*$'),
    Validators.min(1),
  ]);

  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*d*$'),
    Validators.min(1),
  ]);

  potencyFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*d*$'),
    Validators.min(1),
  ]);

  voltageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9 V]*d*$'),
    Validators.min(1),
  ]);

  amperageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*d*$'),
    Validators.min(1),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private gadgetsService: GadgetsService,
    private voltageService: VoltageService
  ) {}

  // <<----=============================#####=============================---->>

  // Teste do campo Aparelho
  testForm(): void {
    let inputGadgets = document.getElementById('input1') as HTMLInputElement;
    if (inputGadgets.value == ' ') {
      console.log(`JUREMA: ${inputGadgets.value}`);
      inputGadgets.value = ' ';
      // inputGadgets.setAttribute('disabled', 'disabled');
    } else {
      console.log(`JUREMA: ${inputGadgets.checkValidity()}`);
    }
  }

  // <<----=============================#####=============================---->>

  // Inicialização
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

    // Filtro por letra digitada
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // Leitura de objs default (digitados)
  link(id: number | undefined) {
    if (id != undefined) {
      return this.gadgetsService.readById(id).subscribe((obj) => {
        this.gadgets_obj1 = obj;
      });
    } else {
      return this.gadgetsService.readById(1).subscribe(console.log);
    }
  }

  // <<----=============================#####=============================---->>

  // Atualiza temp table
  refreshTableForm() {
    this.contentTable.readApiForNewObjs();
  }

  // Realiza cálculo
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

  // <<----=============================#####=============================---->>

  // Métodos privados
  private _filter(name: string): Gadgets[] {
    const filterValue = name.toLowerCase();

    return this.gadgets_obj.filter(
      (obj) => obj.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
