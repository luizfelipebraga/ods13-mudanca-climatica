import { canonico, semAcento } from "./texto";

export const CHAVE_PLANILHA = "planilhaFormulario";
export const PLANILHA_PADRAO = "1zbnV8JV2jXZfdmiKHMTJWmRy8gLiojuJgbmWJox9rcM";
export const LINK_FORMULARIO =
  "https://docs.google.com/forms/d/e/1FAIpQLScjUoBad5e731YHz27LQPmb-rJDTXdtg31SaXGrq2lasiunRg/viewform";

export function idDaPlanilha(entrada) {
  const texto = String(entrada || "").trim();
  const noLink = texto.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (noLink) return noLink[1];
  if (/^[a-zA-Z0-9-_]{20,}$/.test(texto)) return texto;
  return "";
}

export function linkDaPlanilha(id) {
  return "https://docs.google.com/spreadsheets/d/" + id + "/edit";
}

function normalizar(bruta) {
  const chaves = Object.keys(bruta);
  const pegar = (trecho) => {
    const chave = chaves.find((nome) => semAcento(nome).includes(semAcento(trecho)));
    return chave ? bruta[chave] : "";
  };

  if (!chaves.some((nome) => semAcento(nome).includes("quantas pessoas moram"))) {
    throw new Error("Essa planilha não tem as perguntas do formulário.");
  }

  const pessoas = String(pegar("quantas pessoas moram")).match(/\d+/);
  return {
    pessoas: pessoas ? pessoas[0] : "",
    consumo: canonico(pegar("acompanhar seu consumo"), ["Nunca", "As vezes", "Sempre"]),
    eletro: canonico(pegar("quantos eletrodomésticos"), ["Menos de 10", "Mais de 10"]),
    tomada: canonico(pegar("ligados na tomada"), ["Sim", "Não"]),
    dificuldade: String(pegar("dificulta economizar") || "").trim(),
    app: canonico(pegar("usaria um app"), ["Sim", "Não"]),
  };
}

function lerGviz(texto) {
  const inicio = texto.indexOf("{");
  const fim = texto.lastIndexOf("}");
  if (inicio < 0 || fim < inicio) throw new Error("O Google não devolveu a planilha.");
  const json = JSON.parse(texto.slice(inicio, fim + 1));
  if (json.status === "error") {
    throw new Error("Não consegui ler a planilha. Compartilhe como qualquer pessoa com o link pode ver.");
  }

  const cols = json.table.cols.map((col) => col.label || "");
  return json.table.rows
    .map((row) => {
      const linha = {};
      cols.forEach((col, i) => {
        const cell = row.c && row.c[i];
        linha[col] = cell && cell.v != null ? cell.v : "";
      });
      return linha;
    })
    .filter((linha) => Object.values(linha).some((valor) => String(valor).trim() !== ""))
    .map(normalizar)
    .filter((linha) => linha.consumo || linha.eletro || linha.app || linha.pessoas);
}

export async function buscarPlanilha(id, signal) {
  const url = "https://docs.google.com/spreadsheets/d/" + encodeURIComponent(id) + "/gviz/tq?tqx=out:json&headers=1";
  let resposta;
  try {
    resposta = await fetch(url, { signal });
  } catch (erro) {
    if (erro.name === "AbortError") throw erro;
    throw new Error("Não consegui acessar o Google. Confira sua conexão.");
  }
  const texto = await resposta.text();
  if (!resposta.ok || !texto.includes("\"table\"")) {
    throw new Error("Não consegui ler a planilha. Compartilhe como qualquer pessoa com o link pode ver.");
  }
  return lerGviz(texto);
}
