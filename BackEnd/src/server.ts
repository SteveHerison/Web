import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";
import CompanieController from "./controllers/CompanieController";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (request: Request, response: Response) => {
  response.send({});
});

// Rota para criação de usuário
app.post("/createUser", (request: Request, response: Response) => {
  UserController.createUser(request, response);
});

// Rota para obter usuário
app.get("/getUser", (request: Request, response: Response) => {
  UserController.getUser(request, response);
});

// Rota para criação de empresa (agora usando o controlador correto)
app.post("/createCompanie", (request: Request, response: Response) => {
  CompanieController.createCompanie(request, response); // Altera para CompanieController
});

// Rota para obter empresa (agora usando o controlador correto)
app.get("/getCompanie", (request: Request, response: Response) => {
  CompanieController.getCompanie(request, response); // Altera para CompanieController
});

app.listen(PORT, () => {
  console.log(`Servidor Rodando na porta ${PORT}`);
});
