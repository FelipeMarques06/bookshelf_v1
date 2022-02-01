import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Sugestoes } from '../modelosInterface/sugestoes';
import { SugestoesService } from '../servicosInterface/sugestoes.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent {

  cards$: Observable <Sugestoes[]>;
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
    private sugestoesService: SugestoesService,
  ) {
    this.cards$ = sugestoesService.listagemSugestoes()
    .pipe(
      catchError(error =>{
        return of([])
      })
    );
  }
}
