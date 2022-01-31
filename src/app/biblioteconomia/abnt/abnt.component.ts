import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AutenticacaoFirebaseService } from './../../servicosInterface/autenticacao-firebase.service';
import { ABNT } from './../modelos/abnt';
import { AbntService } from './../services/abnt.service';

@Component({
  selector: 'app-abnt',
  templateUrl: './abnt.component.html',
  styleUrls: ['./abnt.component.scss']
})
export class AbntComponent {

  cards$: Observable<ABNT[]>;
  usuario$= this.autenticacaoFirebaseService.usuarioLogado$;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.cards$;
      }
      return this.cards$;
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private abntService: AbntService,
    private autenticacaoFirebaseService: AutenticacaoFirebaseService
    ) {
      this.cards$ = abntService.listagemCards()
      .pipe(
        catchError(error =>{
          return of([])
        })
      )
    }
}
