import { prisma } from "../database";
import { Request, Response } from "express";
import CompanieRequestBody from "../types/CompanieRequestBody";

export default {
  async createCompanie(
    request: Request<{}, {}, CompanieRequestBody>,
    response: Response
  ): Promise<Response> {
    try {
      const {
        razaosocial,
        email,
        cnpj,
        nomefantasia,
        telefone,
        responsavel,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
      } = request.body;

      // O id do usuário pode vir do middleware de autenticação
      const userId = request.userId; // Verifique se o userId foi corretamente atribuído no request (ex. através de um middleware de autenticação)

      if (!userId) {
        return response.status(400).json({
          error: true,
          message: "Erro: O usuário não está autenticado.",
        });
      }

      // Verifica se o cnpj é uma string e converte para BigInt
      let cnpjBigInt: bigint;
      if (cnpj) {
        cnpjBigInt = BigInt(cnpj); // Converte para BigInt se o cnpj for fornecido
      } else {
        throw new Error("CNPJ é necessário");
      }

      // Verifica se a empresa já existe pelo cnpj, email ou razao social
      const companieExist = await prisma.empresa.findFirst({
        where: {
          OR: [{ email }, { cnpj: cnpjBigInt }, { razaosocial }],
        },
      });

      if (companieExist) {
        return response.status(400).json({
          error: true,
          message: "Erro: Empresa já existe!",
        });
      }

      // Criação do novo registro de empresa, associando ao id do usuário
      const newCompanie = await prisma.empresa.create({
        data: {
          razaosocial,
          nomefantasia,
          email,
          cnpj: cnpjBigInt,
          telefone,
          responsavel,
          endereco,
          numero,
          bairro,
          cidade,
          cep,
          id_usuarios: userId, // Associa o id do usuário
          datacadastro: new Date(),
          datafuncao: new Date(), // Adiciona a propriedade 'datafuncao'
        },
      });

      return response.status(201).json({
        error: false,
        message: "Sucesso: Empresa cadastrada com sucesso!",
        data: newCompanie,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async getCompanie(request: Request, response: Response): Promise<Response> {
    try {
      const { email, cnpj } = request.query;

      let cnpjBigInt: bigint | undefined;
      if (cnpj) {
        cnpjBigInt = BigInt(String(cnpj)); // Convertendo para string antes de converter para bigint
      }

      if (!email && !cnpjBigInt) {
        return response.status(400).json({
          message: "Erro: É necessário fornecer um e-mail ou CNPJ.",
        });
      }

      // Busca a empresa no banco de dados, incluindo as informações do usuário
      const companie = await prisma.empresa.findFirst({
        where: {
          OR: [{ email: String(email) }, { cnpj: cnpjBigInt }],
        },
        include: {
          usuario: true, // Isso incluirá os dados do usuário associado à empresa
        },
      });

      if (!companie) {
        return response.status(404).json({
          error: true,
          message: "Erro: Empresa não encontrada.",
        });
      }

      return response.status(200).json({
        error: false,
        message: "Sucesso: Empresa encontrada.",
        data: companie,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
