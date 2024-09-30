import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { EditarVendaComponent } from './editar-venda.component'
import { EditarVendaRoutingModule } from './editar-venda-routing.module'
import { EditarVendaFormComponent } from '../editar-venda-form/editar-venda-form.component';
import { ListarVendaProdutosComponent } from '../listar-venda-produtos/listar-venda-produtos.component'

@NgModule({
  declarations: [EditarVendaComponent, EditarVendaFormComponent, ListarVendaProdutosComponent],
  imports: [CommonModule, EditarVendaRoutingModule, SharedModule]
})
export class EditarVendaModule {}