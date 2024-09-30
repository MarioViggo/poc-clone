import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Venda } from 'src/app/models/Venda';
import { VendasService } from 'src/app/services/vendas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import moment from 'moment';


@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})

export class ListarVendasComponent implements OnInit {
  vendas: Venda[] = [];
  show: boolean = false;
  @ViewChild('buttonClick') buttonClick: ElementRef;

  constructor(private vendasServices: VendasService, private router: Router, private authService: AuthService) {
    this.getVendas()
   }

  ngOnInit(): void {
    let logged = this.authService.isLogged()
    if (!logged) this.router.navigate(['/login'])
      setInterval(() => {
        if (this.vendas.length > 0) this.buttonClick?.nativeElement.click()
      }, 1000) 
  }

  getVendas(): void {
    this.vendasServices.getAll().subscribe((vendas) => {
      vendas = vendas.map(venda => {
        venda.data_da_venda =  moment(venda.data_da_venda).format("DD/MM/YYYY")
        return venda
      })
      this.vendas = vendas
    });
    console.log(this.vendas)
  }

  delete(id: string) {
    this.vendasServices.cancelar(id).subscribe();
    this.vendas = this.vendas.map((venda) => {
      if (venda._id === id)  {
        venda.status = 'cancelada'
        return venda
      } 
      return venda
    })
  }

  editar(venda: Venda) {
    this.router.navigate([`editar-venda/${venda._id}`], { state: { venda: venda } })
  }

  displayPage() {
    this.show = true
  }

}
