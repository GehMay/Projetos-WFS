import express from "express";
import cors from "cors";
import rotasLugares from "./rotas/lugares.js";

export function criarApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ mensagem: "API da Plataforma de Avaliações no ar." });
  });

  app.use("/lugares", rotasLugares);

  app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  return app;
}
