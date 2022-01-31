import { Sugestoes } from './../modelosInterface/sugestoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SugestoesService {

  private readonly uriAPI = '../../assets/sugestoes.json';

  constructor(private listaSug: HttpClient) { }

  listagemSugestoes() {
    return this.listaSug.get<Sugestoes[]>(this.uriAPI)
    .pipe (
      first(),
      delay(500),
      tap(apiSugestoes => console.log(apiSugestoes))
    )
  }
}
