import Express, { Request, Response } from "express";
import cors from "cors";
import UserController from "./controller/UserController";

const app = Express();
const PORT = 3000;

// Configura o middleware CORS
app.use(cors({ origin: "http://localhost:5173" }));
app.use(Express.json());

app.get("/Users", async (req: Request, res: Response) => {
  await UserController.getUsers(req, res);
});

app.post("/createUser", async (req: Request, res: Response) => {
  await UserController.registerUser(req, res);
});

app.put("/updateUser/:id", async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

app.post("/login", async (req: Request, res: Response) => {
  await UserController.loginUser(req, res);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
