import { useCallback, useEffect, useRef, useState } from "react";
import respostasLocais from "../data/respostas.json";
import { CHAVE_PLANILHA, PLANILHA_PADRAO, buscarPlanilha } from "../lib/planilha";
import { plural } from "../lib/texto";

export function useRespostas() {
  const [respostas, setRespostas] = useState(respostasLocais);
  const [planilha, setPlanilha] = useState(() => localStorage.getItem(CHAVE_PLANILHA) || PLANILHA_PADRAO);
  const [origem, setOrigem] = useState("carregando");
  const [aviso, setAviso] = useState({ texto: "", erro: false });
  const controle = useRef(null);

  const carregar = useCallback(async (id) => {
    controle.current?.abort();
    const atual = new AbortController();
    controle.current = atual;

    setAviso({ texto: "Buscando as respostas…", erro: false });
    try {
      const lista = await buscarPlanilha(id, atual.signal);
      setRespostas(lista);
      setOrigem("planilha");
      setAviso({ texto: plural(lista.length, "resposta encontrada.", "respostas encontradas."), erro: false });
      return true;
    } catch (erro) {
      if (erro.name === "AbortError") return false;
      setOrigem((anterior) => (anterior === "carregando" ? "local" : anterior));
      setAviso({ texto: erro.message, erro: true });
      return false;
    }
  }, []);

  const trocarPlanilha = useCallback(async (id) => {
    if (!(await carregar(id))) return;
    localStorage.setItem(CHAVE_PLANILHA, id);
    setPlanilha(id);
  }, [carregar]);

  const [inicial] = useState(planilha);
  useEffect(() => {
    carregar(inicial);
    return () => controle.current?.abort();
  }, [carregar, inicial]);

  return { respostas, planilha, origem, aviso, setAviso, trocarPlanilha };
}
