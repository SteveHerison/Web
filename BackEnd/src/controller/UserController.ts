import { Request, Response } from "express";
import { prisma } from "../database";
import jwt from "jsonwebtoken";

export default {
  async registerUser(request: Request, response: Response) {
    const { nome, email, cpf, senha } = request.body;

    try {
      // 1. Verificar se o e-mail do usuário já está em uso
      const existingUserEmail = await prisma.usuarios.findUnique({
        where: { email },
      });
      if (existingUserEmail) {
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

      // Criar o usuário
      const user = await prisma.usuarios.create({
        data: {
          nome,
          email,
          cpf,
          senha,
          datacadastro: new Date(),
        },
      });

      // Retornar sucesso
      return response.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
        user,
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  async getUsers(request: Request, response: Response) {
    try {
      const { nome, cpf, email } = request.query;

      // Construir a condição dinamicamente com base nos filtros fornecidos
      const filters: any = {};

      if (nome) {
        filters.nome = { contains: nome as string };
      }
      if (cpf) {
        filters.cpf = { equals: cpf as string };
      }
      if (email) {
        filters.email = { contains: email as string };
      }

      // Consultar o banco de dados com os filtros aplicados
      const users = await prisma.usuarios.findMany({
        where: filters,
      });

      // Retornar a lista de usuários
      return response.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  async updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, cpf, senha } = request.body;

    try {
      // Verificar se o usuário existe
      const existingUser = await prisma.usuarios.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingUser) {
        return response.status(404).json({
          error: true,
          message: "Usuário não encontrado.",
        });
      }

      // Atualizar os dados do usuário
      const updatedUser = await prisma.usuarios.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          cpf,
          senha,
        },
      });

      // Retornar sucesso
      return response.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso!",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  // No arquivo do controller:
  async loginUser(request: Request, response: Response) {
    const { email, senha } = request.body;

    try {
      // Verificar se o usuário existe
      const user = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (!user) {
        return response.status(404).json({
          error: true,
          message: "Usuário não encontrado.",
        });
      }

      // Verificar se a senha está correta
      if (user.senha !== senha) {
        return response.status(401).json({
          error: true,
          message: "Senha inválida.",
        });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // payload
        process.env.JWT_SECRET || "seu-segredo", // chave secreta
        { expiresIn: "1d" } // expiração
      );

      // Retornar o token e informações do usuário
      return response.status(200).json({
        success: true,
        message: "Login realizado com sucesso.",
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          cpf: user.cpf,
        },
        token,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return response.status(500).json({
        error: true,
        message: "Erro interno no servidor.",
      });
    }
  },
};
