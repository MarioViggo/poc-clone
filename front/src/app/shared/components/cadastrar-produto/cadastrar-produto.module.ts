import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { CadastrarProdutoComponent } from './cadastrar-produto.component'
import { CadastrarProdutoRoutingModule } from './cadastrar-produto-routing.module'
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';

@NgModule({
  declarations: [CadastrarProdutoComponent, ProdutosFormComponent],
  imports: [CommonModule, CadastrarProdutoRoutingModule, SharedModule]
})
export class CadastrarProdutoModule {}