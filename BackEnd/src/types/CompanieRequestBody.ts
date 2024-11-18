export default interface CompanieRequestBody {
  razaosocial: string;
  nomefantasia: string;
  email: string;
  responsavel: string;
  cnpj?: string | number | bigint | boolean;
  datacadastro: Date;
  celular?: string;
  telefone: string;
  endereco: string;
  cep: string;
  uf: string;
  cidade: string;
  numero: string;
  bairro: string;
}
