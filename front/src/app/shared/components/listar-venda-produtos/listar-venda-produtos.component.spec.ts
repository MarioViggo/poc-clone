import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendaProdutosComponent } from './listar-venda-produtos.component';

describe('ListarVendaProdutosComponent', () => {
  let component: ListarVendaProdutosComponent;
  let fixture: ComponentFixture<ListarVendaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVendaProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVendaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
