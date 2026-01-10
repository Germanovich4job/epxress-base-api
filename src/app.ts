import express from "express";

export function buildApp() {
  const app = express();

  // Посредник для разбора (парсинга) JSON
  app.use(express.json());

  return app;
}
