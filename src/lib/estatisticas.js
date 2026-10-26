export function contar(lista, chave, ordem) {
  const mapa = Object.fromEntries(ordem.map((item) => [item, 0]));
  lista.forEach((linha) => {
    if (mapa[linha[chave]] === undefined) return;
    mapa[linha[chave]] += 1;
  });
  return ordem.map((item) => mapa[item]);
}

export function porcentagem(lista, chave, valor) {
  if (!lista.length) return 0;
  return Math.round((lista.filter((linha) => linha[chave] === valor).length / lista.length) * 100);
}

export function mediaPessoas(lista) {
  if (!lista.length) return 0;
  return lista.reduce((soma, linha) => soma + Number(linha.pessoas || 0), 0) / lista.length;
}

export function tamanhosDeCasa(lista) {
  const faixas = [...new Set(lista.map((linha) => String(linha.pessoas)).filter(Boolean))]
    .sort((a, b) => Number(a) - Number(b));
  return {
    rotulos: faixas.map((n) => n + (n === "1" ? " pessoa" : " pessoas")),
    valores: faixas.map((n) => lista.filter((linha) => String(linha.pessoas) === n).length),
  };
}
