import { Sagas } from './../modelosInterface/sagas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SagasService {

  private readonly uriApi ="../../assets/sagas.json"

  constructor(private sagasDashboard: HttpClient) { }

  listagemSagas () {
    return this.sagasDashboard.get<Sagas[]>(this.uriApi)
    .pipe(
      first(),
      tap(apiSagas => console.log(apiSagas))
    )
  }
}
