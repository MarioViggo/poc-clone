import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem("user_logged"))
    if (usuario.user?.nivel_de_acesso != "admin") this.router.navigate(['/login'])
  }

}
