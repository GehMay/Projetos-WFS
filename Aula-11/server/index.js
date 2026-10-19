import { criarApp } from "./src/app.js";

const app = criarApp();
const PORTA = process.env.PORTA || 3333;

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
