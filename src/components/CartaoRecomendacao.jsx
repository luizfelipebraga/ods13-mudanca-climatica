const CONSUMO = {
  Nunca: "Nunca acompanha o consumo",
  "As vezes": "Acompanha às vezes",
  Sempre: "Sempre acompanha",
};

export default function CartaoRecomendacao({ numero, resposta, dicas }) {
  const pessoas = String(resposta.pessoas || "");
  const etiquetas = [
    pessoas && pessoas + (pessoas === "1" ? " pessoa" : " pessoas"),
    resposta.eletro && resposta.eletro + " aparelhos",
    CONSUMO[resposta.consumo],
    resposta.tomada === "Sim" && "Deixa na tomada",
  ].filter(Boolean);

  return (
    <article className="card recomendacao">
      <header className="recomendacao__topo">
        <h3>Resposta {numero}</h3>
        <ul className="etiquetas">
          {etiquetas.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
        {resposta.dificuldade && <blockquote>“{resposta.dificuldade}”</blockquote>}
      </header>

      {dicas.length ? (
        <ol className="dicas">
          {dicas.map((dica) => (
            <li key={dica.id}>
              <strong>{dica.titulo}</strong>
              <p>{dica.texto}</p>
              <small>{dica.motivos.join(" · ")}</small>
            </li>
          ))}
        </ol>
      ) : (
        <p className="vazio">Já faz o básico bem feito. Continue acompanhando o consumo todo mês.</p>
      )}
    </article>
  );
}
