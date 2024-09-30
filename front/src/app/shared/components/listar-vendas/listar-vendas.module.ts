import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { ListarVendasComponent } from './listar-vendas.component'
import { ListarVendasRoutingModule } from './listar-vendas-routing.module'
import { ListarVendaProdutosComponent } from '../listar-venda-produtos/listar-venda-produtos.component';
import { ListarProdutosDaVendaComponent } from '../listar-produtos-da-venda/listar-produtos-da-venda.component';
@NgModule({
  declarations: [ListarVendasComponent, ListarProdutosDaVendaComponent],
  imports: [CommonModule, ListarVendasRoutingModule, SharedModule]
})
export class ListarVendasModule {}