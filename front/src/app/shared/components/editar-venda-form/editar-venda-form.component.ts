import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '@app/models/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { VendasService } from '@app/services/vendas.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-venda-form',
  templateUrl: './editar-venda-form.component.html',
  styleUrls: ['./editar-venda-form.component.css']
})

export class EditarVendaFormComponent implements OnInit {
  form!: FormGroup;
  @Input() venda: any;
  @Input() vendaProdutos: Produto[] | Observable<Produto[]>;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private vendasService: VendasService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: [this.venda.venda._id],
      data_da_venda:  [this.venda.venda.data_da_venda, Validators.required],
      valor_total:  [this.venda.venda.valor_total,  Validators.required],
    })
  }

  editarVenda() {
    this.vendasService.editar(this.form.value).subscribe((data: any) => this.router.navigate(['/listar-vendas']))
  }

}
