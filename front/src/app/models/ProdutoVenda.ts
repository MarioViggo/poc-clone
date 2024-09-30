import { Produto } from "./Produto";
export interface ProdutoVenda {
    _id: string;
    produto: Produto;
    quantidade: number;
  } 