import DesafioBanho from "../components/DesafioBanho";
import PassosIntro from "../components/PassosIntro";
import { porcentagem } from "../lib/estatisticas";
import { LINK_FORMULARIO } from "../lib/planilha";
import { dicasDoGrupo } from "../lib/recomendacoes";

export default function Inicio({ respostas }) {
  const principal = dicasDoGrupo(respostas)[0];

  const passos = [
    {
      titulo: "Responda",
      texto: "Tudo começa no formulário: perguntas rápidas sobre quantas pessoas moram na casa, quais aparelhos vocês têm e o que dificulta economizar.",
      destaque: respostas.length,
      legenda: "respostas até agora",
      acao: "Abrir o formulário",
      link: LINK_FORMULARIO,
      externo: true,
    },
    {
      titulo: "Veja o painel",
      texto: "As respostas viram gráficos assim que chegam na planilha. Dá para ver os hábitos do grupo inteiro de uma vez.",
      destaque: porcentagem(respostas, "tomada", "Sim") + "%",
      legenda: "deixam aparelhos ligados na tomada",
      acao: "Ir para o painel",
      link: "#painel",
    },
    {
      titulo: "Receba dicas",
      texto: "Cada resposta ganha recomendações próprias, de acordo com as alternativas marcadas e a dificuldade que a pessoa contou.",
      destaque: principal ? principal.pct + "%" : "—",
      legenda: principal ? "recebem a dica \u201c" + principal.titulo.toLowerCase() + "\u201d" : "das respostas recebem dicas",
      acao: "Ver recomendações",
      link: "#recomendacoes",
    },
    {
      titulo: "Simule",
      texto: "Monte a lista de aparelhos da sua casa e descubra quanto cada um custa por mês e quanto você economizaria seguindo as dicas.",
      destaque: "R$ + CO₂",
      legenda: "gasto e emissão estimados por aparelho",
      acao: "Abrir o simulador",
      link: "#simulador",
    },
  ];

  return (
    <>
      <section className="intro">
        <div className="intro__texto">
          <h2>Por que economizar energia ajuda o clima?</h2>
          <p>
            O ODS 13 da ONU pede ação contra a mudança do clima. Boa parte da energia do Brasil vem de usinas hidrelétricas,
            mas nos horários de maior consumo e em períodos de seca entram em funcionamento usinas termelétricas, que
            queimam combustível e emitem gases de efeito estufa.
          </p>
          <p>
            Gastar menos em casa reduz essa demanda. Este site mostra os hábitos de quem respondeu ao nosso formulário e
            ajuda cada pessoa a descobrir onde dá para economizar.
          </p>
        </div>
        <div className="intro__selo" aria-hidden="true">
          <span>13</span>
          <small>Ação contra a mudança global do clima</small>
        </div>
      </section>

      <PassosIntro passos={passos} />
      <DesafioBanho />
    </>
  );
}
