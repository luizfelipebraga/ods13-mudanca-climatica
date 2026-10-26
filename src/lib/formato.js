const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function moeda(valor) {
  return reais.format(valor);
}

export function decimal(valor, casas = 1) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}
