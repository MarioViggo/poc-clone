import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produtos.services';
import { VendasService } from '@app/services/vendas.service';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import  localforage  from 'localforage';


@Component({
  selector: 'app-iniciar-compra',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './iniciar-compra.component.html',
  styleUrls: ['./iniciar-compra.component.css']
})

export class IniciarCompraComponent implements OnInit {
  @ViewChild('buttonClick') buttonClick: ElementRef;
  @ViewChild('button2Click') button2Click: ElementRef;
  @ViewChild('button3Click') button3Click: ElementRef;
  produtos: Produto[] = [];
  bkp_produtos: Produto[] = [];
  carrinho: any[] = [];
  pesquisaInput: string;
  codigo_de_barras: any;
  show: boolean = false;
  img: boolean = false;
  showLoading: boolean = false;
  imagens_loaded: SafeUrl[];
  imagens: any[] = [];
  change: Boolean = false;
  valor_total: number = 0;
  qrCode: string;
  display: boolean = false;
  vendaId: string;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer, private produtoService: ProdutoService, private vendasServices: VendasService,  private router: Router) { }
  
    ngOnInit(): void {
      let logged = this.authService.isLogged()
      if (!logged) this.router.navigate(['/login'])
      this.getProdutos()
      setInterval(() => {
          if (this.produtos.length > 0) this.buttonClick?.nativeElement.click()
        }, 200) 
        localforage.removeItem("carrinho")
    }

    addProduto(produto: Produto) { 
      let existeNoCarrinho = this.carrinho.filter((item) => item.produto._id == produto._id) 
      for (let item of this.carrinho) {
        if ((produto.estoque - item.quantidade ) <= 0) {
          alert("O Produto não contém essa quantidade em estoque!")
          break
        }
        if (item.quantidade > 0  && item.produto._id == produto._id) {
          item.quantidade += 1        
        } 
      }
 
      localforage.setItem("carrinho", JSON.stringify(this.carrinho))
      if (this.carrinho.length == 0 || existeNoCarrinho.length == 0)  this.carrinho.push({produto: produto, quantidade: 1})
      this.calculaCarrinho()
    }

    calculaCarrinho() {
      this.valor_total = 0
      this.carrinho.map((item) => {
        this.valor_total +=  item.produto.valor * item.quantidade
      })
    }

    displayDialog() {
      this.display = true;
    }

    attState() {
      this.img = true
    }
 
    finalizarCompra() {
      this.vendasServices.registrar(this.carrinho, this.valor_total).subscribe((data: any) => {
        this.vendaId = data._id
        this.vendasServices.gerarPix(this.valor_total, data._id, "700.194.434-39").subscribe((data: any) => {
          this.qrCode = data.qrcodeurl
          
        })
        this.produtoService.subtrairEstoque(this.carrinho).subscribe()
        this.vendasServices.gerarComprovante(this.carrinho, this.valor_total, data._id).subscribe((response: Blob) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          saveAs(blob, 'comprovante.pdf');
        }, error => {
          console.error('Erro ao gerar o comprovante', error);
        });
      })
      this.displayDialog()
    }

    limparCarrinho() {
      this.carrinho = [];
      this.qrCode = "";
      this.valor_total = 0;
    }

    updateState() {
      this.showLoading = true
      this.button2Click?.nativeElement.click()
    
    }
    deletarProduto(id: string): void {
      this.produtoService.desativar(id).subscribe();
      this.removeProduto(id)
    }

    removeProduto(id: string) {
      this.produtos = this.produtos.filter((produto) => id != String(produto._id));
      this.bkp_produtos = this.bkp_produtos.filter((produto) => id != String(produto._id));
    }

    removeItemCarrinho(id: string) {
      this.carrinho = this.carrinho.filter((item) =>  {
        if (item.quantidade  >= 1) {
          if (item.produto._id == id) item.quantidade -= 1
          this.calculaCarrinho()
          if ((item.quantidade) > 0) {
            return item
          }
        }
      })
      this.calculaCarrinho()
    }

    filtrarProdutos(value) {
      if (value.length === 0) {
        this.produtos = this.bkp_produtos
      } 
      if (value.length > 0) this.produtos = this.bkp_produtos.filter(produto => produto.descricao.includes(this.pesquisaInput))
    }

    displayImagens(produto: any) {
      this.imagens = []
      this.showLoading = false
      produto.imagens?.map((img) => {
        let objectURL = 'data:image/png;base64,' + img.data
        let binary = '';
        let TYPED_ARRAY = new Uint8Array(img.data)
        let len = TYPED_ARRAY.byteLength
        for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(TYPED_ARRAY[ i ]);
        }
        let base64String = btoa(binary);
        this.imagens?.push(this.sanitizer.bypassSecurityTrustUrl( 'data:image/jpg;base64,' + base64String))
      })
      this.displayPage()

    }

    displayPage() {   
      this.img = true
      setInterval(() => {
        if (this.imagens.length > 0) {
          this.showLoading = true
          this.show = true
          this.button3Click?.nativeElement.click()
        }
        }, 2000)
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
    this.produtos = this.produtos.filter(produto => produto.status !== 'inativo')
    this.show = true

    })

  }

}
