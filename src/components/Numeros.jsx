export default function Numeros({ itens, rotulo }) {
  return (
    <section className="numeros" aria-label={rotulo}>
      {itens.map(({ valor, rotulo }) => (
        <article key={rotulo}>
          <p className="numero">{valor}</p>
          <p>{rotulo}</p>
        </article>
      ))}
    </section>
  );
}
