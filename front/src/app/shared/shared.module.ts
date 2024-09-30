import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from "@angular/material/form-field";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ListarVendaProdutosComponent } from './components/listar-venda-produtos/listar-venda-produtos.component';
import { ListarProdutosDaVendaComponent } from './components/listar-produtos-da-venda/listar-produtos-da-venda.component';
import { DialogModule } from 'primeng/dialog';
import { EditarProdutoFormComponent } from './components/editar-produto-form/editar-produto-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule  } from 'ngx-mask';

var module = [
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    MatButtonModule,
    FooterComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressBarModule,
    CarouselModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ];
  
  @NgModule({
    declarations: [HeaderComponent],
    imports: [module, CommonModule],
    exports: [module],
    providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
  })
  export class SharedModule {}