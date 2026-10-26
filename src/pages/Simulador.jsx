import { useMemo, useState } from "react";
import EconomiaSugerida from "../components/EconomiaSugerida";
import GraficoBarra from "../components/GraficoBarra";
import LinhaAparelho from "../components/LinhaAparelho";
import Numeros from "../components/Numeros";
import { useAparelhos } from "../hooks/useAparelhos";
import { APARELHOS, calcular } from "../lib/consumo";
import { corGasto } from "../lib/graficos";
import { decimal, moeda } from "../lib/formato";

export default function Simulador() {
  const { itens, tarifa, setTarifa, adicionar, remover, alterar, limpar, restaurar } = useAparelhos();
  const [escolhido, setEscolhido] = useState(APARELHOS[0].tipo);
  const resultado = useMemo(() => calcular(itens, tarifa), [itens, tarifa]);

  const numeros = [
    { valor: decimal(resultado.kwh, 0) + " kWh", rotulo: "por mês" },
    { valor: moeda(resultado.custo), rotulo: "por mês na conta" },
    { valor: moeda(resultado.custo * 12), rotulo: "por ano" },
    { valor: decimal(resultado.co2Ano) + " kg", rotulo: "de CO₂ por ano" },
  ];
  const porCusto = [...resultado.linhas].sort((a, b) => b.custo - a.custo);

  return (
    <>
      <section className="card simulador">
        <h2>Seus aparelhos</h2>
        <p className="grupo__intro">
          Adicione os aparelhos da sua casa e ajuste os valores. A potência está na etiqueta do aparelho ou no manual.
          Os números já vêm preenchidos com uma média típica.
        </p>

        <div className="simulador__controles">
          <label>
            <span>Adicionar aparelho</span>
            <div className="simulador__adicionar">
              <select value={escolhido} onChange={(e) => setEscolhido(e.target.value)}>
                {APARELHOS.map((aparelho) => (
                  <option key={aparelho.tipo} value={aparelho.tipo}>{aparelho.nome}</option>
                ))}
              </select>
              <button type="button" onClick={() => adicionar(escolhido)}>Adicionar</button>
            </div>
          </label>
          <label>
            <span>Tarifa (R$ por kWh)</span>
            <input inputMode="decimal" value={tarifa} onChange={(e) => setTarifa(e.target.value)} />
          </label>
        </div>

        {itens.length ? (
          <ul className="aparelhos">
            {resultado.linhas.map((linha) => (
              <LinhaAparelho key={linha.item.uid} linha={linha} onAlterar={alterar} onRemover={remover} />
            ))}
          </ul>
        ) : (
          <p className="vazio">Nenhum aparelho na lista ainda.</p>
        )}

        <div className="simulador__acoes">
          <button type="button" className="botao-texto" onClick={restaurar}>Voltar ao exemplo</button>
          <button type="button" className="botao-texto" onClick={limpar}>Limpar lista</button>
        </div>
      </section>

      <Numeros itens={numeros} rotulo="Seu consumo" />
      <p className="nota">
        Valores estimados. A tarifa com impostos aparece na sua conta de luz; o CO₂ usa o fator médio da rede elétrica brasileira
        (cerca de 0,04 kg por kWh).
      </p>

      <section className="graficos">
        <GraficoBarra
          titulo="Quanto cada aparelho custa por mês (R$)"
          rotulos={porCusto.map((linha) => linha.item.nome)}
          valores={porCusto.map((linha) => Number(linha.custo.toFixed(2)))}
          cor={corGasto}
          largo
        />
      </section>

      <EconomiaSugerida resultado={resultado} />
    </>
  );
}
