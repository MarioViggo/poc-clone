import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFuncionarioFormComponent } from './editar-funcionario-form.component';

describe('EditarFuncionarioFormComponent', () => {
  let component: EditarFuncionarioFormComponent;
  let fixture: ComponentFixture<EditarFuncionarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFuncionarioFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFuncionarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
