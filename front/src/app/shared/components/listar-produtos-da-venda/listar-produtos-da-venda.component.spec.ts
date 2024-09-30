import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutosDaVendaComponent } from './listar-produtos-da-venda.component';

describe('ListarProdutosDaVendaComponent', () => {
  let component: ListarProdutosDaVendaComponent;
  let fixture: ComponentFixture<ListarProdutosDaVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProdutosDaVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProdutosDaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
