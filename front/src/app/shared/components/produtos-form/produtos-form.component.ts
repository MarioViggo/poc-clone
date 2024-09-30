import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produtos.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})

export class ProdutosFormComponent implements OnInit {
  form: FormGroup;
  constructor(private produtoService: ProdutoService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao:  ['', Validators.required],
      codigo_sequencial:  ['', Validators.required],
      valor:  ['', Validators.required],
      estoque:  ['', Validators.required],
      codigo_de_barras:  [''],
      imagens:  [''],
   });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('codigo_de_barras').setValue(file);
    }
  }
  onFilesSelect(event) { 
    const files = event.target.files;
    this.form.get('imagens').setValue(files);
  }
  
  cadastrarProduto() {
    this.produtoService.registrar(this.form.value).subscribe((data: any) => this.router.navigate(['/listar-produtos']))
  }

}
