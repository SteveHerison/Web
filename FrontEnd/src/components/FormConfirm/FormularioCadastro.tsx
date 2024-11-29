import { useContext } from "react";
import { CadastroContext } from "../../contexts/UserCompanyContext";

const FormularioCadastro = () => {
  // Consome o contexto
  const cadastroContext = useContext(CadastroContext);

  // Verifica se o contexto está disponível
  if (!cadastroContext) {
    throw new Error("CadastroContext não disponível!");
  }

  // Desestrutura as funções e estados do contexto
  const { usuario, empresa, atualizarUsuario, atualizarEmpresa, cadastrar } =
    cadastroContext;

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cadastrar(); // Chama a função de cadastro do contexto
  };

  // Renderiza o formulário
  return (
    <form onSubmit={handleSubmit}>
      <h2>Dados do Usuário</h2>
      <input
        type="text"
        placeholder="Nome"
        value={usuario.nome}
        onChange={(e) => atualizarUsuario("nome", e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={usuario.email}
        onChange={(e) => atualizarUsuario("email", e.target.value)}
      />
      <input
        type="text"
        placeholder="CPF"
        value={usuario.cpf}
        onChange={(e) => atualizarUsuario("cpf", e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={usuario.senha}
        onChange={(e) => atualizarUsuario("senha", e.target.value)}
      />

      <h2>Dados da Empresa</h2>
      <input
        type="text"
        placeholder="Razão Social"
        value={empresa.razaoSocial}
        onChange={(e) => atualizarEmpresa("razaoSocial", e.target.value)}
      />
      <input
        type="text"
        placeholder="CNPJ"
        value={empresa.cnpj}
        onChange={(e) => atualizarEmpresa("cnpj", e.target.value)}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={empresa.endereco}
        onChange={(e) => atualizarEmpresa("endereco", e.target.value)}
      />
      <input
        type="text"
        placeholder="Número"
        value={empresa.numero}
        onChange={(e) => atualizarEmpresa("numero", e.target.value)}
      />
      <input
        type="text"
        placeholder="CEP"
        value={empresa.cep}
        onChange={(e) => atualizarEmpresa("cep", e.target.value)}
      />
      <input
        type="text"
        placeholder="Cidade"
        value={empresa.cidade}
        onChange={(e) => atualizarEmpresa("cidade", e.target.value)}
      />
      <input
        type="text"
        placeholder="UF"
        value={empresa.uf}
        onChange={(e) => atualizarEmpresa("uf", e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={empresa.telefone}
        onChange={(e) => atualizarEmpresa("telefone", e.target.value)}
      />
      <input
        type="text"
        placeholder="Responsável"
        value={empresa.responsavel}
        onChange={(e) => atualizarEmpresa("responsavel", e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail Responsável"
        value={empresa.emailRespo}
        onChange={(e) => atualizarEmpresa("emailRespo", e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioCadastro;
