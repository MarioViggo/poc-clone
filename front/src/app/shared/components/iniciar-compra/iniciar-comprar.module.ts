import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { IniciarCompraComponent } from './iniciar-compra.component';
import { IniciarCompraRoutingModule } from './iniciar-comprar-routing.module';

@NgModule({
  declarations: [IniciarCompraComponent],
  imports: [CommonModule, IniciarCompraRoutingModule, SharedModule]
})
export class IniciarCompraModule {}