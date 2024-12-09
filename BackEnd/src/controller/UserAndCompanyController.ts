import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async registerUserAndCompany(request: Request, response: Response) {
    const {
      nome,
      email,
      cpf,
      senha,
      razaosocial,
      nomefantasia,
      cnpj,
      telefone,
      celular,
      responsavel,
      endereco,
      cidade,
      uf,
      cep,
      descricao,
      nome_empresa,
    } = request.body;

    try {
      // 1. Verificar se o e-mail do usuário já está em uso
      const existingUserEmail = await prisma.usuarios.findUnique({
        where: { email },
      });
      if (existingUserEmail) {
        console.error("Erro: E-mail do usuário já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O e-mail do usuário fornecido já está em uso.",
        });
      }

      // 2. Verificar se o CPF do usuário já está em uso
      const existingUserCpf = await prisma.usuarios.findUnique({
        where: { cpf },
      });
      if (existingUserCpf) {
        console.error("Erro: CPF já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O CPF fornecido já está em uso.",
        });
      }

      // 3. Verificar se o CNPJ da empresa já está em uso
      const existingCompanyCnpj = await prisma.empresa.findUnique({
        where: { cnpj: String(cnpj) },
      });
      if (existingCompanyCnpj) {
        console.error("Erro: CNPJ já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O CNPJ fornecido já está em uso.",
        });
      }

      // 4. Verificar se o e-mail da empresa já está em uso
      const existingCompanyEmail = await prisma.empresa.findUnique({
        where: { emailEmpresa: email },
      });
      if (existingCompanyEmail) {
        console.error("Erro: E-mail da empresa já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O e-mail da empresa fornecido já está em uso.",
        });
      }

      // 5. Verificar se a razão social da empresa já está em uso
      const existingCompanyRazaosocial = await prisma.empresa.findUnique({
        where: { razaosocial },
      });
      if (existingCompanyRazaosocial) {
        console.error("Erro: Razão social já está em uso.");
        return response.status(400).json({
          error: true,
          message: "A razão social fornecida já está em uso.",
        });
      }

      // 6. Verificar se o nome fantasia da empresa já está em uso
      const existingCompanyNomefantasia = await prisma.empresa.findFirst({
        where: { nomefantasia },
      });
      if (existingCompanyNomefantasia) {
        console.error("Erro: Nome fantasia já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O nome fantasia fornecido já está em uso.",
        });
      }

      // 7. Verificar se o nome da empresa já está em uso
      const existingCompanyNomeEmpresa = await prisma.empresa.findFirst({
        where: { nome_empresa },
      });
      if (existingCompanyNomeEmpresa) {
        console.error("Erro: Nome da empresa já está em uso.");
        return response.status(400).json({
          error: true,
          message: "O nome da empresa fornecido já está em uso.",
        });
      }

      // 8. Criar o usuário
      const user = await prisma.usuarios.create({
        data: {
          nome,
          email,
          cpf,
          senha,
          datacadastro: new Date(),
        },
      });

      // 9. Criar a empresa associando o usuário
      const company = await prisma.empresa.create({
        data: {
          razaosocial,
          nomefantasia,
          cnpj: String(cnpj), // Certificando-se de que é um BigInt
          telefoneEmpresa: telefone,
          celularEmpresa: celular,
          responsavel,
          enderecoEmpresa: endereco,
          cidadeEmpresa: cidade,
          ufEmpresa: uf,
          cepEmpresa: cep,
          descricaoEmpresa: descricao,
          nome_empresa,
          datafuncao: new Date(),
          id_usuarios: user.id, // Relaciona a empresa com o usuário criado
          emailEmpresa: email,
        },
      });

      // Converter BigInt para string antes de enviar
      const companyResponse = {
        ...company,
        cnpj: company.cnpj.toString(), // Converte o BigInt para string
      };

      // 10. Retornar sucesso
      return response.status(201).json({
        success: true,
        message: "Usuário e empresa cadastrados com sucesso!",
        user,
        company: companyResponse,
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário e empresa:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },
};
