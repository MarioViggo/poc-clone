import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem("user_logged"))
    console.log("usuario", usuario)
    if (usuario == null) this.router.navigate(['/login'])
    if (usuario.user?.nivel_de_acesso != "admin") this.router.navigate(['/login'])
  }

}
