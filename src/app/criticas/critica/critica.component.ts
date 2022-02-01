import { Critica } from './../modelos/critica';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CriticaService } from '../service/critica.service';

@Component({
  selector: 'app-critica',
  templateUrl: './critica.component.html',
  styleUrls: ['./critica.component.scss']
})
export class CriticaComponent {

  criticas$: Observable<Critica[]>;
  criticas= this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.criticas$;
      }
      return this.criticas$;
    })
  )

  constructor(
    private breakpointObserver: BreakpointObserver,
    private criticaService: CriticaService
  ) {
    this.criticas$ = criticaService.listagemCriticas()
      .pipe(
        catchError(error =>{
          return of([])
        })
      )
  }
}
