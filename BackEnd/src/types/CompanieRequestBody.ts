export default interface CompanieRequestBody {
  razaosocial: string;
  nomefantasia: string;
  email: string;
  responsavel: string;
  cnpj?: string | bigint;
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
