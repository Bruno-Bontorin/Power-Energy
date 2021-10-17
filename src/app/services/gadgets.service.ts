import { catchError, map } from 'rxjs/operators';
import { Gadgets } from '../model/gadgets.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GadgetsService {
  baseUrl = 'http://localhost:3001/gadgets';

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
  create(gadgets: Gadgets): Observable<Gadgets> {
    // iniciando requisição ao backend
    // Post = permite incerir dados no Banco de dados
    return this.http.post<Gadgets>(this.baseUrl, gadgets).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Realiza a leitura do banco de dados
  read(): Observable<Gadgets[]> {
    return this.http.get<Gadgets[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Faz a leitura por meio do Id do produto
  readById(id: number): Observable<Gadgets> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Gadgets>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método update para atualizar um item da tabela
  update(gadgets: Gadgets): Observable<Gadgets> {
    const url = `${this.baseUrl}/${gadgets.id}`;
    return this.http.put<Gadgets>(url, gadgets).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Realiza a leitura do banco de dados
  delete(id: string): Observable<Gadgets> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Gadgets>(url).pipe(
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
