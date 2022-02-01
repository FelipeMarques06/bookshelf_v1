import { MatDialog } from '@angular/material/dialog';
import { Sagas } from './../modelosInterface/sagas';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { catchError, fromEvent, Observable,filter, debounceTime, distinctUntilChanged, tap, of } from 'rxjs';
import { SagasService } from '../servicosInterface/sagas.service';
import { map } from 'rxjs/operators';
import { SagasDialogoComponent } from '../sagas-dialogo/sagas-dialogo.component';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sagas',
  templateUrl: './sagas.component.html',
  styleUrls: ['./sagas.component.scss']
})
export class SagasComponent implements AfterViewInit {

  sagas$: Observable<Sagas[]>;
  result$?: Observable<Sagas[]>
  value!: string;

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

  @ViewChild('searchInput') searchInput!: ElementRef

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        const query = this.searchInput.nativeElement.value
        // console.log(query)
        if(query) {
          this.result$ = this.sagasService.pesquisar(query)
          console.log(this.result$)
        } else {
          this.result$ = undefined
        }
      })
    ).subscribe()
  }

  abrirSagas(livros: [{nome:string}]){
    this.telaSagas.open(SagasDialogoComponent,{
      data: livros
    })
  }
}
