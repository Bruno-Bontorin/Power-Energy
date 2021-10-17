import { catchError, map } from 'rxjs/operators';
import { GadgetsTemp } from '../model/gadgets-temp.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GadgetsTempService {
  baseUrl = 'http://localhost:3001/gadgets_temp';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

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

  // Realiza a leitura do banco de dados
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
}
