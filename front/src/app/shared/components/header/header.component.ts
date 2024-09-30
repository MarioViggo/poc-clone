import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userLogged: any | null = null;
  adminLogged: boolean = false;
  mainArea: boolean = true
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(JSON.stringify(localStorage.getItem('user_logged')))
    this.isAuthenticated = this.userLogged != null;
    if (JSON.parse(this.userLogged)?.user?.nivel_de_acesso == "admin") this.adminLogged = true
  
  }

  logout() {
    localStorage.removeItem('user_logged')
    window.location.reload()
  }
}
