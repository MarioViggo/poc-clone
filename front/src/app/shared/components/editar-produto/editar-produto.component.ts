import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  produto: any;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.produto = this.location.getState()
  }

}
