import { EnderecoModel } from "./endereco.model";

export interface Fornecedor{
  id:number,
  razaoSocial:string,
  cnpj:string,
  telefone:string,
  endereco:EnderecoModel,
}
