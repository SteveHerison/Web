import Express, { Request, Response } from "express";
import cors from "cors";
import UserAndCompanyController from "./controller/UserAndCompanyController";

const app = Express();
const PORT = 3000;

// Configura o middleware CORS
app.use(cors({ origin: "http://localhost:5173" }));
app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/createUserAndCompany", async (req: Request, res: Response) => {
  await UserAndCompanyController.registerUserAndCompany(req, res);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
