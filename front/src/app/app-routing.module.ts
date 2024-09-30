import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';

const routes: Routes = [
  {
    path: '', 
    component: HeaderComponent, 
    children: [
    {
      path: '',
      loadChildren: () =>
        import('./shared/components/home/home-routing.module').then((m) => m.HomeRoutingModule),
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./shared/components/login/login-routing.module').then((m) => m.LoginRoutingModule),
    },
    {
      path: 'cadastrar-produto',
      loadChildren: () =>
        import('./shared/components/cadastrar-produto/cadastrar-produto.module').then((m) => m.CadastrarProdutoModule),
    },
    {
      path: 'cadastrar-produto',
      loadChildren: () =>
        import('./shared/components/cadastrar-produto/cadastrar-produto.module').then((m) => m.CadastrarProdutoModule),
    },
    {
      path: 'cadastrar-funcionario',
      loadChildren: () =>
        import('./shared/components/cadastrar-funcionario/cadastrar-funcionario.module').then((m) => m.CadastrarFuncionarioModule),
    },
    {
      path: 'editar-funcionario/:id',
      loadChildren: () =>
        import('./shared/components/editar-funcionario/editar-funcionario.module').then((m) => m.EditarFuncionarioModule),
    },
    {
      path: 'editar-produto/:id',
      loadChildren: () =>
        import('./shared/components/editar-produto/editar-produto.module').then((m) => m.EditarProdutoModule),
    },
    {
      path: 'editar-venda/:id',
      loadChildren: () =>
        import('./shared/components/editar-venda/editar-venda.module').then((m) => m.EditarVendaModule),
    },
    {
      path: 'listar-produtos',
      loadChildren: () =>
        import('./shared/components/listar-produtos/listar-produtos.module').then((m) => m.ListarProdutosModule),
    },
    {
      path: 'listar-vendas',
      loadChildren: () =>
        import('./shared/components/listar-vendas/listar-vendas.module').then((m) => m.ListarVendasModule),
    },
    {
      path: 'listar-usuarios',
      loadChildren: () =>
        import('./shared/components/listar-funcionarios/listar-funcionarios.module').then((m) => m.ListarFuncionariosModule),
    },
    {
      path: 'iniciar-compra',
      loadChildren: () =>
        import('./shared/components/iniciar-compra/iniciar-comprar.module').then((m) => m.IniciarCompraModule),
    },
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
