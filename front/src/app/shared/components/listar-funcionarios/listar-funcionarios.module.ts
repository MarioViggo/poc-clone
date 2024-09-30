import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ListarFuncionariosComponent } from './listar-funcionarios.component';
import { ListarFuncionariosRoutingModule } from './listar-funcionarios-routing.module';

@NgModule({
  declarations: [ListarFuncionariosComponent],
  imports: [CommonModule, ListarFuncionariosRoutingModule, SharedModule]
})
export class ListarFuncionariosModule {}