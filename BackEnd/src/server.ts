import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";
import CompanieController from "./controllers/CompanieController";
import AuthMiddleware from "./middleware/AuthMiddleware";
import { Router } from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (request: Request, response: Response) => {
  response.send({});
});

// Rota para criação de usuário
app.post("/createUser", UserController.createUser);

// Rota para obter usuário
app.get("/getUser", UserController.getUser);

// Create a router for companie routes
const router = Router();
router.post(
  "/createCompanie",
  AuthMiddleware,
  CompanieController.createCompanie
);
router.get("/getCompanie", CompanieController.getCompanie);

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor Rodando na porta ${PORT}`);
});
