export const PAGINAS = [
  { id: "inicio", rotulo: "Início" },
  { id: "painel", rotulo: "Painel" },
  { id: "recomendacoes", rotulo: "Recomendações" },
  { id: "simulador", rotulo: "Simulador" },
];

export default function Navegacao({ atual }) {
  return (
    <nav className="nav" aria-label="Páginas">
      {PAGINAS.map((pagina) => (
        <a
          key={pagina.id}
          href={"#" + pagina.id}
          className={pagina.id === atual ? "nav__item nav__item--ativo" : "nav__item"}
          aria-current={pagina.id === atual ? "page" : undefined}
        >
          {pagina.rotulo}
        </a>
      ))}
    </nav>
  );
}
