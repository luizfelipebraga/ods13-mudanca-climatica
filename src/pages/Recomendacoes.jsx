import { useMemo, useState } from "react";
import CartaoRecomendacao from "../components/CartaoRecomendacao";
import { DICAS, dicasDoGrupo, recomendar } from "../lib/recomendacoes";
import { plural } from "../lib/texto";

export default function Recomendacoes({ respostas }) {
  const [filtro, setFiltro] = useState("");

  const cartoes = useMemo(
    () => respostas.map((resposta, i) => ({ numero: i + 1, resposta, dicas: recomendar(resposta) })),
    [respostas],
  );
  const grupo = useMemo(() => dicasDoGrupo(respostas), [respostas]);
  const visiveis = filtro ? cartoes.filter(({ dicas }) => dicas.some((dica) => dica.id === filtro)) : cartoes;

  return (
    <>
      <section className="card grupo">
        <h2>Dicas que mais servem para o grupo</h2>
        <p className="grupo__intro">
          As respostas são anônimas, então cada cartão abaixo é identificado pelo número da resposta.
          As dicas saem das alternativas marcadas e das palavras usadas na dificuldade.
        </p>
        <ol>
          {grupo.slice(0, 3).map((dica) => (
            <li key={dica.id}>
              <span className="grupo__pct">{dica.pct}%</span>
              <div>
                <strong>{dica.titulo}</strong>
                <p>{dica.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="filtro">
        <label htmlFor="filtro-dica">Mostrar respostas com a dica</label>
        <select id="filtro-dica" value={filtro} onChange={(evento) => setFiltro(evento.target.value)}>
          <option value="">Todas</option>
          {grupo.map((dica) => (
            <option key={dica.id} value={dica.id}>
              {DICAS[dica.id].titulo} ({dica.quantidade})
            </option>
          ))}
        </select>
        <span>{plural(visiveis.length, "resposta", "respostas")}</span>
      </div>

      <section className="recomendacoes">
        {visiveis.map((cartao) => (
          <CartaoRecomendacao key={cartao.numero} {...cartao} />
        ))}
      </section>
    </>
  );
}
