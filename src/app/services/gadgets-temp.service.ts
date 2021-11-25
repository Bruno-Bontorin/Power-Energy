import { GadgetsTemp } from 'src/app/model/gadgets-temp.model';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GadgetsTempService {
  baseUrl = 'http://localhost:3001/gadgets_temp';
  id: number = 0;

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute) {}

  showMessage(msg: string, isError: boolean = true): void {
    // Dentro das '' coloca-se a ação desejada. O 'X' irá permitir fechar o pop-up antes dos 3 segundos
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-success'] : ['msg-error'],
    });
  }

  // Gadgets = parâmetro
  // retorna um Observable de Produtos
  create(gadgets: GadgetsTemp): Observable<GadgetsTemp> {
    // iniciando requisição ao backend
    // Post = permite incerir dados no Banco de dados
    return this.http.post<GadgetsTemp>(this.baseUrl, gadgets).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Realiza a leitura do banco de dados
  read(): Observable<GadgetsTemp[]> {
    return this.http.get<GadgetsTemp[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Faz a leitura por meio do Id do produto
  readById(id: number): Observable<GadgetsTemp> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<GadgetsTemp>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método update para atualizar um item da tabela
  update(gadgets: GadgetsTemp): Observable<GadgetsTemp> {
    const url = `${this.baseUrl}/${gadgets.id}`;
    return this.http.put<GadgetsTemp>(url, gadgets).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Realiza a leitura do banco de dados para deletar o item escolhido.
  delete(id: string): Observable<GadgetsTemp> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<GadgetsTemp>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Verifica se tem erro.
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', false);
    return EMPTY;
  }

  // <<----=============================#####=============================---->>
  // Funções públicas

  public getIdObj(id: number): number {
    console.log(`ID do CONDITION -> ${id}`);
    return id <= 0 ? 0 : (this.id = id);
  }

  public deleteGadget() {
    console.log(this.id);
    this.getIdObj(this.id) == 0
      ? // True
        console.log(`ID do IF -> ${this.id}`)
      : // False
        this.delete(`${this.id}`).subscribe(() => {
          console.log(`ID do ELSE -> ${this.id}`);
          this.showMessage('Produto excluído com sucesso');
        });
  }

  public updateGadget(gadgets: GadgetsTemp) {
    this.calc(gadgets);

    this.update(gadgets).subscribe(() => {
      console.log(`ID do ELSE -> ${gadgets}`);
      this.showMessage('Produto atualizado com sucesso');
    });
  }

  energy: number = 0;

  // <<----=============================#####=============================---->>
  // Realiza a conversão do kWh para R$
  calckWh(gadgets: GadgetsTemp): number {
    return Math.round((this.energy = (gadgets.potency! * (gadgets.time! / 60)) / 1000));
  }

  // <<----=============================#####=============================---->>
  // Realiza a conversão do kWh para R$
  calc(gadgets: GadgetsTemp): void {
    gadgets.energy = this.calckWh(gadgets);
    if (gadgets.energy >= 100) {
      gadgets.price = Math.round(gadgets.energy * 0.839 + 14.2);
      console.log(`Energia 1 R$ ${gadgets.price}`);
    } else {
      gadgets.price = Math.round(this.calckWh(gadgets));
      console.log(`Energia 2 R$ ${gadgets.price}`);
    }
    console.log(`Energia R$ ${gadgets.energy}`);
  }
}
