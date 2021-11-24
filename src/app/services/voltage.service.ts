import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Voltage } from 'src/app/model/voltage.model';

@Injectable({
  providedIn: 'root',
})
export class VoltageService {
  baseUrl = 'http://localhost:3001/voltage';

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

  // Realiza a leitura do banco de dados
  read(): Observable<Voltage[]> {
    return this.http.get<Voltage[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Faz a leitura por meio do Id do produto
  readById(id: number): Observable<Voltage> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Voltage>(url).pipe(
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
