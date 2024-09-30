import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../../shared.module';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario.component'
import { CadastrarFuncionarioRoutingModule } from './cadastrar-funcionario-routing.module'
import { FuncionarioFormComponent } from '../funcionario-form/funcionario-form.component';
@NgModule({
  declarations: [CadastrarFuncionarioComponent, FuncionarioFormComponent],
  imports: [CommonModule, CadastrarFuncionarioRoutingModule, SharedModule]
})
export class CadastrarFuncionarioModule {}