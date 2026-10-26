import { useState } from "react";

export default function PassosIntro({ passos }) {
  const [atual, setAtual] = useState(0);
  const passo = passos[atual];

  return (
    <section className="card passos" aria-label="Como usar o site">
      <h2>Como o site funciona</h2>
      <div className="passos__abas" role="tablist">
        {passos.map((item, i) => (
          <button
            key={item.titulo}
            type="button"
            role="tab"
            aria-selected={i === atual}
            className={i === atual ? "passos__aba passos__aba--ativa" : "passos__aba"}
            onClick={() => setAtual(i)}
          >
            <span className="passos__numero">{i + 1}</span>
            {item.titulo}
          </button>
        ))}
      </div>

      <div className="passos__conteudo" role="tabpanel" key={atual}>
        <div>
          <p>{passo.texto}</p>
          <div className="passos__navegar">
            <a className="botao" href={passo.link} target={passo.externo ? "_blank" : undefined} rel={passo.externo ? "noopener" : undefined}>
              {passo.acao}
            </a>
            {atual < passos.length - 1 && (
              <button type="button" className="botao-texto" onClick={() => setAtual(atual + 1)}>
                Próximo passo →
              </button>
            )}
          </div>
        </div>
        <div className="passos__destaque">
          <p className="numero">{passo.destaque}</p>
          <p>{passo.legenda}</p>
        </div>
      </div>
    </section>
  );
}
