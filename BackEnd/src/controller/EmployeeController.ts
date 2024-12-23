import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async registerEmployee(request: Request, response: Response) {
    const { nome, email, cpf, celular } = request.body;

    try {
      // 1. Verificar se o nome já está em uso
      const existingEmployeeName = await prisma.funcionarios.findUnique({
        where: { nome },
      });
      if (existingEmployeeName) {
        return response.status(400).json({
          error: true,
          message: "O nome fornecido já está em uso.",
        });
      }

      // 2. Verificar se o CPF já está em uso
      const existingEmployeeCpf = await prisma.funcionarios.findUnique({
        where: { cpf },
      });
      if (existingEmployeeCpf) {
        return response.status(400).json({
          error: true,
          message: "O CPF fornecido já está em uso.",
        });
      }

      // Criar o funcionário
      const employee = await prisma.funcionarios.create({
        data: {
          nome,
          email,
          cpf,
          celular,
          datacadastro: new Date(),
        },
      });

      // Retornar sucesso
      return response.status(201).json({
        success: true,
        message: "Funcionário cadastrado com sucesso!",
        employee,
      });
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  async getEmployee(request: Request, response: Response) {
    try {
      const { nome, cpf } = request.query;

      const filters: any = {};
      if (nome) {
        filters.nome = { contains: nome as string };
      }
      if (cpf) {
        filters.cpf = { equals: cpf as string };
      }

      const employees = await prisma.funcionarios.findMany({
        where: filters,
      });

      return response.status(200).json({
        success: true,
        data: employees,
      });
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },

  async updateEmployee(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, cpf, celular } = request.body;

    try {
      // Verificar se o funcionário existe
      const existingEmployee = await prisma.funcionarios.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingEmployee) {
        return response.status(404).json({
          error: true,
          message: "Funcionário não encontrado.",
        });
      }

      // Atualizar os dados do funcionário
      const updatedEmployee = await prisma.funcionarios.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          cpf,
          celular,
        },
      });

      return response.status(200).json({
        success: true,
        message: "Funcionário atualizado com sucesso!",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      return response.status(500).json({
        error: true,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  },
};
