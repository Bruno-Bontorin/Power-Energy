import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DefaultService {
  public id: number = 0;

  constructor() {}

  public setId(id: number) {
    id <= 0 ? 0 : (this.id = id);
  }

  public getId(): number {
    return this.id;
  }
}
