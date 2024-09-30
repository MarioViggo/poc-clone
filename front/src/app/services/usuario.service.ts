import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listarFuncionarios`);
  }

  editar(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/editarFuncionario/${usuario._id}`, usuario)
  }

  desativar(id: string) {
    return this.http.delete<Usuario>(`${this.apiUrl}/desativarFuncionario/${id}`);
  }

  ativar(id: string) {
    return this.http.post<Usuario>(`${this.apiUrl}/ativarFuncionario/${id}`, {});
  }
}
