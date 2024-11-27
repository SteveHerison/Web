import { prisma } from "../database";
import { Request, Response } from "express";
import CompanieRequestBody from "../types/CompanieRequestBody";

export default {
  async createCompanie(
    request: Request<{}, {}, CompanieRequestBody>,
    response: Response
  ): Promise<void> {
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

      const userId = request.userId; // Agora está corretamente tipado

      if (!userId) {
        response.status(400).json({
          error: true,
          message: "Erro: O usuário não está autenticado.",
        });
        return;
      }

      let cnpjBigInt: bigint;
      try {
        cnpjBigInt = BigInt(String(cnpj));
      } catch {
        response.status(400).json({
          error: true,
          message: "Erro: CNPJ inválido.",
        });
        return;
      }

      const companieExist = await prisma.empresa.findFirst({
        where: {
          OR: [{ email }, { cnpj: cnpjBigInt }, { razaosocial }],
        },
      });

      if (companieExist) {
        response.status(400).json({
          error: true,
          message: "Erro: Empresa já existe!",
        });
        return;
      }

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
          id_usuarios: userId,
          datacadastro: new Date(),
          datafuncao: new Date(),
        },
      });

      response.status(201).json({
        error: false,
        message: "Sucesso: Empresa cadastrada com sucesso!",
        data: newCompanie,
      });
    } catch (error: any) {
      response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async getCompanie(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.query;

      if (!id) {
        response.status(400).json({
          error: true,
          message: "Erro: O ID da empresa não foi fornecido.",
        });
        return;
      }

      const companie = await prisma.empresa.findUnique({
        where: { idempresa: Number(id) },
      });

      if (!companie) {
        response.status(404).json({
          error: true,
          message: "Erro: Empresa não encontrada.",
        });
        return;
      }

      response.status(200).json({
        error: false,
        message: "Sucesso: Empresa encontrada.",
        data: companie,
      });
    } catch (error: any) {
      response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
