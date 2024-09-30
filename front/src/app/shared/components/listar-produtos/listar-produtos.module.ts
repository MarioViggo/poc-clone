import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { ListarProdutosComponent } from './listar-produtos.component'
import { ListarProdutosRoutingModule } from './listar-produtos-routing'

@NgModule({
  declarations: [ListarProdutosComponent],
  imports: [CommonModule, ListarProdutosRoutingModule, SharedModule]
})
export class ListarProdutosModule {}