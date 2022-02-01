import { MatDialog } from '@angular/material/dialog';
import { Sagas } from './../modelosInterface/sagas';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SagasService } from '../servicosInterface/sagas.service';
import { map } from 'rxjs/operators';
import { SagasDialogoComponent } from '../sagas-dialogo/sagas-dialogo.component';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sagas',
  templateUrl: './sagas.component.html',
  styleUrls: ['./sagas.component.scss']
})
export class SagasComponent {

  sagas$: Observable<Sagas[]>;
  sagas= this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.sagas$;
      }
      return this.sagas$;
    })
  )

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sagasService: SagasService,
    private telaSagas: MatDialog
  ) {
    this.sagas$ = sagasService.listagemSagas()
      .pipe(
        catchError(error =>{
          return of([])
        })
      )
  }

  abrirSagas(livros: [{nome:string}]){
    this.telaSagas.open(SagasDialogoComponent,{
      data: livros
    })
  }
}
