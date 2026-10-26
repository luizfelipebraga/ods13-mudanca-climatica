import { LINK_FORMULARIO } from "../lib/planilha";

const RESUMOS = {
  inicio: "Descubra como os hábitos de casa pesam na conta de luz e no clima, e o que dá para mudar.",
  carregando: "Lendo as respostas na planilha do Google.",
  planilha: "Respostas lidas da planilha do Google.",
  local: "Mostrando a cópia local das respostas.",
  simulador: "Calcule quanto seus aparelhos gastam e quanto dá para economizar.",
};

export default function Topo({ resumo }) {
  return (
    <header className="topo">
      <p className="kicker">ODS 13 · Formulário</p>
      <h1>Controle de eletrodomésticos</h1>
      <p className="resumo">{RESUMOS[resumo]}</p>
      <a className="botao" href={LINK_FORMULARIO} target="_blank" rel="noopener">
        Abrir o formulário
      </a>
    </header>
  );
}
