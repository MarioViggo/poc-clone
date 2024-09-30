import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router }  from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  userLogin: any = {};
  userLogged: Usuario | null = null;
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(JSON.stringify(localStorage.getItem('user_logged')))
    this.isAuthenticated = this.userLogged != null;
    if (this.isAuthenticated) this.router.navigate(["/listar-produtos"])
  }

  authenticate() {
    this.authService.login(this.userLogin).subscribe(
    (data:any) => {
          if (data.user) {
              if (data.user.status !== "inativo") {
                localStorage.setItem('user_logged', JSON.stringify(data));
                this.getUserData();
                window.location.reload()
              } else {
                alert("Usuário com acesso desativado!")
                this.router.navigate(["/"])
              }
          } else {  
              alert('User invalid.');
          }
        }, error => {
          console.log(error);
          alert('User invalid');
        })
    }

    getUserData() {
      this.userLogged = JSON.parse(JSON.stringify(localStorage.getItem('user_logged')))
      this.isAuthenticated = this.userLogged != null;
   }
}
