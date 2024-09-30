import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produtos.services';
import { VendasService } from '@app/services/vendas.service';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-produtos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})

export class ListarProdutosComponent implements OnInit {
  @ViewChild('buttonClick') buttonClick: ElementRef;
  produtos: Produto[] = [];
  bkp_produtos: Produto[] = [];
  carrinho: any[] = [];
  pesquisaInput: string;
  codigo_de_barras: any;
  show: boolean = false;
  imagens_loaded: SafeUrl[];
  imagens: any[];
  change: Boolean = false;
  valor_total: number = 0;
  constructor(private sanitizer: DomSanitizer, private authService: AuthService,  private produtoService: ProdutoService, private vendasServices: VendasService,  private router: Router) { 
    
  }
  
  ngOnInit(): void {
    this.getProdutos()
    let logged = this.authService.isLogged()
    if (!logged) this.router.navigate(['/login'])
    setInterval(() => {
        if (this.produtos.length > 0) this.buttonClick?.nativeElement.click()
      }, 200) 
   }


  addProduto(produto: Produto) { 
    let existeNoCarrinho = this.carrinho.filter((item) => item.produto._id == produto._id) 
    for (let item of this.carrinho) {
      if (item.quantidade > 0  && item.produto._id == produto._id) {
        item.quantidade += 1
        
      } 
    }
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho))
    if (this.carrinho.length == 0 || existeNoCarrinho.length == 0)  this.carrinho.push({produto: produto, quantidade: 1})
  
  }

  editarProduto(produto: Produto) {
    if (this.authService.check_admin_permission() == true) {
      this.router.navigate([`/editar-produto/${produto._id}`], { state: { produto: produto } })
    } else {
      alert("Somente Admins podem executar essa ação")
    }
  }

  finalizarCompra() {
    let valor_final = 0;
    for (let item of this.carrinho) {
      valor_final = valor_final + item.valor
    }
    this.vendasServices.registrar(this.carrinho, valor_final).subscribe((data: any) => this.router.navigate['/listar-vendas'])
    this.produtoService.subtrairEstoque(this.carrinho).subscribe();
    alert(`Compra finalizada no valor de ${valor_final}`)
  }

  limparCarrinho() {
    this.carrinho = [];
    this.valor_total = 0
  }

  desativarProduto(id: string): void {
    if (this.authService.check_admin_permission()) {
      this.produtoService.desativar(id).subscribe();
  
      this.produtos = this.produtos.map(produto => {
        if (produto._id == id) produto.status = "inativo"
        return produto
      })
    } else {
      alert("Somente Admins podem executar essa ação")
    }
  }

  ativarProduto(id: string): void {
    if (this.authService.check_admin_permission()) {
      this.produtoService.ativar(id).subscribe();
      this.produtos = this.produtos.map(produto => {
        if (produto._id == id) produto.status = "ativo"
        return produto
      })
    } else {
      alert("Somente Admins podem executar essa ação")
    }
  }

  removeProduto(id: string) {
    this.produtos = this.produtos.filter((produto) => id != String(produto._id));
    this.bkp_produtos = this.bkp_produtos.filter((produto) => id != String(produto._id));
  }

  filtrarProdutos(value) {
    if (value.length === 0) {
      this.produtos = this.bkp_produtos
    } 
    if (value.length > 0) this.produtos = this.bkp_produtos.filter(produto => produto.descricao.includes(this.pesquisaInput))
  }

  displayPage() {
    this.show = true
  }

  getProdutos(): void {
    this.produtoService.getAll().subscribe((produtos) => {
      this.produtos = this.bkp_produtos = produtos
      let objectURL = 'data:image/png;base64,' + this.produtos[0]?.codigo_de_barras[0].data
      let TYPED_ARRAY = new Uint8Array(this.produtos[0]?.codigo_de_barras[0].data)
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
     let base64String = btoa(STRING_CHAR);
     this.codigo_de_barras = this.sanitizer.bypassSecurityTrustUrl( 'data:image/jpg;base64,' + base64String);
    
    
    this.produtos = this.bkp_produtos = this.produtos.map(produto => {
      let img_list = [];
      let imagens_loaded = [];
      if (produto.imagens.length > 0) {
        produto.imagens.map(imagem => {
          img_list.push(imagem)
        })
        img_list.map(img => {
          let objectURL = 'data:image/png;base64,' + img.data
          let binary = '';
          let TYPED_ARRAY = new Uint8Array(img.data)
          let len = TYPED_ARRAY.byteLength
          for (let i = 0; i < len; i++) {
                  binary += String.fromCharCode(TYPED_ARRAY[ i ]);
          }
          let base64String = btoa(binary);
          imagens_loaded.push(this.sanitizer.bypassSecurityTrustUrl( 'data:image/jpg;base64,' + base64String))
        })
        produto.imagens_loaded = imagens_loaded
      }
      return produto
    }
  )
  this.show = true

  })

  }
}