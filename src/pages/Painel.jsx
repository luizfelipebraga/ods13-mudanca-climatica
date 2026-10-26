import GraficoBarra from "../components/GraficoBarra";
import GraficoRosca from "../components/GraficoRosca";
import ListaDificuldades from "../components/ListaDificuldades";
import Resumo from "../components/Resumo";
import { contar, tamanhosDeCasa } from "../lib/estatisticas";

const CONSUMO = ["Nunca", "As vezes", "Sempre"];
const ELETRO = ["Menos de 10", "Mais de 10"];
const SIM_NAO = ["Sim", "Não"];

export default function Painel({ respostas }) {
  const casas = tamanhosDeCasa(respostas);

  return (
    <>
      <Resumo respostas={respostas} />
      <section className="graficos">
        <GraficoBarra titulo="Acompanha o consumo de energia?" rotulos={CONSUMO} valores={contar(respostas, "consumo", CONSUMO)} />
        <GraficoRosca titulo="Quantos eletrodomésticos em casa?" rotulos={ELETRO} valores={contar(respostas, "eletro", ELETRO)} />
        <GraficoRosca titulo="Deixa aparelhos ligados na tomada?" rotulos={SIM_NAO} valores={contar(respostas, "tomada", SIM_NAO)} />
        <GraficoRosca titulo="Usaria um app para registrar o uso?" rotulos={SIM_NAO} valores={contar(respostas, "app", SIM_NAO)} />
        <GraficoBarra titulo="Quantas pessoas moram na casa?" rotulos={casas.rotulos} valores={casas.valores} largo />
      </section>
      <ListaDificuldades respostas={respostas} />
    </>
  );
}
