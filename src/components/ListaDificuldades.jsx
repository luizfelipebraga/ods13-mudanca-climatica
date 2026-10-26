export default function ListaDificuldades({ respostas }) {
  const dificuldades = respostas.map((linha) => linha.dificuldade).filter(Boolean);

  return (
    <section className="card lista">
      <h2>O que mais dificulta economizar</h2>
      <ul>
        {dificuldades.map((texto, i) => (
          <li key={i}>{texto}</li>
        ))}
      </ul>
    </section>
  );
}
