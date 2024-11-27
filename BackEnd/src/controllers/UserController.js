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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, cpf, senha } = request.body;
                // Verifica se o usuário já existe pelo e-mail ou CPF
                const userExist = yield database_1.prisma.usuarios.findFirst({
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
                const newUser = yield database_1.prisma.usuarios.create({
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
            }
            catch (error) {
                response.status(500).json({
                    error: true,
                    message: error.message,
                });
            }
        });
    },
    getUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, cpf } = request.body;
                if (!email && !cpf) {
                    response.status(400).json({
                        message: "Erro: É necessário fornecer um e-mail ou cpf.",
                    });
                    return;
                }
                const user = yield database_1.prisma.usuarios.findFirst({
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
                const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
                response.status(200).json({
                    error: false,
                    message: "Sucesso: Usuário encontrado.",
                    data: userWithoutPassword,
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
