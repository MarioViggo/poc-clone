import { SafeUrl } from '@angular/platform-browser';
export interface Produto {
  _id:               string;
  descricao:         string;
  codigo_sequencial: string;
  status:            string;
  estoque:           number;
  codigo_de_barras:  File;
  codigo_de_barras_img:  SafeUrl;
  imagens_loaded: SafeUrl[];
  imagens:           [File]; 
  valor:             number;
  }
