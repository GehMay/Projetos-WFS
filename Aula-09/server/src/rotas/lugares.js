import { Router } from "express";
import { lugares, avaliacoes, gerarProximoIdAvaliacao } from "../dados.js";
import { calcularMedia, filtrarPorLugar } from "../utilitarios/avaliacoes.js";

const router = Router();

// GET /lugares — lista todos os lugares, cada um já com a nota média.
router.get("/", (req, res) => {
  // TODO (Aula 09):
  // 1. Monte um novo array a partir de `lugares` (Array.prototype.map),
  //    onde cada item é uma cópia do lugar (spread `...lugar`) mais um
  //    campo `notaMedia`.
  // 2. `notaMedia` vem de `calcularMedia(filtrarPorLugar(avaliacoes, lugar.id))`.
  // 3. Responda com `res.json(...)` enviando esse array.
});

// GET /lugares/:id — um lugar específico, com nota média e avaliações.
router.get("/:id", (req, res) => {
  // TODO (Aula 09):
  // 1. Pegue o id da URL com `Number(req.params.id)`.
  // 2. Procure o lugar correspondente em `lugares` (Array.prototype.find).
  // 3. Se não encontrar, responda 404: `res.status(404).json({ erro: "..." })`
  //    e pare (return) — sem isso, o código continuaria e quebraria.
  // 4. Se encontrar, monte a resposta com o lugar + `notaMedia` +
  //    `avaliacoes` (as avaliações daquele lugar, via `filtrarPorLugar`)
  //    e responda com `res.json(...)`.
});

// POST /lugares/:id/avaliacoes — cria uma avaliação para um lugar.
router.post("/:id/avaliacoes", (req, res) => {
  // TODO (Aula 09):
  // 1. Pegue o id da URL e confira se o lugar existe (igual à rota
  //    acima) — se não existir, 404 e pare.
  // 2. Pegue `nota` e `comentario` de `req.body` (o `express.json()`
  //    já está configurado em app.js, então `req.body` já vem pronto).
  // 3. Valide: `nota` precisa ser um inteiro entre 1 e 5
  //    (Number.isInteger) e `comentario` precisa ter pelo menos 3
  //    caracteres (depois de um `.trim()`). Se alguma regra falhar,
  //    responda `res.status(400).json({ erro: "..." })` e pare.
  // 4. Se passar, monte o objeto da nova avaliação: `id` único (use
  //    `gerarProximoIdAvaliacao()`), `lugarId`, `usuarioId: 0` (ainda
  //    não existe login), `nota` e `comentario` (já "limpo").
  // 5. Adicione ao array `avaliacoes` (`avaliacoes.push(...)`) e
  //    responda `res.status(201).json(novaAvaliacao)` — 201 é o
  //    código HTTP para "criado com sucesso".
});

export default router;
