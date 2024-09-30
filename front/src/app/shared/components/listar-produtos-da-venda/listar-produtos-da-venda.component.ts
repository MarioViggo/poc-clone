import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { VendasService } from 'src/app/services/vendas.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listar-produtos-da-venda',
  templateUrl: './listar-produtos-da-venda.component.html',
  styleUrls: ['./listar-produtos-da-venda.component.css']
})
export class ListarProdutosDaVendaComponent implements OnInit {
  @Input() vendaProdutos: Produto[];
  @ViewChild('button2Click') button2Click: ElementRef;
  @ViewChild('buttonClick') buttonClick: ElementRef;
  imagens: SafeUrl[] = [];
  display: boolean = false;
  img: boolean = false;
  show: boolean = false;
  constructor(private vendasService: VendasService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    setInterval(() => {
    if (this.imagens.length > 0) this.buttonClick?.nativeElement.click()
  }, 5000) 
}

  displayDialog (produto: any) {
    this.imagens = []
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
    this.display = true;

  }

  attState() {
    this.img = !this.img
    this.imagens.push(this.sanitizer.bypassSecurityTrustUrl( 'data:image/jpg;base64,'))
  }
  displayPage() {
    this.show = true
    this.attState()
  }



}
