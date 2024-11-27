"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const CompanieController_1 = __importDefault(require("./controllers/CompanieController"));
const AuthMiddleware_1 = __importDefault(require("./middleware/AuthMiddleware"));
const express_2 = require("express");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get("/", (request, response) => {
    response.send({});
});
// Rota para criação de usuário
app.post("/createUser", UserController_1.default.createUser);
// Rota para obter usuário
app.get("/getUser", UserController_1.default.getUser);
// Create a router for companie routes
const router = (0, express_2.Router)();
router.post("/createCompanie", AuthMiddleware_1.default, CompanieController_1.default.createCompanie);
router.get("/getCompanie", CompanieController_1.default.getCompanie);
app.use(router);
app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});
