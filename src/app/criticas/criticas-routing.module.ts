import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriticaComponent } from './critica/critica.component';

const routes: Routes = [
  {
    path:'', component:CriticaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriticasRoutingModule { }
