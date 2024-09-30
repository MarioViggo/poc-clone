import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';
// import { FormData }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProdutoService {
    private apiUrl = 'http://localhost:3000/produtos';
    produtos_list: string | null = localStorage.getItem("carrinho") || ""
    resp: Observable<Produto[]> = new Observable<Produto[]>();
    constructor(private http: HttpClient) {}
  
    desativar(id: string) {
      return this.http.post<Produto>(`${this.apiUrl}/desativarProduto/${id}`, {});
    }

    ativar(id: string) {
      return this.http.post<Produto>(`${this.apiUrl}/ativarProduto/${id}`, {});
    }
  
    getAll(): Observable<Produto[]> {
      return this.http.get<Produto[]>(this.apiUrl + "/listarProdutos");
    }
  
    getItem(id: number): Observable<Produto> {
      return this.http.get<Produto>(`${this.apiUrl}/${id}`);
    }

    subtrairEstoque(carrinho: any) {
      return this.http.post(`${this.apiUrl}/subtrairEstoque`, {carrinho: carrinho})
    }

    getCarrinho(): Observable<Produto[]> {
      if (this.produtos_list !== null && this.produtos_list !== "") {
      this.resp = new Observable<Produto[]>(JSON.parse(this.produtos_list))
      return this.resp
      } 
      console.log("Retornou null", this.produtos_list)
      return this.resp
    }

    registrar(produto: Produto) {
      const formData = new FormData()
      formData.append('descricao', produto.descricao)
      formData.append('codigo_sequencial', produto.codigo_sequencial)
      formData.append('codigo_de_barras', produto.codigo_de_barras)
      formData.append('status', 'ativo')
      formData.append('estoque', String(produto.estoque))
      formData.append('valor', String(produto.valor))
      for (let image of produto.imagens) {
        formData.append('imagens', image)
      }
      return this.http.post(`${this.apiUrl}/cadastrarProduto`, formData)
    }

    editar(produto: Produto) {
      const formData = new FormData()
      formData.append('descricao', produto.descricao)
      formData.append('codigo_sequencial', produto.codigo_sequencial)
      formData.append('codigo_de_barras', produto.codigo_de_barras ? produto.codigo_de_barras : undefined)
      formData.append('status', produto.status)
      formData.append('estoque', String(produto.estoque))
      formData.append('valor', String(produto.valor))
      for (let image of produto.imagens) {
        formData.append('imagens', image)
      }
      return this.http.post(`${this.apiUrl}/editarProduto/${produto._id}`, formData)
    }
  }