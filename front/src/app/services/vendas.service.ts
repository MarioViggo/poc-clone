import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '@app/models/Produto';
import { ProdutoVenda } from '@app/models/ProdutoVenda';
import { Venda } from '@app/models/Venda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'http://localhost:3000/vendas';
  constructor(private http: HttpClient) { }

  registrar(carrinho: any[], valor: number) {
    let produtos = [];
    console.log("carrinho", carrinho)
    let funcionario = JSON.parse(localStorage.getItem("user_logged"))
    for (let produto of carrinho) {
      produtos.push(produto)
    }

    let body = {
      data_da_venda: new Date(),
      valor_total: valor, 
      lista_de_produtos: produtos,
      funcionario: funcionario.user._id
    }

    return this.http.post(`${this.apiUrl}/cadastrarVenda`, body)
  }
  gerarPix(valor_total: number, descricao: string, cpf: string) {
    let funcionario = JSON.parse(localStorage.getItem("user_logged"))
    let today = new Date()
    let body = {
      due: today.setHours(today.getHours() + 4),
      valor: valor_total, 
      cpf: cpf,
      email: funcionario.user.email,
      descricao: descricao,
    }

    return this.http.post(`${this.apiUrl}/gerarPix`, body)
  }

  gerarComprovante(carrinho: Produto[], valor: number, venda_id: string) {
    let produtos = [];
    let funcionario = JSON.parse(localStorage.getItem("user_logged"))
    for (let produto of carrinho) {
      produtos.push(produto)
    }

    let body = {
      data_da_venda: new Date(),
      valor_total: valor, 
      lista_de_produtos: produtos,
      funcionario: funcionario.user,
      status: "concluida",
      venda_id: venda_id
    }

    return this.http.post(`${this.apiUrl}/gerarComprovante`, body, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    })
  }

  getAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.apiUrl}/listarVendas`);
  }

  obterVendasProdutos(id: string): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/obterProdutosVenda/${id}`)
  }

  cancelar(id: string) {
    return this.http.delete<Venda>(`${this.apiUrl}/cancelarVenda/${id}`)
  }

  removeProdutoVenda(vendaId: string, produto: ProdutoVenda) {
    return this.http.post<Produto[]>(`${this.apiUrl}/removerProdutoVenda/${vendaId}`, produto) 
  }

  editar(venda: Venda) {
    return this.http.post(`${this.apiUrl}/editarVenda/${venda._id}`, venda)
  }
}
