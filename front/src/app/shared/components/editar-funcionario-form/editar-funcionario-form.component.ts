import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '@app/services/usuario.service';
import { Router }  from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validacoes } from '@app/shared/validators/Usuario';

@Component({
  selector: 'app-editar-funcionario-form',
  templateUrl: './editar-funcionario-form.component.html',
  styleUrls: ['./editar-funcionario-form.component.css']
})

export class EditarFuncionarioFormComponent implements OnInit {
  form!: FormGroup;
  @Input() usuario: any;
  public mask: Array<string | RegExp>
  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {  
    this.mask = [ /[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: [this.usuario.usuario._id],
      nome: [this.usuario.usuario.nome, Validators.compose([Validators.minLength(3), Validators.required])],
      email: [this.usuario.usuario.email, Validators.compose([Validators.email])],
      nickname: [this.usuario.usuario.nickname, Validators.compose([Validators.minLength(3), Validators.required])],
      documento: [this.usuario.usuario.documento,Validators.compose([Validators.maxLength(11), Validators.required,  Validacoes.ValidaCpf])],
      senha: ['', [Validators.minLength(8)]],
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

  editarFuncionario() {
    this.usuarioService.editar(this.form.value).subscribe((data: any) => this.router.navigate(['/listar-usuarios']));
  }
}
