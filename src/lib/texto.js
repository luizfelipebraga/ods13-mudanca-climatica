export function semAcento(texto) {
  return String(texto || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function canonico(valor, opcoes) {
  const alvo = semAcento(valor);
  return opcoes.find((opcao) => semAcento(opcao) === alvo) || String(valor || "").trim();
}

export function plural(n, singular, varios) {
  return n + " " + (n === 1 ? singular : varios);
}
