import { useEffect, useState } from "react";
import FormPlanilha from "./components/FormPlanilha";
import Navegacao, { PAGINAS } from "./components/Navegacao";
import Topo from "./components/Topo";
import { useRespostas } from "./hooks/useRespostas";
import Inicio from "./pages/Inicio";
import Painel from "./pages/Painel";
import Recomendacoes from "./pages/Recomendacoes";
import Simulador from "./pages/Simulador";

function paginaDoEndereco() {
  const id = window.location.hash.slice(1);
  return PAGINAS.some((pagina) => pagina.id === id) ? id : "inicio";
}

const USAM_PLANILHA = ["painel", "recomendacoes"];

export default function App() {
  const { respostas, planilha, origem, aviso, setAviso, trocarPlanilha } = useRespostas();
  const [pagina, setPagina] = useState(paginaDoEndereco);

  useEffect(() => {
    const aoMudar = () => {
      setPagina(paginaDoEndereco());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);

  return (
    <main className="conteudo">
      <Topo resumo={USAM_PLANILHA.includes(pagina) ? origem : pagina} />
      {USAM_PLANILHA.includes(pagina) && (
        <FormPlanilha planilha={planilha} aviso={aviso} onAviso={setAviso} onTrocar={trocarPlanilha} />
      )}
      <Navegacao atual={pagina} />
      {pagina === "inicio" && <Inicio respostas={respostas} />}
      {pagina === "painel" && <Painel respostas={respostas} />}
      {pagina === "recomendacoes" && <Recomendacoes respostas={respostas} />}
      {pagina === "simulador" && <Simulador />}
    </main>
  );
}
