import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { EditarFuncionarioComponent } from './editar-funcionario.component'
import { EditarFuncionarioRoutingModule } from './editar-funcionario-routing.module'
import { EditarFuncionarioFormComponent } from '../editar-funcionario-form/editar-funcionario-form.component';

@NgModule({
  declarations: [EditarFuncionarioComponent, EditarFuncionarioFormComponent],
  imports: [CommonModule, EditarFuncionarioRoutingModule, SharedModule]
})
export class EditarFuncionarioModule {}