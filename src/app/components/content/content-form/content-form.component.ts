import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Gadgets } from 'src/app/model/gadgets.model';
import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { Voltage } from 'src/app/model/voltage.model';
import { VoltageService } from 'src/app/services/voltage.service';
import { GadgetsService } from 'src/app/services/gadgets.service';
import { GadgetsTempService } from 'src/app/services/gadgets-temp.service';
import { ContentTableComponent } from '../content-table/content-table.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { __spreadArray } from 'tslib';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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

  title: string = 'Calcule o seu gasto elétrico através dos campos abaixo:';

  energy: number = 0;
  price_all: number = 0;

  // Filtro autocomplete
  voltage_obj: Voltage[] = [];
  gadgets_obj: Gadgets[] = [];
  gadgets_temp_obj: GadgetsTemp[] = [];
  gadgets_obj1: Gadgets = {
    name: '',
    time: null,
    amount: null,
    potency: null,
    voltage: null,
    amperage: null,
    energy: null,
    price: null,
  };
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
  filteredOptions!: Observable<Gadgets[]>;

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

  public form: FormGroup;

  gadgetsFormControl = new FormControl('', [Validators.required, Validators.min(1)]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public formBuilder: FormBuilder,
    public gadgetsService: GadgetsService,
    public gadgetsTempService: GadgetsTempService,
    public voltageService: VoltageService
  ) {
    this.form = this.formBuilder.group({
      gadgetsField: [Validators.required],
      timeField: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      amountField: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      potencyField: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      voltageField: ['', [Validators.required, Validators.pattern('^[0-9 V]*$'), Validators.min(1)]],
      amperageField: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
    });
  }

  // <<----=============================#####=============================---->>
  //Teste do campo Aparelho
  // testForm(): void {
  //   let inputGadgets = document.getElementById('input1') as HTMLInputElement;
  //   let matError = document.getElementById('demo') as HTMLElement;
  //   if (this.gadgetsFormControl!) {
  //     console.log(`JUREMA: ${inputGadgets.value}`);
  //     matError.innerHTML! = 'Informação Incorreta!';
  //     // inputGadgets.setAttribute('disabled', 'disabled');
  //   } else {
  //     console.log(`JUREMA: ${inputGadgets.checkValidity()}`);
  //     // matError.innerHTML! = "<b>Obrigatório</b>";
  //   }
  // }

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
    this.filteredOptions = this.gadgetsFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // <<----=============================#####=============================---->>
  // Desativar botão

  isDisabled(): boolean {
    return !this.form.valid ? true : !this.gadgetsFormControl.valid ? true : false;
  }

  // <<----=============================#####=============================---->>
  // Criar objeto na tabela temporária

  createObjInTempTable(): void {
    this.calckWh();
    this.calc();
    this.gadgets_custom.name = this.gadgets_obj1.name;
    this.gadgets_custom.time = this.gadgets_obj1.time;
    this.gadgets_custom.amount = this.gadgets_obj1.amount;
    this.gadgets_custom.potency = this.gadgets_obj1.potency;
    this.gadgets_custom.voltage = this.gadgets_obj1.voltage;
    this.gadgets_custom.amperage = this.gadgets_obj1.amperage;
    this.gadgets_custom.energy = this.gadgets_obj1.energy;
    this.gadgets_custom.price = this.gadgets_obj1.price;
    this.gadgetsTempService.create(this.gadgets_custom).subscribe(() => {
      this.onSubmit();
      this.gadgetsTempService.showMessage('Aparelho Criado...');
      this.refreshTableForm();
    });
  }

  // verifyAmount(): void {
  //   let tinyInt: number[] = [];
  //   let allAmount: number[] = [];
  //   let index: number = 0;
  //   this.gadgetsTempService.read().subscribe((data) => {
  //     data.filter((obj) => {
  //       if (
  //         obj.name === this.gadgets_custom.name &&
  //         obj.time === this.gadgets_custom.time &&
  //         obj.potency === this.gadgets_custom.potency &&
  //         obj.voltage === this.gadgets_custom.voltage &&
  //         obj.amperage === this.gadgets_custom.amperage
  //       ) {
  //         allAmount[index] = obj.amount!;
  //         tinyInt[index] = obj.id!;
  //         index++;
  //       }
  //     });
  //     if (!isNaN(tinyInt[0]) && !isNaN(tinyInt[1]) && tinyInt[1] > 0) {
  //       this.gadgets_obj1.id = tinyInt[0];
  //       this.gadgets_obj1.amount = allAmount.reduce(
  //         (total, currentElement) => Number(total) + Number(currentElement)
  //       );
  //       // console.log(...tinyInt);
  //       this.deleteGadgets(tinyInt[1]);
  //       this.deleteGadgets(tinyInt[2]);
  //       this.updateGadgets(this.gadgets_obj1);
  //     }
  //   });
  // }

  // updateGadgets(gadget: GadgetsTemp): void {
  //   setTimeout(() => {
  //     this.gadgetsTempService.update(gadget).subscribe(() => {
  //       console.log(`ID do ELSE -> ${gadget.id}`);
  //       this.refreshTableForm();
  //     });
  //   }, 0);
  // }

  // deleteGadgets(id: number): void {
  //   setTimeout(() => {
  //     this.gadgetsTempService.delete(`${id}`).subscribe(() => {
  //       console.log(`ID DELETE FUNCTION -> ${id}`);
  //       this.refreshTableForm();
  //     });
  //   }, 100);
  // }

  // condition != 0
  // ? console.log(`Deu ruim`)
  // : this.gadgetsTempService.delete(`${tinyInt}`).subscribe(() => {
  //     console.log(`ID do ELSE -> ${obj.id}`);
  //     this.gadgetsTempService.showMessage('Produto excluído com sucesso');
  //   });

  // updateGadget() {
  //   this.gadgets_obj1.id = this.defaultService.getId();

  // }

  // verifyAmount(): void {
  //   this.gadgetsTempService.read().subscribe((array) => {
  //     array.filter((obj) => {
  //       if(obj.amount! === this.gadgets_custom.amount) {
  //         this.gadgets_custom.amount += obj.amount!;
  //         this.gadgetsTempService.deleteGadget();
  //         this.createObjInTempTable();
  //       }
  //     });
  //   })
  // }

  // <<----=============================#####=============================---->>
  // Leitura do obj Voltage para obter IDs

  readVoltageToGetId() {
    if (this.gadgets_obj1.voltage != undefined) {
      this.voltageService.readById(this.gadgets_obj1.voltage!).subscribe((obj) => {
        this.gadgets_obj1.voltage = obj.id!;
      });
    } else {
      this.voltageService.readById(1).subscribe((obj) => {
        this.gadgets_obj1.voltage = obj.id!;
      });
    }
  }

  // <<----=============================#####=============================---->>
  // Leitura de objs default (digitados)

  link(id: number | undefined) {
    if (id != undefined) {
      return this.gadgetsService.readById(id).subscribe((obj) => {
        this.gadgets_obj1 = obj;
        this.readVoltageToGetId();
      });
    } else {
      return this.gadgetsService.readById(1).subscribe(console.log);
    }
  }

  // <<----=============================#####=============================---->>
  // Verificar campo potência e desativa outros campos.

  verifyPotencyAndDisableFields(): void {
    console.log(!this.potency?.errors);
    if (!this.potency?.errors) {
      this.gadgets_obj1.amperage = null;
      this.gadgets_obj1.voltage = null;

      this.voltage?.disable();
      this.amperage?.disable();
      // inputAmperage.setAttribute('disabled', 'disabled');
    } else {
      this.voltage?.enable();
      this.amperage?.enable();
      // inputAmperage.removeAttribute('disabled');
    }
  }

  // <<----=============================#####=============================---->>
  // Verificar campo potência e desativa outros campos.
  verifyVoltageOrAmperageAndDisableFields() {
    let potency = 0;
    let amperage = 0;
    let voltage = 0;
    if (this.amperage?.valid && this.voltage?.valid) {
      if (this.voltage?.value === '1') {
        voltage = 127;
        amperage = this.amperage?.value;
      } else {
        voltage = 220;
        amperage = this.amperage?.value;
      }

      potency = amperage * voltage;
      this.gadgets_obj1.potency = potency;
      this.potency?.disable();
    } else {
      this.gadgets_obj1.potency = null;
      this.potency?.enable();
    }
  }

  // <<----=============================#####=============================---->>
  // Atualiza temp table
  refreshTableForm() {
    this.contentTable.readApiForNewObjs();
  }

  // <<----=============================#####=============================---->>
  // Realiza a consulta por obj -> price
  getSumAllPrices(): void {
    this.price_all = 0;
    let a: number = 0;
    this.gadgetsTempService.read().subscribe((obj) => {
      obj.filter((gadget) => {
        if (gadget === undefined) {
        } else {
          this.price_all += gadget.price!;
          console.log(a);
        }
      });
    });
  }

  // <<----=============================#####=============================---->>
  // Realiza a conversão do kWh para R$
  calckWh(): number {
    return Math.round((this.energy = (this.gadgets_obj1.potency! * (this.gadgets_obj1.time! / 60)) / 1000));
  }

  // <<----=============================#####=============================---->>
  // Realiza a conversão do kWh para R$
  calc(): void {
    this.gadgets_obj1.energy = this.calckWh();
    this.gadgets_obj1.price = this.calckWh() * 0.8361 * this.gadgets_obj1.amount!;
    this.price_all += this.gadgets_obj1.price;
    console.log(`Energia R$ ${this.gadgets_obj1.price}`);
  }

  // <<----=============================#####=============================---->>
  // Métodos privados
  private _filter(name: string): Gadgets[] {
    const filterValue = name.toLowerCase();

    return this.gadgets_obj.filter((obj) => obj.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // <<----=============================#####=============================---->>
  // Métodos GETs

  get gadgets() {
    return this.form.get('gadgetsField');
  }

  get time() {
    return this.form.get('timeField');
  }

  get amount() {
    return this.form.get('amountField');
  }

  get potency() {
    return this.form.get('potencyField');
  }

  get voltage() {
    return this.form.get('voltageField');
  }

  get amperage() {
    return this.form.get('amperageField');
  }

  // <<----=============================#####=============================---->>
  // OnSubmit
  onSubmit() {
    console.log(this.form.value);
  }
}
