// Servidor HTTP estático minimalista, sem dependências externas.
// Uso: node servidor-estatico.js <pasta> <porta>
const http = require("http");
const fs = require("fs");
const path = require("path");

const pasta = path.resolve(process.argv[2] || ".");
const porta = Number(process.argv[3] || 5500);

const tiposMime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const servidor = http.createServer((req, res) => {
  let caminhoUrl = decodeURIComponent(req.url.split("?")[0]);
  if (caminhoUrl === "/") caminhoUrl = "/index.html";
  const caminhoArquivo = path.join(pasta, caminhoUrl);

  if (!caminhoArquivo.startsWith(pasta)) {
    res.writeHead(403);
    res.end("Acesso negado");
    return;
  }

  fs.readFile(caminhoArquivo, (erro, conteudo) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Não encontrado: " + caminhoUrl);
      return;
    }
    const ext = path.extname(caminhoArquivo);
    res.writeHead(200, { "Content-Type": tiposMime[ext] || "application/octet-stream" });
    res.end(conteudo);
  });
});

servidor.listen(porta, () => {
  console.log(`Servindo ${pasta} em http://localhost:${porta}`);
});
