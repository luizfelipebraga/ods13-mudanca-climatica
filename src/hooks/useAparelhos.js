import { useEffect, useState } from "react";
import { TARIFA_PADRAO, listaInicial, novoItem } from "../lib/consumo";

const CHAVE = "simuladorAparelhos";

function lerSalvo() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && Array.isArray(salvo.itens)) return salvo;
  } catch {
    localStorage.removeItem(CHAVE);
  }
  return { itens: listaInicial(), tarifa: TARIFA_PADRAO };
}

export function useAparelhos() {
  const [estado, setEstado] = useState(lerSalvo);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  }, [estado]);

  const mudarItens = (fn) => setEstado((atual) => ({ ...atual, itens: fn(atual.itens) }));

  return {
    itens: estado.itens,
    tarifa: estado.tarifa,
    setTarifa: (tarifa) => setEstado((atual) => ({ ...atual, tarifa })),
    adicionar: (tipo) => mudarItens((itens) => [...itens, novoItem(tipo)]),
    remover: (uid) => mudarItens((itens) => itens.filter((item) => item.uid !== uid)),
    alterar: (uid, campo, valor) =>
      mudarItens((itens) => itens.map((item) => (item.uid === uid ? { ...item, [campo]: valor } : item))),
    limpar: () => mudarItens(() => []),
    restaurar: () => mudarItens(listaInicial),
  };
}
