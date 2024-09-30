import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendasService } from '@app/services/vendas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-venda',
  templateUrl: './editar-venda.component.html',
  styleUrls: ['./editar-venda.component.css']
})

export class EditarVendaComponent implements OnInit {
  vendaProdutos: any[] = [];
  usuario: any;
  venda: any;
  constructor(private location: Location, private route: ActivatedRoute, private vendasServices: VendasService, private router: Router) { }

  ngOnInit(): void {
    this.venda = this.location.getState()
    let usuario = JSON.parse(localStorage.getItem("user_logged"))
    if (usuario.user?.nivel_de_acesso != "admin") this.router.navigate(['/login'])
    let id = this.route.snapshot.paramMap.get('id')
    this.getVendaProdutos(id)
  }

  getVendaProdutos(id: string) {
    this.vendasServices.obterVendasProdutos(id).subscribe((vendaProdutos) => (this.vendaProdutos = vendaProdutos.lista_de_produtos))
  }
}
