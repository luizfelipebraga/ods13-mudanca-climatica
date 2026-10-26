import Numeros from "./Numeros";
import { mediaPessoas, porcentagem } from "../lib/estatisticas";

export default function Resumo({ respostas }) {
  const numeros = [
    { valor: respostas.length, rotulo: "respostas" },
    { valor: mediaPessoas(respostas).toFixed(1).replace(".", ","), rotulo: "pessoas por casa, em média" },
    { valor: porcentagem(respostas, "app", "Sim") + "%", rotulo: "usariam um app" },
    { valor: porcentagem(respostas, "tomada", "Sim") + "%", rotulo: "deixam aparelhos na tomada" },
  ];

  return <Numeros itens={numeros} rotulo="Resumo" />;
}
