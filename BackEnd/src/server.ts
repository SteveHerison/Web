import Express, { Request, Response } from "express";
import UserAndCompanyController from "./controller/UserAndCompanyController";

const app = Express();
app.use(Express.json());
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Wrapper na rota POST

app.post("/createUserAndCompany", async (req: Request, res: Response) => {
  await UserAndCompanyController.registerUserAndCompany(req, res);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
