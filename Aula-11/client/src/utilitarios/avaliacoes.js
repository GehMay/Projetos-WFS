// Mesmas funções puras da aula 03, agora vivendo dentro do app React.

export function calcularMedia(avaliacoes) {
  if (!avaliacoes || avaliacoes.length === 0) {
    return 0;
  }
  const soma = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
  return Math.round((soma / avaliacoes.length) * 10) / 10;
}

export function filtrarPorLugar(avaliacoes, lugarId) {
  return avaliacoes.filter((avaliacao) => avaliacao.lugarId === lugarId);
}
