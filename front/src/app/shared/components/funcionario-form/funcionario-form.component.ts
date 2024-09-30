import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router }  from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validacoes } from '@app/shared/validators/Usuario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})

export class FuncionarioFormComponent implements OnInit {
  form!: FormGroup;
  public mask: Array<string | RegExp>
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {  
    this.mask = [ /[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      nickname: ['', [Validators.minLength(3), Validators.required]],
      documento: ['', [Validators.maxLength(11), Validators.required,  Validacoes.ValidaCpf]],
      senha: ['', [Validators.minLength(8), Validators.required]],
    })
  }

  get formValidators() {
    return {
      nome: this.form.controls['nome'],
      email: this.form.controls['email'],
      nickname: this.form.controls['nickname'],
      documento: this.form.controls['documento'],
      senha: this.form.controls['senha'],
    }
  }

  registrarFuncionario() {
    this.authService.registrar(this.form.value).subscribe((data: any) => this.router.navigate(['/listar-usuarios']));
  }
}
