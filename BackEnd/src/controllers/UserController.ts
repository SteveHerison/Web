import { prisma } from "../database";
import { Request, Response } from "express";
import UserRequestBody from "../types/UserRequestBody";

export default {
  async createUser(
    request: Request<{}, {}, UserRequestBody>,
    response: Response
  ): Promise<void> {
    try {
      const { nome, email, cpf, senha } = request.body;

      // Verifica se o usuário já existe pelo e-mail ou CPF
      const userExist = await prisma.usuarios.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });

      if (userExist) {
        response.status(400).json({
          error: true,
          message: "Erro: Usuário já existe!",
        });
        return;
      }

      // Criação do novo usuário
      const newUser = await prisma.usuarios.create({
        data: {
          nome,
          email,
          cpf,
          senha,
          datacadastro: new Date(),
        },
      });

      response.status(201).json({
        error: false,
        message: "Sucesso: Usuário cadastrado com sucesso!",
        data: newUser,
      });
    } catch (error: any) {
      response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async getUser(request: Request, response: Response): Promise<void> {
    try {
      const { email, cpf } = request.body;

      if (!email && !cpf) {
        response.status(400).json({
          message: "Erro: É necessário fornecer um e-mail ou cpf.",
        });
        return;
      }

      const user = await prisma.usuarios.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });

      if (!user) {
        response.status(404).json({
          error: true,
          message: "Erro: Usuário não encontrado.",
        });
        return;
      }

      const { senha, ...userWithoutPassword } = user;

      response.status(200).json({
        error: false,
        message: "Sucesso: Usuário encontrado.",
        data: userWithoutPassword,
      });
    } catch (error: any) {
      response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
