import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProdutoService } from 'src/app/services/produtos.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-produto-form',
  templateUrl: './editar-produto-form.component.html',
  styleUrls: ['./editar-produto-form.component.css']
})

export class EditarProdutoFormComponent implements OnInit {
  @ViewChild('buttonClick') buttonClick: ElementRef;
  form!: FormGroup;
  @Input() produto: any;
  show: boolean = false;
  file_store: FileList;
  file_list: Array<string> = [];

  constructor(private produtoService: ProdutoService, private router: Router, private formBuilder: FormBuilder,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: [this.produto.produto._id],
      descricao:  [this.produto.produto.descricao, Validators.required],
      codigo_sequencial:  [this.produto.produto.codigo_sequencial, Validators.required],
      valor:  [this.produto.produto.valor, Validators.required],
      estoque:  [this.produto.produto.estoque, Validators.required],
      codigo_de_barras:  [''],
      imagens:  [''],
   });
    setInterval(() => {
      if (this.produto) this.buttonClick?.nativeElement.click()
    }, 900) 
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

  editarProduto() {
    this.produtoService.editar(this.form.value).subscribe((data: any) => this.router.navigate(['/listar-produtos']))
  }

  displayPage() {
    this.show = true
  }

}
