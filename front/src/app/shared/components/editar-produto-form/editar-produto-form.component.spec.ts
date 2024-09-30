import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutoFormComponent } from './editar-produto-form.component';

describe('EditarProdutoFormComponent', () => {
  let component: EditarProdutoFormComponent;
  let fixture: ComponentFixture<EditarProdutoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProdutoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
