import { buildApp } from "./app.js";

const port = Number(process.env.PORT) || 3000;
const app = buildApp();

// Запускаем сервер и перехватываем возвращаемый экземпляр сервера
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Express + TypeScript Server");
});

// Обрабатываем сигнал SIGTERM для мягкой (gracefully) остановки сервера
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
