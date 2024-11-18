import { prisma } from "../database";
import { Request, Response } from "express";
import UserRequestBody from "../types/UserRequestBody";
import { promises } from "dns";
import { error } from "console";

export default {
  async createUser(
    request: Request<{}, {}, UserRequestBody>,
    response: Response
  ): Promise<Response> {
    try {
      const { nome, email, cpf, senha } = request.body;

      // Verifica se o usuário já existe pelo e-mail ou CPF
      const userExist = await prisma.usuarios.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });

      if (userExist) {
        return response.status(400).json({
          error: true,
          message: "Erro: Usuário já existe!",
        });
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

      return response.status(201).json({
        error: false,
        message: "Sucesso: Usuário cadastrado com sucesso!",
        data: newUser,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async getUser(request: Request, response: Response): Promise<Response> {
    try {
      const { email, cpf } = request.body; // Agora pega do corpo da requisição

      // Verifica se pelo menos um campo foi enviado
      if (!email && !cpf) {
        return response.status(400).json({
          message: "Erro: É necessário fornecer um e-mail ou cpf.",
        });
      }

      const user = await prisma.usuarios.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });

      if (!user) {
        return response.status(404).json({
          error: true,
          message: "Erro: Usuário não encontrado.",
        });
      }

      const { senha, ...userWithoutPassword } = user;

      return response.status(200).json({
        error: false,
        message: "Sucesso: Usuário encontrado.",
        data: userWithoutPassword,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
