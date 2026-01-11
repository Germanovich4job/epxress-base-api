import express from "express";
import { z } from "zod";

import { validateQuery } from "../validate";

const app = express();

// Определяем схему Zod для параметров поисковой строки
const helloQuerySchema = z.object({
  person: z.string().min(1, { message: "person is required" }),
});

app.get("/hello", async (request, response, next) => {
  try {
    // Валидируем и парсим `query` с помощью нашего кастомного валидатора
    const query = await validateQuery(helloQuerySchema, request, response);

    // TS теперь знает, что `query.person` - это `string`
    response.send(`Hello, ${query.person}!`);
  } catch (error) {
    // Правильно обрабатываем ошибки (ошибки валидации уже отправлены клиенту)
    next(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
