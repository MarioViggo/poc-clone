import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFuncionariosComponent } from './listar-funcionarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListarFuncionariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarFuncionariosRoutingModule {}