// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // ou o tipo que você está utilizando para o ID do usuário, como string, bigint, etc.
    }
  }
}
