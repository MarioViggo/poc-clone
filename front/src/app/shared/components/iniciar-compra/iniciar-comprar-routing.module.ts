import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarCompraComponent } from './iniciar-compra.component';
const routes: Routes = [
  {
    path: '',
    component: IniciarCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarCompraRoutingModule {}