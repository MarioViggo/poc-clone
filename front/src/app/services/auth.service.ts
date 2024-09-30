import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: any | null = null;
  isAuthenticated: boolean = false;
  private apiUrl = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/login`, usuario)
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/cadastrarFuncionario`, usuario)
  }

  isLogged () {
    this.userLogged = JSON.parse(localStorage.getItem('user_logged'))
    this.isAuthenticated = this.userLogged != null;
    return this.isAuthenticated
  }
  check_admin_permission() {
    this.userLogged = JSON.parse(localStorage.getItem('user_logged'))
    this.isAuthenticated = this.userLogged != null;

    return this.userLogged.user.nivel_de_acesso == "admin"
  }
}
