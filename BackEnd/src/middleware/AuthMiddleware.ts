import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number; // Assume que o token contém um campo `id`
    };
    req.userId = decoded.id; // Agora `userId` está corretamente tipado
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export default AuthMiddleware;
