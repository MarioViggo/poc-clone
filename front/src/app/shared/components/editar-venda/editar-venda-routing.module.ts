import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarVendaComponent } from './editar-venda.component';

const routes: Routes = [
  {
    path: '',
    component: EditarVendaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarVendaRoutingModule {}