import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '@app/models/Produto';
import { VendasService } from '@app/services/vendas.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutoVenda } from '@app/models/ProdutoVenda';
@Component({
  selector: 'app-listar-venda-produtos',
  templateUrl: './listar-venda-produtos.component.html',
  styleUrls: ['./listar-venda-produtos.component.css']
})
export class ListarVendaProdutosComponent implements OnInit {
  @Input() vendaProdutos: ProdutoVenda[];

  constructor(private vendasService: VendasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  removerProduto(produto: ProdutoVenda) {
    let vendaId = this.route.snapshot.paramMap.get('id')
    this.vendasService.removeProdutoVenda(vendaId, produto).subscribe();
    this.vendaProdutos = this.vendaProdutos.filter(prod => {
      if (produto._id == prod._id) {
        if (produto.quantidade == 1) {
          produto.produto.estoque += 1
          return false 
        } 
        if (produto.quantidade > 1) {
          produto.quantidade = produto.quantidade - 1
          produto.produto.estoque += 1
          return produto
        }
      }
      if (produto._id != prod._id) return produto
    })
  }

}
