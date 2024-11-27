"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    createCompanie(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { razaosocial, email, cnpj, nomefantasia, telefone, responsavel, endereco, numero, bairro, cidade, cep, } = request.body;
                const userId = request.userId; // Agora está corretamente tipado
                if (!userId) {
                    response.status(400).json({
                        error: true,
                        message: "Erro: O usuário não está autenticado.",
                    });
                    return;
                }
                let cnpjBigInt;
                try {
                    cnpjBigInt = BigInt(String(cnpj));
                }
                catch (_a) {
                    response.status(400).json({
                        error: true,
                        message: "Erro: CNPJ inválido.",
                    });
                    return;
                }
                const companieExist = yield database_1.prisma.empresa.findFirst({
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
                const newCompanie = yield database_1.prisma.empresa.create({
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
            }
            catch (error) {
                response.status(500).json({
                    error: true,
                    message: error.message,
                });
            }
        });
    },
    getCompanie(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.query;
                if (!id) {
                    response.status(400).json({
                        error: true,
                        message: "Erro: O ID da empresa não foi fornecido.",
                    });
                    return;
                }
                const companie = yield database_1.prisma.empresa.findUnique({
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
            }
            catch (error) {
                response.status(500).json({
                    error: true,
                    message: error.message,
                });
            }
        });
    },
};
