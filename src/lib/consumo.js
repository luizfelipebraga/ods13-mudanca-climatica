export const TARIFA_PADRAO = "0,85";
export const FATOR_CO2 = 0.04;

export const APARELHOS = [
  {
    tipo: "chuveiro", nome: "Chuveiro elétrico", potencia: 5500, horas: 0.5, dias: 30, standby: 0,
    dica: { titulo: "Banhos 30% mais curtos", texto: "Tente banhos de até 5 minutos e use a posição verão quando der.", tipo: "fracao", valor: 0.3 },
  },
  {
    tipo: "ar", nome: "Ar-condicionado", potencia: 1000, horas: 6, dias: 30, standby: 1,
    dica: { titulo: "Timer para desligar 2 horas antes", texto: "Deixe em 23 °C e programe para desligar de madrugada. O quarto continua fresco.", tipo: "horas", valor: 2 },
  },
  {
    tipo: "geladeira", nome: "Geladeira", potencia: 55, horas: 24, dias: 30, standby: 0, nota: "potência média, o motor liga e desliga",
    dica: { titulo: "Vedação da porta em dia", texto: "Troque a borracha se estiver gasta, não guarde comida quente e deixe espaço atrás para ventilar.", tipo: "fracao", valor: 0.1 },
  },
  {
    tipo: "freezer", nome: "Freezer", potencia: 60, horas: 24, dias: 30, standby: 0, nota: "potência média, o motor liga e desliga",
    dica: { titulo: "Freezer sem gelo acumulado", texto: "Descongele quando a camada de gelo passar de meio centímetro.", tipo: "fracao", valor: 0.1 },
  },
  {
    tipo: "tv", nome: "Televisão", potencia: 100, horas: 5, dias: 30, standby: 1,
    dica: { titulo: "TV desligada sem ninguém vendo", texto: "Evite deixar a TV ligada só como som ambiente.", tipo: "fracao", valor: 0.2 },
  },
  {
    tipo: "pc", nome: "Computador de mesa", potencia: 200, horas: 4, dias: 30, standby: 3,
    dica: { titulo: "Suspensão automática", texto: "Configure o computador para suspender após 10 minutos parado.", tipo: "fracao", valor: 0.2 },
  },
  { tipo: "notebook", nome: "Notebook", potencia: 60, horas: 6, dias: 30, standby: 1 },
  { tipo: "videogame", nome: "Videogame", potencia: 150, horas: 2, dias: 30, standby: 10 },
  { tipo: "microondas", nome: "Micro-ondas", potencia: 1200, horas: 0.25, dias: 30, standby: 3 },
  {
    tipo: "lavar", nome: "Máquina de lavar", potencia: 500, horas: 1, dias: 12, standby: 1,
    dica: { titulo: "Máquina só com carga cheia", texto: "Juntar roupa até encher a máquina diminui o número de lavagens.", tipo: "fracao", valor: 0.3 },
  },
  {
    tipo: "ferro", nome: "Ferro de passar", potencia: 1000, horas: 0.5, dias: 8, standby: 0,
    dica: { titulo: "Passar roupa de uma vez só", texto: "O ferro gasta muito para esquentar. Passe tudo de uma vez, em menos dias.", tipo: "fracao", valor: 0.25 },
  },
  { tipo: "secador", nome: "Secador de cabelo", potencia: 1500, horas: 0.2, dias: 30, standby: 0 },
  {
    tipo: "ventilador", nome: "Ventilador", potencia: 100, horas: 8, dias: 30, standby: 0,
    dica: { titulo: "Ventilador com timer", texto: "Use o timer para desligar 2 horas depois que você dormir.", tipo: "horas", valor: 2 },
  },
  { tipo: "led", nome: "Lâmpada LED", potencia: 9, horas: 5, dias: 30, standby: 0, quantidade: 6 },
  {
    tipo: "incandescente", nome: "Lâmpada incandescente", potencia: 60, horas: 5, dias: 30, standby: 0,
    dica: { titulo: "Trocar por LED", texto: "Uma LED de 9 W ilumina como uma incandescente de 60 W.", tipo: "fracao", valor: 0.85 },
  },
  { tipo: "roteador", nome: "Roteador de internet", potencia: 10, horas: 24, dias: 30, standby: 0 },
  { tipo: "carregador", nome: "Carregador de celular", potencia: 5, horas: 3, dias: 30, standby: 0.3 },
  { tipo: "outro", nome: "Outro aparelho", potencia: 100, horas: 1, dias: 30, standby: 0 },
];

const PADRAO_INICIAL = ["chuveiro", "geladeira", "tv", "microondas", "lavar", "led"];

export function modelo(tipo) {
  return APARELHOS.find((aparelho) => aparelho.tipo === tipo);
}

export function novoItem(tipo) {
  const base = modelo(tipo);
  return {
    uid: crypto.randomUUID(),
    tipo,
    nome: base.nome,
    quantidade: String(base.quantidade || 1),
    potencia: String(base.potencia),
    horas: String(base.horas).replace(".", ","),
    dias: String(base.dias),
    standby: base.standby,
    naTomada: base.standby > 0,
  };
}

export function listaInicial() {
  return PADRAO_INICIAL.map(novoItem);
}

export function numero(valor) {
  const n = Number(String(valor).replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function consumoMensal(item) {
  const quantidade = numero(item.quantidade);
  const horas = Math.min(numero(item.horas), 24);
  const dias = Math.min(numero(item.dias), 30);
  const ativo = (numero(item.potencia) * horas * dias * quantidade) / 1000;
  const standby = item.naTomada ? (item.standby * (30 * 24 - horas * dias) * quantidade) / 1000 : 0;
  return { ativo, standby, total: ativo + standby };
}

function economiaDoItem(item, ativo) {
  const dica = modelo(item.tipo)?.dica;
  if (!dica || !ativo) return 0;
  if (dica.tipo === "fracao") return ativo * dica.valor;
  const horas = Math.min(numero(item.horas), 24);
  return ativo * (Math.min(dica.valor, horas / 2) / horas);
}

export function calcular(itens, tarifa) {
  const preco = numero(tarifa);
  const linhas = itens.map((item) => {
    const consumo = consumoMensal(item);
    return { item, ...consumo, custo: consumo.total * preco };
  });

  const kwh = linhas.reduce((soma, linha) => soma + linha.total, 0);
  const standby = linhas.reduce((soma, linha) => soma + linha.standby, 0);

  const sugestoes = linhas
    .map(({ item, ativo }) => {
      const kwhEconomizado = economiaDoItem(item, ativo);
      const dica = modelo(item.tipo)?.dica;
      return kwhEconomizado && { id: item.uid, aparelho: item.nome, ...dica, kwh: kwhEconomizado, reais: kwhEconomizado * preco };
    })
    .filter(Boolean);

  if (standby) {
    sugestoes.push({
      id: "standby",
      aparelho: "Aparelhos na tomada",
      titulo: "Cortar o standby",
      texto: "Ligue os aparelhos num filtro de linha com interruptor e desligue tudo quando não estiver usando.",
      kwh: standby,
      reais: standby * preco,
    });
  }
  sugestoes.sort((a, b) => b.kwh - a.kwh);

  const economiaKwh = sugestoes.reduce((soma, s) => soma + s.kwh, 0);
  return {
    linhas,
    kwh,
    custo: kwh * preco,
    co2Ano: kwh * 12 * FATOR_CO2,
    sugestoes,
    economiaKwh,
    economiaReais: economiaKwh * preco,
    economiaPct: kwh ? Math.round((economiaKwh / kwh) * 100) : 0,
  };
}
