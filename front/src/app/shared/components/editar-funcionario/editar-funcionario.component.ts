import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})

export class EditarFuncionarioComponent implements OnInit {
  usuario: any;

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.usuario = this.location.getState()

    let usuario = JSON.parse(localStorage.getItem("user_logged"))
    if (usuario.user?.nivel_de_acesso != "admin") this.router.navigate(['/login'])
  }

}
