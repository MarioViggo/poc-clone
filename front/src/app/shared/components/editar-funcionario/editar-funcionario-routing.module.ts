import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarFuncionarioComponent } from './editar-funcionario.component';

const routes: Routes = [
  {
    path: '',
    component: EditarFuncionarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarFuncionarioRoutingModule {}