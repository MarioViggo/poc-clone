import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarVendasComponent } from './listar-vendas.component';

const routes: Routes = [
  {
    path: '',
    component: ListarVendasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarVendasRoutingModule {}