import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarCompraComponent } from './iniciar-compra.component';

describe('IniciarCompraComponent', () => {
  let component: IniciarCompraComponent;
  let fixture: ComponentFixture<IniciarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
