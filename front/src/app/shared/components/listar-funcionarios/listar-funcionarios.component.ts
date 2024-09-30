import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {
  @ViewChild('buttonClick') buttonClick: ElementRef;
  usuarios: Usuario[] = [];
  show: boolean = false;
  userLogged: any | null = null;
  adminLogged: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService) {
    this.getUsuarios()
   }

  ngOnInit(): void {
    let logged = this.authService.isLogged()
    if (!logged) this.router.navigate(['/login'])
    this.userLogged = JSON.parse(JSON.stringify(localStorage.getItem('user_logged')))
    this.isAuthenticated = this.userLogged != null;
    if (JSON.parse(this.userLogged).user?.nivel_de_acesso == "admin") this.adminLogged = true
      setInterval(() => {
        if (this.usuarios.length > 0) this.buttonClick?.nativeElement.click()
      }, 1000) 
  }

  getUsuarios(): void {
    this.usuarioService.getAll().subscribe((usuarios) => (this.usuarios = usuarios));
  }

  desativar(id: string): void {
    this.usuarioService.desativar(id).subscribe();
    this.usuarios = this.usuarios.map(usuario => {
      if (usuario._id == id) usuario.status = 'inativo'
      return usuario
    })
  }

  displayPage() {
    this.show = true
  }

  ativar(id: string): void {
    this.usuarioService.ativar(id).subscribe();
    this.usuarios = this.usuarios.map(usuario => {
      if (usuario._id == id) usuario.status = 'ativo'
      return usuario
    })
  }

  editar(usuario: Usuario) {
    this.router.navigate([`/editar-funcionario/${usuario._id}`],  { state: { usuario: usuario } })
  }
}
