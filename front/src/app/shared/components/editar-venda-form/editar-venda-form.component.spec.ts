import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVendaFormComponent } from './editar-venda-form.component';

describe('EditarVendaFormComponent', () => {
  let component: EditarVendaFormComponent;
  let fixture: ComponentFixture<EditarVendaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVendaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
