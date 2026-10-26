import { semAcento } from "./texto";

export const DICAS = {
  standby: {
    titulo: "Corte o standby",
    texto: "Ligue TV, carregadores e aparelhos de som num filtro de linha com interruptor e desligue tudo de uma vez antes de dormir.",
  },
  medir: {
    titulo: "Comece a medir",
    texto: "Anote a leitura do relógio de luz no mesmo dia de cada semana. Em um mês já dá para ver se o consumo subiu ou caiu.",
  },
  comparar: {
    titulo: "Compare em kWh, não em reais",
    texto: "Na conta, olhe o consumo em kWh e o histórico dos últimos meses. O valor em reais muda com a bandeira tarifária e esconde o que mudou de verdade.",
  },
  maiores: {
    titulo: "Descubra quem gasta mais",
    texto: "Multiplique a potência de cada aparelho (em watts, na etiqueta) pelas horas de uso por dia. Chuveiro, ar-condicionado, geladeira e ferro costumam liderar.",
  },
  combinados: {
    titulo: "Combine regras com a casa",
    texto: "Com mais gente em casa, vale combinar o tempo de banho e um horário para máquina de lavar e ferro. Uma lista na porta da geladeira ajuda todo mundo a lembrar.",
  },
  ar: {
    titulo: "Ar-condicionado em 23 °C",
    texto: "Mantenha em 23 °C, limpe o filtro todo mês e deixe portas e janelas fechadas. Use o timer para desligar de madrugada.",
  },
  chuveiro: {
    titulo: "Banho mais curto e na posição verão",
    texto: "O chuveiro elétrico costuma ser o maior gasto da casa. Use a posição verão sempre que der e tente banhos de até 5 minutos.",
  },
  geladeira: {
    titulo: "Cuide da geladeira",
    texto: "Teste a borracha da porta: se uma folha de papel presa nela escorregar fácil, está gasta. Não guarde comida quente e deixe espaço atrás para ventilar.",
  },
  lavar: {
    titulo: "Máquina sempre cheia",
    texto: "Junte roupa até completar a carga e prefira ciclos com água fria.",
  },
  ventilador: {
    titulo: "Ventilador com timer",
    texto: "Use o timer à noite ou uma tomada temporizadora para ele desligar sozinho depois que você dormir.",
  },
  ferro: {
    titulo: "Ferro e secador de uma vez só",
    texto: "Passe toda a roupa da semana de uma vez. O ferro gasta muita energia só para esquentar, então ligar várias vezes custa caro.",
  },
  lembrete: {
    titulo: "Transforme em hábito",
    texto: "Coloque um alarme no celular na hora de dormir para lembrar de desligar o filtro de linha, e deixe o filtro num lugar visível.",
  },
  registro: {
    titulo: "Registre no celular",
    texto: "Uma planilha ou app no celular é mais fácil de manter do que papel. Anote só os aparelhos que mais gastam e o tempo de uso.",
  },
};

const REGRAS = [
  { dica: "standby", motivo: "Deixa aparelhos na tomada", quando: (r) => r.tomada === "Sim" },
  { dica: "medir", motivo: "Nunca acompanha o consumo", quando: (r) => r.consumo === "Nunca" },
  { dica: "comparar", motivo: "Acompanha o consumo às vezes", quando: (r) => r.consumo === "As vezes" },
  { dica: "maiores", motivo: "Tem mais de 10 eletrodomésticos", quando: (r) => r.eletro === "Mais de 10" },
  { dica: "combinados", motivo: "Mora com 4 pessoas ou mais", quando: (r) => Number(r.pessoas) >= 4 },
];

const PALAVRAS = [
  { dica: "ar", termos: ["ar-condicionado", "ar condicionado"] },
  { dica: "chuveiro", termos: ["chuveiro", "banho"] },
  { dica: "geladeira", termos: ["geladeira"] },
  { dica: "lavar", termos: ["maquina de lavar"] },
  { dica: "ventilador", termos: ["ventilador"] },
  { dica: "ferro", termos: ["ferro", "secador"] },
  { dica: "standby", termos: ["standby", "carregador", "tomada"] },
  { dica: "lembrete", termos: ["habito", "lembrar", "esquec"] },
  { dica: "maiores", termos: ["qual aparelho", "aparelho por aparelho", "detalhe", "causa", "medicao"] },
  { dica: "comparar", termos: ["comparar"] },
  { dica: "registro", termos: ["anota", "registrar", "papel"] },
  { dica: "combinados", termos: ["moradores", "organizacao"] },
];

export function recomendar(resposta) {
  const achadas = new Map();
  const adicionar = (id, motivo) => {
    if (!achadas.has(id)) achadas.set(id, { id, ...DICAS[id], motivos: [] });
    const dica = achadas.get(id);
    if (!dica.motivos.includes(motivo)) dica.motivos.push(motivo);
  };

  const dificuldade = semAcento(resposta.dificuldade);
  PALAVRAS.forEach(({ dica, termos }) => {
    if (termos.some((termo) => dificuldade.includes(termo))) adicionar(dica, "Pela dificuldade que citou");
  });
  REGRAS.forEach(({ dica, motivo, quando }) => {
    if (quando(resposta)) adicionar(dica, motivo);
  });

  return [...achadas.values()];
}

export function dicasDoGrupo(respostas) {
  const contagem = new Map();
  respostas.forEach((resposta) => {
    recomendar(resposta).forEach(({ id }) => contagem.set(id, (contagem.get(id) || 0) + 1));
  });
  return [...contagem.entries()]
    .map(([id, quantidade]) => ({
      id,
      ...DICAS[id],
      quantidade,
      pct: Math.round((quantidade / respostas.length) * 100),
    }))
    .sort((a, b) => b.quantidade - a.quantidade);
}
