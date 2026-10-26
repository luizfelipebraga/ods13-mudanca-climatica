import { decimal, moeda } from "../lib/formato";

export default function EconomiaSugerida({ resultado }) {
  const { sugestoes, economiaReais, economiaKwh, economiaPct } = resultado;

  if (!sugestoes.length) {
    return (
      <section className="card economia">
        <h2>Quanto dá para economizar</h2>
        <p className="vazio">Nenhuma dica para os aparelhos da lista. Adicione chuveiro, ar-condicionado ou lâmpadas para ver sugestões.</p>
      </section>
    );
  }

  return (
    <section className="card economia">
      <h2>Quanto dá para economizar</h2>
      <p className="economia__total">
        Seguindo as dicas, você economizaria <strong>{moeda(economiaReais)} por mês</strong> ({moeda(economiaReais * 12)} por
        ano), cerca de {economiaPct}% do consumo e {decimal(economiaKwh)} kWh a menos por mês.
      </p>
      <ol className="economia__lista">
        {sugestoes.map((sugestao) => (
          <li key={sugestao.id}>
            <div>
              <small>{sugestao.aparelho}</small>
              <strong>{sugestao.titulo}</strong>
              <p>{sugestao.texto}</p>
            </div>
            <span className="economia__valor">
              −{moeda(sugestao.reais)}
              <small>por mês</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
