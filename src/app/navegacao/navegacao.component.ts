import { NavegacaoLivrosService } from './../servicosInterface/navegacao-livros.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LivrosNavegador } from '../modelosInterface/livrosNavegador';

import { AppLoginComponent } from './../app-login/app-login.component';
import { MenuNavegador } from './../modelosInterface/menuNavegador';
import { AutenticacaoFirebaseService } from './../servicosInterface/autenticacao-firebase.service';
import { NavegacaoService } from './../servicosInterface/navegacao.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {
  usuario$ = this.autenticacaoFirebaseService.usuarioLogado$;
  //Itens co menu principal.
  logoMenu='../../assets/imagens/logoBS4.png';
  //Itens de icones e imagens de navegação.
  iconeGeral='../../assets/imagens/ShelfBook.png';
  lIcone=80;
  aIcone=80;
  //Controle das rotas do menu.
  itensMenu$: Observable<MenuNavegador[]>
  livrosMenu$: Observable<LivrosNavegador[]>
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
      private breakpointObserver: BreakpointObserver,
      private telaLogin: MatDialog,
      private rotas: Router,
      private autenticacaoFirebaseService: AutenticacaoFirebaseService,
      private navegadorService: NavegacaoService,
      private navegacaoLivrosService: NavegacaoLivrosService
  ) {
      this.itensMenu$ = navegadorService.listagemMenu()
      .pipe(
        catchError(error =>{
          return of([])
        })
      )
      this.livrosMenu$ = navegacaoLivrosService.listagemMenu()
      .pipe(
        catchError(error =>{
          return of([])
        })
      )

    }

    abrirLogin(erroMsg: string){
      this.telaLogin.open(AppLoginComponent,{
        data: erroMsg
      })
    }

    sairUsuario(){
      this.autenticacaoFirebaseService.sairLogin().subscribe(() =>{
        this.rotas.navigate([''])
      })
    }

    innerWidth!: number;
    ngOnInit(): void {
      this.innerWidth = window.innerWidth;

    }

    @HostListener('window:resize', ['$event'])
    onResize(event:number) {
      this.innerWidth = window.innerWidth;
      // console.log(this.innerWidth)
    }
}
