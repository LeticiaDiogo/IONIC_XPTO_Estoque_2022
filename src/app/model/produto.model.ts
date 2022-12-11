export interface Produto {
  [x: string]: any;
  id: number;
  nome: string;
  quantidade: number;
  valorCompra: number;
  valorVenda: number;
  fornecedor: string;
}
