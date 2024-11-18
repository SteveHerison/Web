export default interface UserRequestBody {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  datacadastro: Date;
  celular: string;
  telefone?: string;
  endereco: string;
  cep: string;
  uf: string;
  cidade: string;
  numero: string;
  bairro: string;
}
