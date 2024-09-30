import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { EditarProdutoComponent } from './editar-produto.component'
import { EditarProdutoRoutingModule } from './editar-produto-routing.module'
import { EditarProdutoFormComponent } from '../editar-produto-form/editar-produto-form.component'
@NgModule({
  declarations: [EditarProdutoComponent, EditarProdutoFormComponent],
  imports: [CommonModule, EditarProdutoRoutingModule, SharedModule]
})
export class EditarProdutoModule {}